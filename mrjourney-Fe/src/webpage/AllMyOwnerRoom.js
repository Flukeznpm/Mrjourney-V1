import React, { useContext, useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/Show-Room.css';
import "../static/css/Nav.css";
import "../static/css/App.css";
import momentjs from 'moment'
import BgSlide1 from '../static/img/pr-01.png';
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { HookContext } from '../store/HookProvider'
import JoinRoom from './JoinRoom';

function MyOwnerRoom(props) {
    const { setJoinRoom, joinRoomID } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [ownerRoom, setShowOwnerRoom] = useState([{}])

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        axios.get(`http://localhost:5000/accountProfile/ownerRoom?lineID=${user.lineID}`)
            .then(res => {
                setShowOwnerRoom(res.data)
            })
    }, [])

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />
                <div className="content-page container py-4">
                    <h1 className="font-weight-bold">ห้องที่คุณเป็นเจ้าของ</h1>
                    <div className="show-owner-room">
                        <div className="row">
                            {ownerRoom.length ?
                                <>
                                    {ownerRoom.map((ownerRoom) => {
                                        return (
                                            <>
                                                <div className="col-md-4 col-sm-12 d-flex justify-content-center py-2">
                                                    <div class="card" style={{ width: "18rem" }}>
                                                        <img class="card-img-top" src={BgSlide1} alt="Card image cap" />
                                                        <div class="card-body">
                                                            <h4 class="card-title">
                                                                {ownerRoom.roomName} &nbsp;
                                                                <button
                                                                    type="button" class="float-right maxMember-btn btn p-0 "
                                                                    style={{ fontSize: "10px" }} >
                                                                    0/
                                                                    {ownerRoom.maxMember}
                                                                </button>
                                                            </h4>
                                                            <div class="card-text">จ. {ownerRoom.province}</div>
                                                            <div class="card-text py-2">
                                                                <button
                                                                    type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                                    {momentjs(ownerRoom.startDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                                </button>
                                                                &nbsp;-&nbsp;
                                                                <button
                                                                    type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                                    {momentjs(ownerRoom.endDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                                </button>
                                                            </div>
                                                            <div className="card-text py-2">
                                                                {ownerRoom.genderCondition === 'ชาย' ?
                                                                    <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                                    </span>
                                                                    :
                                                                    ""}
                                                                {ownerRoom.genderCondition === 'หญิง' ?
                                                                    <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                                    </span>
                                                                    :
                                                                    ""}
                                                                {ownerRoom.genderCondition === 'ไม่จำกัดเพศ' ?
                                                                    <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                                    </span>
                                                                    :
                                                                    ""}
                                                                <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                                                    อายุ {ownerRoom.ageCondition}
                                                                </span>
                                                            </div>
                                                            <div className="owner-trip-profile py-2">
                                                                <span className="pl-1 pr-2"><img src={ownerRoom.ownerPicRoom} class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>
                                                                <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง : {ownerRoom.ownerRoomName}</span>
                                                            </div>
                                                            <button type="button" class="col-5 mx-2 btn btn-outline-danger round">
                                                                ลบห้อง
                                                        </button>
                                                            <Link to="/JoinRoom">

                                                                <button type="button" className="btn mx-2 col-5 btn-join-color round text-white" onClick={() => setJoinRoom(ownerRoom.roomID)}>
                                                                    ข้อมูลห้อง
                                                        </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </>
                                :
                                <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                    ขณะนี้ยังไม่มีห้องที่ท่านเป็นเจ้าของ
                                </h2>
                            }
                        </div>
                    </div>
                </div>


            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div>

    )
}


export default MyOwnerRoom;