import React, { useEffect, useState } from 'react';
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

function JoinButton(props) {
    const [checkMembers, setCheckMember] = useState([{}])
    useEffect(() => {
        axios.get(`http://localhost:5000/room/joinRoomAlready?roomID=${props.room.roomID}&lineID=${props.acc.lineID}`)
            .then(res => {
                setCheckMember(res.data)
            })
    }, [])
    const onCheckAvaliableJoin = (ownerID, lineID) => {
        if (ownerID === lineID) {
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
                    axios.post('http://localhost:5000/room/joinRoom', dataJoin)
                        .then(async (res) => {
                            console.log(res)
                        })
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าร่วมสำเร็จ!',
                        text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                        showCancelButton: true,
                        confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
                        confirmButtonColor: '#31CC71',
                        cancelButtonText: 'กลับสู่หน้าหลัก',
                    })
                } else {
                    if (room.ageCondition === "ต่ำกว่า 18 ปี") {
                        if (calculateDate(acc.birthday) < 18) {
                            axios.post('http://localhost:5000/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
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
                            axios.post('http://localhost:5000/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
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
                            axios.post('http://localhost:5000/room/joinRoom', dataJoin)
                                .then(async (res) => {
                                    console.log(res)
                                })
                            Swal.fire({
                                icon: 'success',
                                title: 'เข้าร่วมสำเร็จ!',
                                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                                showCancelButton: true,
                                confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
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
                        confirmButtonText: `<a href="/JoinRoom?roomID=${room.roomID}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
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
        <>
            {console.log('roomid', props.room.roomID)}
            { onCheckAvaliableJoin(props.room.ownerRoomID, props.acc.lineID) === true ?
                <Link to={`/JoinRoom?roomID=${props.room.roomID}`}>
                    <OutlineButton
                        block
                    >เข้าสู่ห้อง</OutlineButton>
                </Link>
                :
                <>
                    {props.room.roomStatus === true && props.room.joinedMember < props.room.maxMember
                        ?
                        <PrimaryButton
                            type="primary" block
                            onClick={() => onCheckJoinRoom(props.acc, props.room)}
                        >เข้าร่วม</PrimaryButton>
                        :
                        <PrimaryButton type="primary" block disabled>เข้าร่วม</PrimaryButton>
                    }
                </>
            }
        </>
    )
}
export default JoinButton;