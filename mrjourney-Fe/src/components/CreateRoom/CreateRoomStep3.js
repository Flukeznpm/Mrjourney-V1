import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import BgSlide1 from '../../static/img/pr-01.png';

class CreateRoomStep2 extends React.Component {

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
                            ชื่อทริป : {this.props.RoomForm.roomName}
                            ชื่อทริป : {this.props.RoomForm.roomCover}
                            ชื่อทริป : {this.props.RoomForm.EndDate}
                            ชื่อทริป : {this.props.RoomForm.tripDetails}
                            ชื่อทริป : {this.props.RoomForm.qrCode}
                            ชื่อทริป : {this.props.RoomForm.genderCondition}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateRoomStep2;