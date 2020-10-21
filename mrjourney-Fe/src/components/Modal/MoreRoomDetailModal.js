import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Modal, Button } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import momentjs from 'moment'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Button as AntButton,
    Tooltip,
    Card,
    Progress, Typography
} from 'antd';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

const AntCard = styled(Card)`
  border-radius: 8px;
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;

const ImgCover = styled.img`
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

function MoreRoomDetailModal(props) {
    const [checkMembers, setCheckMember] = useState([{}])
    useEffect(() => {
        axios.get(`http://localhost:5000/room/joinRoomAlready?roomID=${props.room.roomID}&lineID=${props.acc.lineID}`)
            .then(res => {
                setCheckMember(res.data)
            })
    }, [])
    const onCheckAvaliableJoin = (ownerID, lineID) => {
        if (ownerID === lineID || checkMembers === true) {
            return true;
        } else {
            return false;
        }
    }

    const onCheckJoinRoom = (acc, room) => {
        const calculateDate = (dob) => {
            var today = new Date();
            var birthDate = new Date(dob);  // create a date object directly from `dob1` argument
            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            console.log(age_now);
            return age_now;
        }

        if (!acc.fName) {
            Swal.fire({
                icon: 'warning',
                title: 'คุณยังไม่ได้ Login!',
                text: 'กรุณาทำการ Login ก่อนทำรายการ',
                showCancelButton: true,
                confirmButtonText: '<a href ="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=https://mr-journey.com/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ" id="alert-confirm-button">Login</a>',
                confirmButtonColor: '#F37945',
                cancelButtonText: 'กลับสู่หน้าหลัก',
            })
        } else {
            let dataJoin = {
                lineID: acc.lineID,
                pictureURL: acc.pictureURL,
                fName: acc.fName,
                roomID: room.roomID
            }
            if (room.genderCondition === "ชาย" && acc.gender === "ชาย" || room.genderCondition === "ไม่จำกัดเพศ") {
                if (room.ageCondition === "ไม่จำกัดช่วงอายุ") {
                    axios.post('https://mrjourney-senior.herokuapp.com/room/joinRoom', dataJoin)
                        .then(async (res) => {
                            console.log(res)
                        })
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าร่วมสำเร็จ!',
                        text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                        showCancelButton: true,
                        confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}">เข้าสู่ห้อง</a>`,
                        confirmButtonColor: '#31CC71',
                        cancelButtonText: '<a href="/Home">กลับสู่หน้าหลัก</a>',
                    })
                } else {
                    if (room.ageCondition === "ต่ำกว่า 18 ปี") {
                        if (calculateDate(acc.birthday) < 18) {
                            axios.post('https://mrjourney-senior.herokuapp.com/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}">เข้าสู่ห้อง</a>`,
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: '<a href="/Home">กลับสู่หน้าหลัก</a>',
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'ขออภัย!',
                                text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
                                showCancelButton: false,
                                confirmButtonColor: '#D33',
                                confirmButtonText: 'กลับสู่หน้าหลัก'
                            })
                        }
                    } else if (room.ageCondition === "18-25 ปี") {
                        if (calculateDate(acc.birthday) >= 18 && calculateDate(acc.birthday) <= 25) {
                            axios.post('https://mrjourney-senior.herokuapp.com/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}">เข้าสู่ห้อง</a>`,
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: '<a href="/Home">กลับสู่หน้าหลัก</a>',
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'ขออภัย!',
                                text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
                                showCancelButton: false,
                                confirmButtonColor: '#D33',
                                confirmButtonText: 'กลับสู่หน้าหลัก'
                            })
                        }
                    } else if (room.ageCondition === "25 ปีขึ้นไป") {
                        if (calculateDate(acc.birthday) > 25) {
                            axios.post('https://mrjourney-senior.herokuapp.com/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}">เข้าสู่ห้อง</a>`,
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: '<a href="/Home">กลับสู่หน้าหลัก</a>',
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'ขออภัย!',
                                text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
                                showCancelButton: false,
                                confirmButtonColor: '#D33',
                                confirmButtonText: 'กลับสู่หน้าหลัก'
                            })
                        }
                    }
                }
            } else if (room.genderCondition === "หญิง" && acc.gender === "หญิง" || room.genderCondition === "ไม่จำกัดเพศ") {
                if (room.ageCondition === "ไม่จำกัดช่วงอายุ") {
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าร่วมสำเร็จ!',
                        text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                        showCancelButton: true,
                        confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}">เข้าสู่ห้อง</a>`,
                        confirmButtonColor: '#31CC71',
                        cancelButtonText: '<a href="/Home">กลับสู่หน้าหลัก</a>',
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ขออภัย!',
                    text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
                    showCancelButton: false,
                    confirmButtonColor: '#D33',
                    confirmButtonText: 'กลับสู่หน้าหลัก'
                })
            }
        }
    }
    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton style={{ border: "none", paddingBottom: "0px" }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton style={{ paddingBottom: "0px" }}>
                    <div className="container">
                        <ImgCover class="d-block w-100" src={props.room.roomCover} alt="First slide" />
                        <AntCard style={{ padding: 0 }}>
                            <div style={{ fontSize: "20px", fontWeight: 'bold' }}>
                                {props.room.roomName} &nbsp;
                                <div style={{ fontSize: "16px", fontWeight: 'normal' }}>
                                    จังหวัด : {props.room.province}
                                </div>
                                <div className="col-12 p-0">
                                    <div class="row">
                                        <div className="col-10 d-flex">
                                            <Progress
                                                percent={(100 / props.room.maxMember) * props.room.joinedMember}
                                                showInfo={false}
                                            />
                                        </div>
                                        <div className="col-2" style={{ fontSize: "12px" }}>
                                            {props.room.joinedMember}/{props.room.maxMember}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    วันที่จัดทริป : &nbsp;
                                    <button
                                        type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                        {momentjs(props.room.startDate).format('ll')}
                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                    </button>
                                        &nbsp;-&nbsp;
                                    <button
                                        type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                        {momentjs(props.room.endDate).format('ll')}
                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                    </button>
                                </div>
                                <div className="col-12">
                                    เงื่อนไข : &nbsp;
                                    {props.room.genderCondition === 'ชาย' ?
                                        <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                            <ManOutlined style={{ color: "dodgerblue" }} />
                                        </span>
                                        :
                                        ""}
                                    {props.room.genderCondition === 'หญิง' ?
                                        <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                            <WomanOutlined style={{ color: "hotpink" }} />
                                        </span>
                                        :
                                        ""}
                                    {props.room.genderCondition === 'ไม่จำกัดเพศ' ?
                                        <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                            <WomanOutlined style={{ color: "hotpink" }} />
                                            <ManOutlined style={{ color: "dodgerblue" }} />
                                        </span>
                                        :
                                        ""}
                                    <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                        อายุ &nbsp;{props.room.ageCondition}
                                    </span>
                                </div>
                            </div>
                            <div className="Creator mt-2">
                                <span className="pl-1 pr-1"><img src={props.room.ownerPicRoom} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                <span style={{ fontSize: "13px" }}>ผู้สร้าง : {props.room.ownerRoomName}</span>

                            </div>
                            <div className="trip-detail-modal py-1">
                                รายละเอียดแผนการท่องเที่ยว
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" disabled
                                >
                                    {props.room.tripDetails}
                                </textarea>
                            </div>
                        </AntCard>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "none" }}>
                    {onCheckAvaliableJoin(props.room.ownerRoomID, props.acc.lineID) === true ?
                        <Link to={`/JoinRoom?roomID=${props.room.roomID}`}>
                            <OutlineButton className="mr-3"
                            >เข้าสู่ห้อง</OutlineButton>
                        </Link>
                        :
                        <>
                            {props.room.roomStatus === true && props.room.joinedMember < props.room.maxMember
                                ?
                                <PrimaryButton className="mr-3"
                                    type="primary"
                                    onClick={() => onCheckJoinRoom(props.acc, props.room)}
                                >เข้าร่วม</PrimaryButton>
                                :
                                <PrimaryButton type="primary" className="mr-3" disabled>เข้าร่วม</PrimaryButton>
                            }
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MoreRoomDetailModal;