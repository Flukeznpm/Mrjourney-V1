import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import CarouselHeader from '../components/Home/CarouselHeader';
import ShowRoomBox from '../components/Home/ShowRoomBox';
import '../static/css/Show-Room.css';
import '../static/css/SearchButton.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

class Home extends React.Component {

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let code = params.get('code');
        let data = {
            code: code
        }
        if (code != null) {
            axios.post('http://localhost:5000/getToken', data).then((res) => {
                console.log(res);
                cookie.save('jwt', res.data);
                var decoded = jwt.verify(res.data, 'secreatKey');
                console.log(decoded);
            })
        }
    }

    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <NavWebPage />
                    <div className="content-page">
                        <div className="Carousel-Header">
                            <CarouselHeader></CarouselHeader>
                        </div>
                        <div class="container h-100 my-3 py-2">
                            <div class="d-flex justify-content-center h-100">
                                <div class="searchbar">
                                    <input class="search_input" type="text" name="" placeholder="Search..." />
                                    <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
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
}

export default Home;