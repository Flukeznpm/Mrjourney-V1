import React from 'react';
import styled from "styled-components";
import Swal from 'sweetalert2';
import axios from 'axios';
import momentjs from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    Button as AntButton,
    Tooltip,
    Input as AntInput,
    Col, Row,
    Select as AntSelect,
    Progress, Typography
} from 'antd';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;
const AntParagraph = styled(Paragraph)`
    font-size: 10px;
    .ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
        color: gray;
    }
    .ant-typography-copy-success, .ant-typography-copy-success:hover, .ant-typography-copy-success:focus {
        color: ${props => (props.theme.color.primary)};
    }
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 8px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 8px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

const SeeButton = styled(AntButton)`
    font-size: 16px;
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primary)};
        color: ${props => (props.theme.color.primary)};
    }
`;

const ImgCover = styled.img`
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

const ColRoomId = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ColRoomStatus = styled(Col)`
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

function RoomBox(props) {

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
                confirmButtonText: '<a href ="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=http://localhost:3000/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ" id="alert-confirm-button">Login</a>',
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
        <div className="col-md-4 col-sm-12 d-flex justify-content-center py-3">
            <div class="card" style={{ width: "20rem" }}>
                <ImgCover src={props.room.roomCover} alt="Card image cap" />
                <div class="card-body">
                    <div class="card-text">
                        <Row>
                            <ColRoomStatus span={12}>
                                <div>{props.room.roomStatus === true ?
                                    <div style={{ color: "#e66f0f" }}>เปิด</div>
                                    :
                                    <div style={{ color: "#FF4647" }}>ปิด</div>
                                }
                                </div>
                            </ColRoomStatus>
                            <ColRoomId span={12}>
                                <AntParagraph copyable>{props.room.roomID}</AntParagraph>
                            </ColRoomId>
                        </Row>
                    </div>
                    <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        {props.room.roomName}
                    </h5>
                    <div class="card-text">
                        จ. {props.room.province}
                    </div>
                    <div className="col-12 p-0">
                        <div class="card-text row">
                            <div className="col-9">
                                <Progress
                                    percent={(100 / props.room.maxMember) * props.room.joinedMember}
                                    showInfo={false}
                                />
                            </div>
                            <div className="col-3" style={{ fontSize: "12px", textAlign: "center" }}>
                                {props.room.joinedMember}/{props.room.maxMember}
                            </div>
                        </div>
                    </div>
                    <div class="card-text py-2">
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
                    <div className="card-text py-2">
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
                    <div className="owner-trip-profile py-2">
                        <span className="pl-1 pr-2"><img src={props.room.ownerPicRoom} class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>

                        <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง :
                            <Link to={`/Profile?userID=${props.room.ownerRoomID}`} style={{ color: "#e66f0f" }}>
                                {props.room.ownerRoomName}
                            </Link>
                        </span>

                    </div>
                    <div class="col-12 p-0">
                        <div class="row">
                            <div class="col-9">
                                {props.room.roomStatus === true && props.room.joinedMember < props.room.maxMember
                                    ?
                                    <>
                                        {props.room.ownerRoomID === props.acc.lineID ?
                                            <Link to={`/JoinRoom?roomID=${props.room.roomID}`}>
                                                <OutlineButton
                                                    block
                                                >เข้าสู่ห้อง</OutlineButton>
                                            </Link>
                                            :
                                            <PrimaryButton
                                                type="primary" block
                                                onClick={() => onCheckJoinRoom(props.acc, props.room)}
                                            >เข้าร่วม</PrimaryButton>
                                        }
                                    </>
                                    :
                                    <PrimaryButton type="primary" block disabled>เข้าร่วม</PrimaryButton>
                                }
                            </div>
                            <div class="col-3 text-center">
                                <Tooltip title="ดูข้อมูลเพิ่มเติม">
                                    <SeeButton
                                        shape="circle"
                                        onClick={() => {
                                            props.setRoomModal(props.room)
                                            props.setAccountJoinRoom(props.acc)
                                            props.showRoomModalShow()
                                        }}
                                        icon={<SearchOutlined />}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RoomBox;