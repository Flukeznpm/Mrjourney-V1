import React, { useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import styled from "styled-components";
import '../static/css/App.css';
import ShowMembers from '../components/JoinedRoom/ShowMembers';
import RoomDetails from '../components/JoinedRoom/RoomDetails/View';
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

const ImgCover = styled.img`
    height: 325px;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
`

function JoinRoom(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [roomDetail, setShowRoomDetail] = useState([{}])
    const [isEditRoom, setEditRoom] = useState(false);
    const [isCloseRoom, setCloseRoom] = useState(false);

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

        axios.get(`https://mrjourney-senior.herokuapp.com/room/roomDetail?roomID=${getRoomID}`)
            .then(res => {
                setShowRoomDetail(res.data)
            })
    }, [isEditRoom, isCloseRoom])

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <div className="Nav-header">
                    <NavWebPage></NavWebPage>
                </div>

                <div className="content-page">
                    {roomDetail.map((roomDetail) => {
                        return (
                            <>
                                <div className="Details-JoinedRoom">
                                    <div className="container">
                                        <div className="col-12 pt-2">
                                            <div className="row">
                                                <ImgCover class="d-block w-100" src={roomDetail.roomCover} alt="First slide" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <RoomDetails roomDetail={roomDetail}
                                                    isEditRoom={isEditRoom} setEditRoom={setEditRoom}
                                                    isCloseRoom={isCloseRoom} setCloseRoom={setCloseRoom}
                                                ></RoomDetails>
                                                <ShowMembers roomDetail={roomDetail} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="buttom-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div>
    )
}

export default JoinRoom;


