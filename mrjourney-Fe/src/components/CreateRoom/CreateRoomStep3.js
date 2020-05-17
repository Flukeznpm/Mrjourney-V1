import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../static/css/Stepper.css'; 
import '../../static/css/CreateRoom.css'; 
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import BgSlide1 from '../../static/img/pr-01.png';
import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import momentjs from 'moment'

class CreateRoomStep3 extends React.Component {

    constructor(props) {
        super();
        this.state = {
            lineID: '',
            linename: '',
            roomID: '',
            roomName: '',
            province: '',
            startDate: '',
            endDate: '',
            tripDetails: '',
            maxMember: '',
            genderCondition: '',
            ageCondition: '',
            status: true
        }
    }

    componentDidMount() {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT == undefined) {
            this.props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            this.setState({
                lineID: user.lineID,
                linename: user.displayName
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let dataRoom = {
            lineID: this.state.lineID,
            linename: this.state.linename,
            roomID: this.state.roomID,
            roomName: this.props.RoomForm.roomName,
            province: this.props.RoomForm.province,
            startDate: this.props.RoomForm.startDate,
            endDate: this.props.RoomForm.endDate,
            tripDetails: this.props.RoomForm.tripDetails,
            maxMember: this.props.RoomForm.maxMember,
            genderCondition: this.props.RoomForm.genderCondition,
            ageCondition: this.props.RoomForm.ageCondition,
            status: this.state.status
        }
        await axios.post('http://localhost:5000/room/createRoom', dataRoom)
            .then(res => {
                console.log(res)
            });
    }

    render() {
        return (
            <div>
                <div className="show-step-room py-2">
                    <div className="step-progress step-3 mt-3 pt-2">
                        <ul>
                            <li>
                                <img src={LogoStep1} style={{ opacity: "20%" }} /><br />
                                <i class="fas fa-sync-alt"></i>
                                <p>สร้างห้อง</p>
                            </li>
                            <li>
                                <img src={LogoStep2} style={{ opacity: '20%' }} /><br />
                                {/* <i class="fas fa-sync-alt"></i> */}
                                <i class="fas fa-times"></i>
                                <p>ระบุเงื่อนไข</p>
                            </li>
                            <li>
                                <img src={LogoStep3} style={{ opacity: '80%' }} /><br />
                                <i class="fas fa-times"></i>
                                <p>ตรวจสอบ</p>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="create-room-form py-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2"></div>

                            <div className="col-8">
                                <div className="Show-My-Room py-3">
                                    <div>
                                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                                    </div>
                                    <div className="container">
                                        <div className="Room-Details py-3">
                                            <div className="ShowRoom-TripName py-1">
                                                ชื่อทริป : {this.props.RoomForm.roomName}
                                            </div>
                                            {/* หน้าปก : {this.props.RoomForm.roomCover} <br /> */}
                                            <div className="ShowRoom-TripProvince py-1">
                                                จังหวัด : {this.props.RoomForm.province}
                                            </div>
                                            <div className="ShowRoom-Date py-1 ">
                                                วันเริ่ม - จบทริป
                                                <div className="py-2">
                                                    <span className="Show-Date pl-3 pr-3 ">
                                                    <button
                                                        type="button" class="ageCondition-btn btn p-1 ">
                                                        {momentjs(this.props.RoomForm.startDate).format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>  
                                                    <span className="pl-2 p-2">-</span>
                                                    <button
                                                        type="button" class="ageCondition-btn btn p-1">
                                                        {momentjs(this.props.RoomForm.endDate).format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ShowRoom-Condition py-1">
                                                เงื่อนไข
                                               
                                                    {this.props.RoomForm.genderCondition == 'ชาย' ?
                                                     <span className="Show-genderCondition pl-2 pr-2">
                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                        </span>
                                                        :
                                                        ""}
                                                    {this.props.RoomForm.genderCondition == 'หญิง' ?
                                                     <span className="Show-genderCondition pl-2 pr-2">
                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                        </span>
                                                        :
                                                        ""}
                                                    {this.props.RoomForm.genderCondition == 'ไม่จำกัดเพศ' ?
                                                     <span className="Show-genderCondition pl-2 pr-2">
                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                        </span>
                                                        :
                                                        ""} 
                                                <span className="Show-ageCondition pl-2">
                                                   <span className="pr-2"> อายุ </span>
                                                    <button
                                                    type="button" class="ageCondition-btn btn p-1 ">
                                                        {this.props.RoomForm.ageCondition}
                                                     </button>
                                                </span>
                                            </div>
                                            <div className="ShowRoom-MaxMember py-1">
                                                จำนวนเปิดรับ 
                                                <span className="Show-Members pl-2"> 
                                                <button
                                                    type="button" class="maxMember-btn btn p-0 ml-1 ">
                                                        {this.props.RoomForm.maxMember}
                                                    </button> 
                                                </span>
                                            </div>
                                            <div className="ShowRoom-TripDetails py-1">
                                                รายละเอียด 
                                                <div className="Show-Textdetails pt-1">
                                                
                                                     <div class="alert show-details-box ">
                                                     {this.props.RoomForm.tripDetails}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ShowRoom-QrCode py-1">
                                                QrCode
                                                <div className=" text-center">
                                                    <img src={TestQrCode} alt="QrCode" width="150" height="150" />
                                                    {/* QR code : {this.props.RoomForm.qrCode} <br /> */}
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="ConfirmButton text-center">
                                        
                                        <button type="button" className="btn btn-warning text-white mr-3" onClick={this.props.handlePreviousStep}>ย้อนกลับ</button>
                                        <button type="button" className="btn btn-warning text-white ml-3" onClick={this.handleSubmit}>เสร็จสิ้น</button>
                                       
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateRoomStep3);