import React, { useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import CarouselHeader from '../components/Home/CarouselHeader';
import ShowRoomBox from '../components/Home/ShowRoomBox';
import '../static/css/Show-Room.css';
import '../static/css/SearchButton.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import Swal from 'sweetalert2';

function Home(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        if (!user) {
            setShowAcc([{}])
        } else {
            axios.get(`http://localhost:5000/accountProfile?userID=${user.lineID}`)
                .then(res => {
                    setShowAcc(res.data)
                })
        }
    }, [])

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />
                <div className="content-page">
                    <div className="Carousel-Header">
                        <CarouselHeader></CarouselHeader>
                    </div>
                    {acc.map((acc) => {
                        return (
                            <ShowRoomBox acc={acc}></ShowRoomBox>
                        )
                    })}
                </div>
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div>
    )
}

export default withRouter(Home);