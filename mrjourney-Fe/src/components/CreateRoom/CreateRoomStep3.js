import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import BgSlide1 from '../../static/img/pr-01.png';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

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
                <div className="create-room-form pb-3">
                    <div>
                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                    </div>
                    <div className="container">
                        <div className="Room-Details">
                            ชื่อทริป : {this.props.RoomForm.roomName} <br />
                            {/* หน้าปก : {this.props.RoomForm.roomCover} <br /> */}
                            จังหวัก : {this.props.RoomForm.province}<br />
                            วันเริ่มทริป : {this.props.RoomForm.startDate} <br />
                            วันจบทริป : {this.props.RoomForm.endDate} <br />
                            รายละเอียด : {this.props.RoomForm.tripDetails} <br />
                            {/* QR code : {this.props.RoomForm.qrCode} <br /> */}
                            อายุ : {this.props.RoomForm.genderCondition}
                        </div>
                    </div>
                </div>

                <button type='button' onClick={this.handleSubmit}>ยืนยัน</button>

            </div>
        )
    }
}

export default withRouter(CreateRoomStep3);