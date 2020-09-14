import React, { useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import ShowMembers from '../components/JoinedRoom/ShowMembers';
import RoomDetails from '../components/JoinedRoom/RoomDetails';
import BgSlide1 from '../static/img/pr-01.png';
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function JoinRoom(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [roomDetail, setShowRoomDetail] = useState([{}])
    const [members, setMember] = useState([{}])

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
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getRoomID = params.get('roomID');

        axios.get(`http://localhost:5000/room/roomDetail?roomID=${getRoomID}`)
            .then(res => {
                setShowRoomDetail(res.data)
            })
        axios.get(`http://localhost:5000/room/members?roomID=${getRoomID}`)
            .then(res => {
                setMember(res.data)
            })
    }, [])

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <div className="Nav-header">
                    <NavWebPage></NavWebPage>
                </div>
                <div className="content-page">
                    <div>
                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                    </div>
                    <div className="Details-JoinedRoom">
                        <div className="container">
                            <div className="col-12">
                                <div className="row text-black">
                                    {roomDetail.map((roomDetail) => {
                                        return (
                                            <>
                                                <RoomDetails roomDetail={roomDetail} members={members.length}></RoomDetails>
                                                <ShowMembers />
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttom-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div>
    )
}
export default JoinRoom;


