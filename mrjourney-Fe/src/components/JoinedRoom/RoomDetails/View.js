import React, { useContext, useEffect, useState } from 'react';
// import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
import styled from "styled-components";
import momentjs from 'moment'
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { HookContext } from '../../../store/HookProvider';
import LeaveRoomModal from '../../components/LeaveRoomModal';
import EditJoinRoom from './EditJoinRoom';
import axios from 'axios';
import {
    Card,
    Row,
    Col,
    Tooltip,
    Typography,
    Button as AntButton,
    Switch,
    Progress,
} from 'antd';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  /* margin: 10px 0px 10px 0px; */
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
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

const SwitchComponentClose = styled(Switch)`
  background-color: #E9DDD1;
  &.ant-switch-checked {
    background-color: ${props => (props.theme.color.primary)};
  }
`;

const SwitchComponentOpen = styled(Switch)`
  background-color: #E9DDD1;
  &.ant-switch-checked {
    background-color: ${props => (props.theme.color.primary)};
  }
`;

function RoomDetails(props) {
    const { thaiprovince, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext);
    const [lineID, setLineID] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [roomStatus, setStatus] = useState(true);
    const [isVisible, setVisible] = useState(false)
    // const [isEditRoom, setEditRoom] = useState(false);

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

    }, [isVisible])

    const onEditRoom = () => {
        props.setEditRoom(true)
    }

    const onVisibleModal = () => {
        setVisible(true)
    }

    const CloseRoom = async (roomID) => {
        let closeRoom = {
            roomStatus: false
        }
        await axios.put(`https://mrjourney-senior.herokuapp.com/room/closeRoom?roomID=${roomID}&lineID=${lineID}`, closeRoom)
            .then(res => {
                console.log(res)
            })
    }

    const OpenRoom = async (roomID) => {
        let openRoom = {
            roomStatus: true
        }
        await axios.put(`https://mrjourney-senior.herokuapp.com/room/openRoom?roomID=${roomID}&lineID=${lineID}`, openRoom)
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div className="col-lg-9 col-sm-12 my-3">
            <AntCard style={{ padding: 0 }}>
                <div className="container py-3">
                    {props.isEditRoom === false ?
                        <div className="ShowRoom-Details">
                            {lineID === props.roomDetail.ownerRoomID ?
                                <div className="text-right">
                                    {props.roomDetail.roomStatus === true && props.isCloseRoom === false ?
                                        <Tooltip title="เลื่อนเพื่อปิดห้อง">
                                            <SwitchComponentClose defaultChecked
                                                onChange={() => CloseRoom(props.roomDetail.roomID)}
                                                onClick={() => props.setCloseRoom(true)}
                                            />
                                        </Tooltip>
                                        :
                                        <Tooltip title="เลื่อนเพื่อเปิดห้อง">
                                            <SwitchComponentOpen
                                                onChange={() => OpenRoom(props.roomDetail.roomID)}
                                                onClick={() => props.setCloseRoom(false)} />
                                        </Tooltip>
                                    }
                                </div>
                                :
                                null
                            }
                            <div className="ShowRoom-TripName py-1" style={{ fontSize: "28px", fontWeight: "bold" }}>
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
                                    <span className="pr-2 my-2">วันเริ่ม - จบทริป </span>
                                    <span className="Show-Date py-2 ">
                                        <button
                                            type="button" class="date-room-btn btn p-1 my-2 " style={{ fontSize: "14px" }}>
                                            {momentjs(props.roomDetail.startDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                            &nbsp;&nbsp;
                                        <button
                                            type="button" class="date-room-btn btn p-1 my-2" style={{ fontSize: "14px" }}>
                                            {momentjs(props.roomDetail.endDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                    </span>
                                </div>
                                <div className="ShowRoom-Condition py-1">
                                    เงื่อนไข
                                    <div className="py-2">
                                        เพศ
                                        {props.roomDetail.genderCondition === 'ชาย' ?
                                            <span className="pl-2 pr-2" style={{ fontSize: "1.00rem", margin: "auto" }}>
                                                <ManOutlined style={{ color: "dodgerblue" }} />
                                            </span>
                                            :
                                            ""}
                                        {props.roomDetail.genderCondition === 'หญิง' ?
                                            <span className="pl-2 pr-2" style={{ fontSize: "1.00rem", margin: "auto" }}>
                                                <WomanOutlined style={{ color: "hotpink" }} />
                                            </span>
                                            :
                                            ""}
                                        {props.roomDetail.genderCondition === 'ไม่จำกัดเพศ' ?
                                            <span className="pl-2 pr-2" style={{ fontSize: "1.00rem", margin: "auto" }}>
                                                <WomanOutlined style={{ color: "hotpink" }} />
                                                <ManOutlined style={{ color: "dodgerblue" }} />
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
                                    <div className="col-12 p-0">
                                        <div class="card-text row">
                                            <div className="col-9">
                                                <Progress
                                                    percent={(100 / props.roomDetail.maxMember) * props.roomDetail.joinedMember}
                                                    showInfo={false} />
                                            </div>
                                            <div className="col-3" style={{ fontSize: "14px", textAlign: "center", margin: "auto" }}>
                                                {props.roomDetail.joinedMember}/{props.roomDetail.maxMember}
                                            </div>
                                        </div>
                                    </div>
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
                                            <div className="col-12 d-flex align-items-center">
                                                <OutlineButton
                                                    size={"large"}
                                                    block htmlType="button"
                                                    onClick={() => onEditRoom()}
                                                >แก้ไขห้อง</OutlineButton>
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
                                        onClick={() => onVisibleModal()}
                                    >ออกจากห้อง</PrimaryButton>
                                    <LeaveRoomModal
                                        isVisible={isVisible}
                                        setVisible={setVisible}
                                        roomID={props.roomDetail.roomID}
                                        lineID={lineID}
                                    />
                                </div>
                            }

                        </div>
                        :
                        <EditJoinRoom roomDetail={props.roomDetail} setEditRoom={props.setEditRoom}></EditJoinRoom>
                    }
                </div>
            </AntCard>
        </div >
    )
}

export default RoomDetails;