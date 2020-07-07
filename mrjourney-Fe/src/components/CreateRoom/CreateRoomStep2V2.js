import React, { useContext } from 'react'
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
// import FooterTripPage from '../components/Footer/FooterTripPage';
import FooterTripPage from '../Footer/FooterTripPage'
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'

function CreateRoomStep2V2()  {
    const { nextStep, prevStep } = useContext(HookContext)
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
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <form>
                                    <div className="form-group">
                                        <div className="container">
                                            <h1>Step2</h1>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1">ชื่อทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <input type="text" class="form-control"
                                                    name="roomName"
                                                    placeholder="ใส่ชื่อทริปของคุณ" />
                                            </div>
                                            <div class="pt-4 ">
                                                <label for="exampleInputEmail1">หน้าปกทริป<span className="p-1" style={{ color: "red", fontSize: "12px" }}>(ขนาดไม่เกิน 800px)</span></label>
                                                {/* <input type="file" class="form-control-file"
                                                    name="roomCover"
                                                    value={this.props.RoomForm.roomCover}
                                                    onChange={(e) => this.props.handleForm(e)}
                                                    placeholder="ใส่ชื่อทริปของคุณ" /> */}

                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="validatedCustomFile"
                                                        name="roomCover"
                                                    />
                                                    <label class="custom-file-label" for="validatedCustomFile" ></label>
                                                </div>

                                            </div>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1" >จังหวัด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <div className="btn-group pl-5">
                                                    <select className=" btn province-btn dropdown-toggle"
                                                        name="province"
                                                        id="dropdownMenuButton"
                                                    >
                                                        <option value="selected" selected>กรุณาเลือกจังหวัด</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1">วันเริ่มทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <input type="date" class="form-control"
                                                    name="startDate"
                                                />
                                            </div>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1">วันสิ้นสุดทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <input type="date" class="form-control"
                                                    name="endDate"
                                                />
                                            </div>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1">รายละเอียดการเดินทาง<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <textarea class="form-control" rows="3"
                                                    name="tripDetails"
                                                />
                                            </div>
                                            <div class="pt-4">
                                                <label for="exampleInputEmail1">คิวอาร์โค้ด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                {/* <input type="file" class="form-control-file"
                                                    name="qrCode"
                                                    value={this.props.RoomForm.qrCode}
                                                    onChange={(e) => this.props.handleForm(e)}
                                                /> */}
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="validatedCustomFile"
                                                        name="qrCode"
                                                    />
                                                    <label class="custom-file-label" for="validatedCustomFile" ></label>
                                                </div>

                                            </div>



                                            <div className="buttom-page py-3">
                                                <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                                    {/* <div className=" col-2 float-right "> */}
                                                    <div className="next-btn">
                                                        <button type="submit" className="btn btn-warning btn-lg btn-block text-white"
                                                           onClick={() => prevStep(1)}>ต่อไป</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default withRouter(CreateRoomStep2V2);