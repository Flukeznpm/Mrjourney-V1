import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import '../../static/css/App.css';
import '../../static/css/CreateRoom.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import momentjs from 'moment'
import Swal from 'sweetalert2';
import { HookContext } from '../../store/HookProvider'
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    Steps,
    InputNumber
} from 'antd';
import Stepper from '../components/Stepper';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

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

const ImgCover = styled.img`
    height: 300px;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
`

function CreateRoomStep3(props) {
    const { Room, prevStep } = useContext(HookContext)

    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [roomID, setRoomID] = useState("")
    const [roomStatus, setRoomStatus] = useState(true)
    const [endDateStatus, setEndDateStatus] = useState(false)

    const { Step } = Steps;
    const { TextArea } = AntInput;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataRoom = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            roomName: Room.roomName,
            roomCover: Room.roomCover,
            qrCode: Room.qrCode,
            province: Room.province,
            startDate: Room.startDate,
            endDate: Room.endDate,
            tripDetails: Room.tripDetails,
            maxMember: Room.maxMember,
            genderCondition: Room.genderCondition,
            ageCondition: Room.ageCondition,
            roomStatus: roomStatus,
            endDateStatus: endDateStatus,
            createDate: new Date()
        }
        await axios.post('https://mrjourney-senior.herokuapp.com/room/createRoom', dataRoom)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'สร้างห้องสำเร็จ!',
                    text: 'ขอให้คุณสนุกกับการท่องเที่ยว',
                    showCancelButton: true,
                    confirmButtonText: `<a href="/JoinRoom?roomID=${res.data}" id="alert-confirm-button">เข้าสู่ห้อง</a>`,
                    confirmButtonColor: '#31CC71',
                    cancelButtonText: '<a href="/Home" id="alert-confirm-button">กลับสู่หน้าหลัก</a>',
                })
            });
    }
    return (
        <div>
            <div className="container py-2 mt-3">
                <Stepper typeStep="room" step={3} />
            </div>
            <div className="create-room-form py-2">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div>
                                <ImgCover class="d-block w-100" src={Room.roomCover} alt="First slide" />
                            </div>
                            <div className="container">
                                <div className="Room-Details py-3">
                                    <div className="ShowRoom-TripName py-1">
                                        ชื่อทริป : {Room.roomName}
                                    </div>
                                    <div className="ShowRoom-TripProvince py-1">
                                        จังหวัด : {Room.province}
                                    </div>
                                    <div className="ShowRoom-Date py-1 ">
                                        วันเริ่ม - จบทริป
                                                <div className="py-2">
                                            <span className="Show-Date pl-3 pr-3 ">
                                                <button
                                                    type="button" class="show-details-btn btn p-1 ">
                                                    {momentjs(Room.startDate).format('ll')}
                                                    <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                </button>
                                                <span className="pl-2 p-2">-</span>
                                                <button
                                                    type="button" class="show-details-btn btn p-1">
                                                    {momentjs(Room.endDate).format('ll')}
                                                    <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ShowRoom-Condition py-1">
                                        เงื่อนไข
                                               <div>
                                            {Room.genderCondition === 'ชาย' ?
                                                <span className="Show-genderCondition pl-2 pr-2">
                                                    <ManOutlined style={{ color: "dodgerblue" }} />
                                                </span>
                                                :
                                                ""}
                                            {Room.genderCondition === 'หญิง' ?
                                                <span className="Show-genderCondition pl-2 pr-2">
                                                    <WomanOutlined style={{ color: "hotpink" }} />
                                                </span>
                                                :
                                                ""}
                                            {Room.genderCondition === 'ไม่จำกัดเพศ' ?
                                                <span className="Show-genderCondition pl-2 pr-2">
                                                    <WomanOutlined style={{ color: "hotpink" }} />
                                                    <ManOutlined style={{ color: "dodgerblue" }} />
                                                </span>
                                                :
                                                ""}

                                            <span className="Show-ageCondition pl-2">
                                                <span className="pr-2"> อายุ </span>
                                                <button
                                                    type="button" class="show-details-btn btn p-1 ">
                                                    {Room.ageCondition}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ShowRoom-MaxMember py-1">
                                        จำนวนเปิดรับ
                                                <span className="Show-Members pl-2">
                                            <button
                                                type="button" class="maxMember-btn btn p-0 ml-1 ">
                                                {Room.maxMember}
                                            </button>
                                        </span>
                                    </div>
                                    <div className="ShowRoom-TripDetails py-1">
                                        รายละเอียด
                                         <TextArea value={Room.tripDetails} rows={4} placeholder="กรอกรายละเอียดการท่องเที่ยวของคุณ" disabled />
                                    </div>
                                    <div className="ShowRoom-QrCode py-1">
                                        QrCode
                                                <div className=" text-center">
                                            <img src={Room.qrCode} alt="QrCode" width="150" height="150" />
                                        </div>
                                    </div>
                                </div>
                                <div className="buttom-page pt-3">
                                    <AntForm.Item>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6 d-flex align-items-center">
                                                    <OutlineButton
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => prevStep(1)}
                                                    >ย้อนกลับ</OutlineButton>
                                                </div>
                                                <div className="col-6 d-flex align-items-center">
                                                    <PrimaryButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={handleSubmit}
                                                    >ยืนยัน</PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </AntForm.Item>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateRoomStep3);