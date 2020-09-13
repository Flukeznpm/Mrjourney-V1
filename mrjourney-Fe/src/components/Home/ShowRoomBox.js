import React, { useContext, useEffect, useState } from 'react';
import "../../static/css/Show-Room.css";
import "../../static/css/Nav.css";
import "../../static/css/App.css";
import BgSlide1 from '../../static/img/pr-01.png';
import Logo from '../../static/img/logojourney.png';
import SearchRoom from '../../static/img/search-room.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import momentjs, { max } from 'moment'
import { HookContext } from '../../store/HookProvider'
import MoreRoomDetailModal from '../Modal/MoreRoomDetailModal';

function ShowRoomBox() {
    const { addModalShow, showRoomModalClose, showRoomModalShow } = useContext(HookContext)
    const [data, setData] = useState([]);
    const [room, setShowRoom] = useState([{}])
    const [sortType, setSortType] = useState('recent');
    const [roomModal, setRoomModal] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/room')
            .then(async res => {
                // console.log('Data from /api/room : ' + res.data)
                // setShowRoom(res.data)

                const sortArray = type => {
                    const types = {
                        recent: 'recent',
                        maxMembers: 'maxMembers',
                        province: 'province',
                    };
                    const sortProperty = types[type];
                    const sorted = [...res.data].sort((a, b) => {
                        if (sortProperty === 'recent') {
                            return a - b;
                        } else if (sortProperty === 'province') {
                            return a.province.localeCompare(b.province);
                        } else if (sortProperty === 'maxMembers') {
                            return b.maxMember - a.maxMember;
                        }
                    });
                    setShowRoom(sorted);
                };
                console.log(res.data);
                sortArray(sortType);
            });

    }, [sortType])

    const AlertJoinWrongCondition = () => {

        Swal.fire({
            icon: 'error',
            title: 'ขออภัย!',
            text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
            showCancelButton: false,
            confirmButtonColor: '#D33',
            confirmButtonText: 'กลับสู่หน้าหลัก'
        })

    }

    const AlertJoinRoom = () => {
        if (this.state.myacc === 'guest') {
            Swal.fire({
                icon: 'success',
                title: 'เข้าร่วมสำเร็จ!',
                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                showCancelButton: true,
                confirmButtonText: 'เข้าสู่ห้อง',
                confirmButtonColor: '#31CC71',
                cancelButtonText: 'กลับสู่หน้าหลัก',
            })
        }
    }

    const AlertJoinRoomDontAcc = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณยังไม่ได้ Login!',
            text: 'กรุณาทำการ Login ก่อนทำรายการ',
            showCancelButton: true,
            confirmButtonText: 'Login',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่หน้าหลัก',
        })
    }

    const AlertRoomDetails = () => {
        Swal.fire({
            imageUrl: "//static/img/logojourney.png",
            position: 'center',
            type: 'info',
            title: `Class Information`,
            input: 'date',
            html: `<div>
            <h1> HelloWorld </h1>
            <p> TestAlert </p>
            <p className="float-right">hahaha</p>
            <img src=${Logo} height="45" alt="MrJourney" />ผู้สร้าง 
            </div>`,
        })
    }

    return (
        <div className="container py-3">
            <select onChange={e => setSortType(e.target.value)}>
                <option value="recent">ล่าสุด</option>
                <option value="maxMembers">จำนวนที่เปิดรับ</option>
                <option value="province">ชือจังหวัด</option>
            </select>
            <div className="row">
                {room.map((room, key) => {
                    return (
                        <div className="col-md-4 col-sm-12 d-flex justify-content-center py-2">
                            <div class="card" style={{ width: "18rem" }}>
                                <img class="card-img-top" src={BgSlide1} alt="Card image cap" />
                                <div class="card-body">
                                    <h4 class="card-title">
                                        {room.roomName} &nbsp;
                                            <button
                                            type="button" class="float-right maxMember-btn btn p-0 "
                                            style={{ fontSize: "10px" }} >
                                            0/
                                            {room.maxMember}
                                        </button>
                                    </h4>
                                    <div class="card-text">จ. {room.province}</div>
                                    <div class="card-text py-2">
                                        <button
                                            type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                            {momentjs(room.startDate).format('ll')}
                                            <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                                    &nbsp;-&nbsp;
                                                <button
                                            type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                            {momentjs(room.endDate).format('ll')}
                                            <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                    </div>
                                    <div className="card-text py-2">
                                        {room.genderCondition === 'ชาย' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {room.genderCondition === 'หญิง' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {room.genderCondition === 'ไม่จำกัดเพศ' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                            อายุ &nbsp;{room.ageCondition}
                                        </span>
                                    </div>
                                    <div className="owner-trip-profile py-2">
                                        <span className="pl-1 pr-2"><img src={room.ownerPicRoom} class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>
                                        <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง : {room.ownerRoomName}</span>
                                    </div>
                                    <button type="button" class="col-9 btn btn-join-color round text-white" onClick={AlertJoinWrongCondition}>เข้าร่วม</button>

                                    <button type="button" className="btn col-3"
                                        onClick={() => {
                                            setRoomModal(room)
                                            showRoomModalShow()
                                        }}>
                                        <img src={SearchRoom} class="btn-see-room image_outer_container" height="30px" width="30px" alt="owner-img" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                })}
                <MoreRoomDetailModal
                    show={addModalShow}
                    onHide={() => showRoomModalClose()} //use for closeButton
                    room={roomModal}
                ></MoreRoomDetailModal>
            </div>
        </div>

    )
}
export default ShowRoomBox;