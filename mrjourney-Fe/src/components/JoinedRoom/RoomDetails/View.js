import React, { useContext, useEffect, useState } from 'react';
// import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
import styled from "styled-components";
import momentjs from 'moment'
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { HookContext } from '../../../store/HookProvider';
import EditJoinRoom from './EditJoinRoom';
import {
    Card,
    Row,
    Col,
    Tooltip,
    Typography,
    Button as AntButton,
} from 'antd';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    background: #D91E36;
    border: #D91E36;
    &:hover , &:active, &:focus {
        background: #A21629;
        border: #A21629;
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

function RoomDetails(props) {
    const { thaiprovince, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext);
    const [lineID, setLineID] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [roomStatus, setStatus] = useState(true);
    const [isEditRoom, setEditRoom] = useState(false);


    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
        }
    }, [])

    const onEditRoom = (room) => {
        Room.roomName = room.roomName
        Room.province = room.province
        Room.startDate = room.startDate
        Room.endDate = room.endDate
        Room.maxMember = room.maxMember
        Room.ageCondition = room.ageCondition
        Room.genderCondition = room.genderCondition
        Room.tripDetails = room.tripDetails
        setEditRoom(true)
    }

    const AlertCloseRoom = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่ที่จะต้องการปิดห้อง?',
            text: 'เมื่อทำการปิดห้อง จะทำให้ไม่สามารถรับสมาชิกเพิ่มได้',
            showCancelButton: true,
            confirmButtonText: 'ปิดห้อง',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่ห้อง',
        })
    }

    const CloseRoom = async () => {
        let closeRoom = {
            roomStatus: false
        }
        await axios.put(`http://localhost:5000/room/deleteRoom?roomID=${props.roomDetail.roomID}&lineID=${lineID}`, closeRoom)
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div className="col-9">
            <AntCard style={{ padding: 0 }}>
                <div className="container py-3">
                    {isEditRoom === false ?
                        <div className="ShowRoom-Details">
                            <div className="ShowRoom-TripName py-1" style={{ fontSize: "30px" }}>
                                ชื่อทริป : {props.roomDetail.roomName}
                            </div>
                            <div style={{ fontSize: "18px" }}>
                                <div className="ShowRoom-TripProvince py-1">
                                    <span className="pr-2"> จังหวัด </span>
                                    <button
                                        type="button" class="show-details-btn btn p-1 ">
                                        {props.roomDetail.province}
                                    </button>
                                </div>
                                <div className="ShowRoom-Date py-1 ">
                                    วันเริ่ม - จบทริป
                                                <div className="py-2">
                                        <span className="Show-Date pl-3 pr-3 ">
                                            <button
                                                type="button" class="show-details-btn btn p-1 ">
                                                {momentjs(props.roomDetail.startDate).format('DD/MM/YYYY')}
                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                            <span className="pl-2 p-2">-</span>
                                            <button
                                                type="button" class="show-details-btn btn p-1">
                                                {momentjs(props.roomDetail.endDate).format('DD/MM/YYYY')}
                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="ShowRoom-Condition py-1">
                                    เงื่อนไข
                         <div className="py-2">
                                        เพศ {props.roomDetail.genderCondition === 'ชาย' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.roomDetail.genderCondition === 'หญิง' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.roomDetail.genderCondition === 'ไม่จำกัดเพศ' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        <span className="Show-ageCondition pl-2">
                                            <span className="pr-2"> อายุ </span>
                                            <button
                                                type="button" class="show-details-btn btn p-1 ">
                                                {props.roomDetail.ageCondition}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="ShowRoom-MaxMember py-1">
                                    <label for="exampleInputEmail1">จำนวนคนที่เปิดรับ</label>
                                    <button
                                        type="button" class="maxMember-btn btn ml-2 text-center"
                                        style={{ width: "40px", height: "40px" }}
                                    >
                                        {props.members}/
                                    {props.roomDetail.maxMember}
                                    </button>
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">รายละเอียด</label>
                                    <textarea disabled class="form-control" id="exampleFormControlTextarea1" rows="3" value={props.roomDetail.tripDetails}>
                                    </textarea>
                                </div>
                                <div className="ShowRoom-QrCode py-1">
                                    QrCode
                                <div className=" text-center">
                                        <img src={props.roomDetail.qrCode} alt="QrCode" width="150" height="150" />
                                    </div>
                                </div>
                            </div>
                            {lineID === props.roomDetail.ownerRoomID ?
                                <div className="container text-center py-3">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6 d-flex align-items-center">
                                                <OutlineButton
                                                    size={"large"}
                                                    block htmlType="button"
                                                    onClick={() => onEditRoom(props.roomDetail)}
                                                >แก้ไขห้อง</OutlineButton>
                                            </div>
                                            <div className="col-6 d-flex align-items-center">
                                                <PrimaryButton
                                                    type="primary"
                                                    size={"large"}
                                                    block htmlType="submit"
                                                    onClick={AlertCloseRoom}
                                                >ปิดห้อง</PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="container text-center py-3">
                                    <PrimaryButton
                                        type="primary"
                                        size={"large"}
                                        block htmlType="submit"
                                        onClick={() => alert('out')}
                                    >ออกจากห้อง</PrimaryButton>
                                </div>
                            }

                        </div>
                        :
                        <EditJoinRoom roomDetail={props.roomDetail} setEditRoom={setEditRoom}></EditJoinRoom>
                    }
                </div>
            </AntCard>
        </div >
    )
}

export default RoomDetails;