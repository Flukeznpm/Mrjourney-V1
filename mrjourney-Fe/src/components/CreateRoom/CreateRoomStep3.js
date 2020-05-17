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
                    <div className="Show-RoomDetails py-3">
                        <div className="container">
                            <div className="Room-Details">
                                ชื่อทริป : {this.props.RoomForm.roomName}
                                <p />จังหวัด : {this.props.RoomForm.roomCover}
                                <p />วันเริ่ม-วันจบ : {this.props.RoomForm.EndDate}
                                <p />เงื่อนไข : {this.props.RoomForm.tripDetails}
                                <p />รายละเอียด : {this.props.RoomForm.qrCode}
                                <p />คิวอาร์โค้ด : {this.props.RoomForm.genderCondition}
                            </div>
                        </div>
                        <button>ย้อนกลับ</button>
                        <button>เสร็จสิ้น</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateRoomStep2;