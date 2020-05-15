import React from 'react';

import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
// import FooterTripPage from '../components/Footer/FooterTripPage';
import FooterTripPage from '../../components/Footer/FooterTripPage'

class CreateRoomStep1 extends React.Component {
    constructor() {
        super()
        this.state = {
            thaiprovince: [
                'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
                'ขอบแก่น',
                'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
                'ตรัง', 'ตราด', 'ตาก',
                'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราข', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
                'บึงกาฬ', 'บุรีรัมย์',
                'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
                'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา',
                'ภูเก็ต',
                'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
                'ยะลา', 'ยโสธร',
                'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
                'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
                'ศรีสะเกษ',
                'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
                'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ']

        }
    }
    render() {
        return (
            <div>
                <div className="show-step-room py-2">
                    <div className="step-progress step-1 mt-3 pt-2">
                        <ul>
                            <li>
                                <img src={LogoStep1} style={{ opacity: "80%" }} /><br />
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
                                <img src={LogoStep3} style={{ opacity: '20%' }} /><br />
                                <i class="fas fa-times"></i>
                                <p>ตรวจสอบ</p>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="create-room-form py-3">
                    <form>
                        <div className="form-group">
                            <div className="container">
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">ชื่อทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <input type="text" class="form-control"
                                        name="roomName"
                                        value={this.props.RoomForm.roomName}
                                        onChange={(e) => this.props.handleForm(e)}
                                        placeholder="ใส่ชื่อทริปของคุณ" />
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">หน้าปกทริป<span className="p-1" style={{ color: "red", fontSize: "12px" }}>(ขนาดไม่เกิน 800px)</span></label>
                                    <input type="file" class="form-control-file"
                                        name="roomCover"
                                        value={this.props.RoomForm.roomCover}
                                        onChange={(e) => this.props.handleForm(e)}
                                        placeholder="ใส่ชื่อทริปของคุณ" />
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1" >จังหวัด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <div className="btn-group pl-5">
                                        <select className=" btn province-btn dropdown-toggle"
                                            name="Province"
                                            value={this.props.RoomForm.Province}
                                            onChange={(e) => this.props.handleForm(e)}
                                            id="dropdownMenuButton">
                                            {this.state.thaiprovince.map((ThaiProvinceShow) => {
                                                return (
                                                    <option value={ThaiProvinceShow}>{ThaiProvinceShow}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">วันเริ่มทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <input type="date" class="form-control"
                                        name="StartDate"
                                        value={this.props.RoomForm.StartDate}
                                        onChange={(e) => this.props.handleForm(e)}
                                    />
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">วันสิ้นสุดทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <input type="date" class="form-control"
                                        name="EndDate"
                                        value={this.props.RoomForm.EndDate}
                                        onChange={(e) => this.props.handleForm(e)}
                                    />
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">รายละเอียดการเดินทาง<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <textarea class="form-control" rows="3"
                                        name="tripDetails"
                                        value={this.props.RoomForm.tripDetails}
                                        onChange={(e) => this.props.handleForm(e)}
                                    />
                                </div>
                                <div class="pt-4">
                                    <label for="exampleInputEmail1">คิวอาร์โค้ด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                    <input type="file" class="form-control-file"
                                        name="qrCode"
                                        value={this.props.RoomForm.qrCode}
                                        onChange={(e) => this.props.handleForm(e)}
                                    />
                                </div>



                                <div className="buttom-page py-3">
                                    <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                        {/* <div className=" col-2 float-right "> */}
                                        <div className="next-btn">
                                            <button type="button" className="btn btn-warning btn-lg btn-block text-white"
                                                onClick={this.props.handleStep}>ต่อไป</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default CreateRoomStep1;