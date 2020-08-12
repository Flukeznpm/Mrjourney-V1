import React, { useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import CarouselHeader from '../components/Home/CarouselHeader';
import ShowRoomBox from '../components/Home/ShowRoomBox';
import '../static/css/Show-Room.css';
import '../static/css/SearchButton.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import Swal from 'sweetalert2';

function Home() {
    const [login, setLogin] = useState(false)
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let code = params.get('code');
        let data = {
            code: code
        }
        if (code != null) {
            console.log("Jokkk");
            axios.post('http://localhost:5000/getToken', data).then((res) => {
                if (res.status === 202) {
                    cookie.save('jwt', res.data);
                    var decoded = jwt.verify(res.data, 'secreatKey');
                    console.log(decoded);
                    Swal.fire({
                        title: 'คุณยังไม่เคยลงทะเบียน!',
                        text: 'กรุณาลงทะเบียนเพื่อเข้าใช้เว็บไซต์',
                        confirmButtonText: '<a href="/FirstTimeLogin" id="alert-confirm-button">ลงทะเบียน</a>',
                        confirmButtonColor: '#F37945',
                    })
                } else {
                    cookie.save('jwt', res.data);
                    var decoded = jwt.verify(res.data, 'secreatKey');
                    console.log('decode', decoded);
                    setLogin(true)
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [])

    const setLogout = () =>{
        setLogin(false)
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage login={login} setLogout={setLogout} />
                <div className="content-page">
                    <div className="Carousel-Header">
                        <CarouselHeader></CarouselHeader>
                    </div>
                    <div class="container h-100 my-3 py-2">
                        <div class="d-flex justify-content-center h-100">
                            <div class="searchbar">
                                <span class="search_icon"><i class="fas fa-search"></i></span>
                                <input class="search_input pl-3" type="text" name="" placeholder="ค้นหา..." />
                                <span class="search_button" onClick="">Search</span>
                            </div>
                        </div>
                    </div>
                    <ShowRoomBox></ShowRoomBox>
                </div>
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div>
    )
}

export default Home;