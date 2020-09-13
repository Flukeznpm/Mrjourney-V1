import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../static/css/Stepper.css';
import '../../static/css/App.css';
import '../../static/css/CreateRoom.css';
import BgSlide1 from '../../static/img/pr-01.png';
import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
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


function CreateRoomStep3(props) {
    const { Room, prevStep } = useContext(HookContext)

    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [roomID, setRoomID] = useState("")
    const [roomStatus, setStatus] = useState(true)

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
            roomID: roomID,
            roomName: Room.roomName,
            province: Room.province,
            startDate: Room.startDate,
            endDate: Room.endDate,
            tripDetails: Room.tripDetails,
            maxMember: Room.maxMember,
            genderCondition: Room.genderCondition,
            ageCondition: Room.ageCondition,
            roomStatus: roomStatus
        }
        await axios.post('http://localhost:5000/room/createRoom', dataRoom)
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
    const { Step } = Steps;
    const { TextArea } = AntInput;
    return (
        <div>
            <div className="container py-2 mt-5">
                <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps>
            </div>
            <div className="create-room-form py-2">
                <div className="col-12">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div>
                                <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                            </div>
                            <div className="container">
                                <div className="Room-Details py-3">
                                    <div className="ShowRoom-TripName py-1">
                                        ชื่อทริป : {Room.roomName}
                                    </div>
                                    {/* หน้าปก : {this.props.RoomForm.roomCover} <br /> */}
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
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                </span>
                                                :
                                                ""}
                                            {Room.genderCondition === 'หญิง' ?
                                                <span className="Show-genderCondition pl-2 pr-2">
                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                </span>
                                                :
                                                ""}
                                            {Room.genderCondition === 'ไม่จำกัดเพศ' ?
                                                <span className="Show-genderCondition pl-2 pr-2">
                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
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
                                         <TextArea value={Room.tripDetails} rows={3} placeholder="กรอกรายละเอียดการท่องเที่ยวของคุณ" disabled />
                                    </div>
                                    <div className="ShowRoom-QrCode py-1">
                                        QrCode
                                                <div className=" text-center">
                                            <img src={TestQrCode} alt="QrCode" width="150" height="150" />
                                            {/* QR code : {this.props.RoomForm.qrCode} <br /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="buttom-page pt-3">
                                    <AntForm.Item>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6 d-flex align-items-center">
                                                    <AntButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => prevStep(1)}
                                                    >ย้อนกลับ</AntButton>
                                                </div>
                                                <div className="col-6 d-flex align-items-center">
                                                    <AntButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={handleSubmit}
                                                    >submit</AntButton>
                                                </div>
                                            </div>
                                        </div>
                                    </AntForm.Item>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateRoomStep3);