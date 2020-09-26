import React from 'react';
import styled from "styled-components";
import { Modal, Button } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import BgSlide1 from '../../static/img/pr-01.png';
import momentjs from 'moment'
import Swal from 'sweetalert2';
import axios from 'axios';
import Logo from '../../static/img/logojourney.png';
import {
    Button as AntButton,
    Tooltip,
    Card
} from 'antd';

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
    &:hover , &:active {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

function MoreRoomDetailModal(props) {
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
                        confirmButtonText: 'เข้าสู่ห้อง',
                        confirmButtonColor: '#31CC71',
                        cancelButtonText: 'กลับสู่หน้าหลัก',
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
                                confirmButtonText: 'เข้าสู่ห้อง',
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: 'กลับสู่หน้าหลัก',
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
                                confirmButtonText: 'เข้าสู่ห้อง',
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: 'กลับสู่หน้าหลัก',
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
                                confirmButtonText: 'เข้าสู่ห้อง',
                                confirmButtonColor: '#31CC71',
                                cancelButtonText: 'กลับสู่หน้าหลัก',
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
                        confirmButtonText: 'เข้าสู่ห้อง',
                        confirmButtonColor: '#31CC71',
                        cancelButtonText: 'กลับสู่หน้าหลัก',
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
                            <div className="pt-3" style={{ fontSize: "20px", fontWeight: 'bold' }}>
                                {props.room.roomName} &nbsp;
                                <button
                                    type="button" class="maxMember-btn btn p-0 ml-1 "
                                    style={{ fontSize: "12px" }} >
                                    0/{props.room.maxMember}
                                </button>
                            </div>
                            <div className="details py-1">
                                <span className="row">
                                    <span className="col-8">
                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                            จังหวัด : {props.room.province}
                                        </span>
                                        <br /><span className="py-1" style={{ fontSize: "14px" }}>
                                            วันที่ : &nbsp;
                                                            <button
                                                type="button" class="show-details-btn btn p-1 " style={{ fontSize: "10px" }}>
                                                {momentjs(props.room.startDate).format('ll')}

                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                                            &nbsp; - &nbsp;
                                                            <button
                                                type="button" class="show-details-btn btn p-1" style={{ fontSize: "10px" }}>
                                                {momentjs(props.room.endDate).format('ll')}

                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                        </span>
                                    </span>
                                    <span className="col-4">
                                        {props.room.genderCondition === 'ชาย' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.room.genderCondition === 'หญิง' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.room.genderCondition === 'ไม่จำกัดเพศ' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        <br /><span className="mt-0 ml-2" style={{ fontSize: "10px" }}>
                                            อายุ
                                            &nbsp;
                                        <button
                                                type="button" class="show-details-btn btn p-1 " style={{ fontSize: "8px" }}>
                                                {props.room.ageCondition}
                                            </button>
                                        </span>
                                    </span>
                                </span>
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
                    <PrimaryButton className="mr-3"
                        type="primary" htmlType="button"
                        onClick={() => onCheckJoinRoom(props.acc, props.room)}
                    >เข้าร่วม</PrimaryButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MoreRoomDetailModal;