import React, { useContext, useState, useEffect } from 'react';
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'

function CreateRoomStep2(props) {
    const { nextStep, prevStep, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext)
    const [gender, selectGender] = useState(["ชาย", "หญิง", "ไม่จำกัดเพศ"])
    const [age, selectAge] = useState(["18 ปีขึ้นไป", "20 ปีขึ้นไป", "ไม่จำกัดช่วงอายุ"])
    const [lineID, setLineID] = useState("")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
        }
    }, [])

    return (
        <div>
            <div className="show-step-room py-2">
                <div className="step-progress step-2 mt-3 pt-2">
                    <ul>
                        <li>
                            <img src={LogoStep1} style={{ opacity: "20%" }} /><br />
                            <i class="fas fa-sync-alt"></i>
                            <p>สร้างห้อง</p>
                        </li>
                        <li>
                            <img src={LogoStep2} style={{ opacity: '80%' }} /><br />
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

                                        <div className="pt-4">
                                            <label htmlFor="example-date-input">จำนวนคนที่เปิดรับ<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div className="input-group">

                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-default btn-number"
                                                        onClick={() => minusMember(1)}>
                                                        <span className="fas fa-minus"></span>
                                                    </button>
                                                </span>

                                                <input type="text" name="maxMember"
                                                    className="form-control input-number"
                                                    value={Room.maxMember} />

                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-default btn-number"
                                                        onClick={() => plusMember(1)}>
                                                        <span className="fas fa-plus" aria-hidden="true"></span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>


                                        <div class="pt-4">
                                            <label for="exampleInputEmail1" >เพศที่ต้องการให้ร่วมการท่องเที่ยว<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div className="btn-group pl-5">
                                                <select className=" btn province-btn dropdown-toggle"
                                                    name="genderCondition"
                                                    value={Room.genderCondition}
                                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                    id="dropdownMenuButton">
                                                    <option value="selected" selected>กรุณาเลือกเพศ</option>
                                                    {gender.map((ShowGender) => {
                                                        return (
                                                            <option value={ShowGender}>{ShowGender}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>


                                        <div class="pt-4">
                                            <label for="exampleInputEmail1" >ช่วงอายุที่ต้องการให้ร่วมการท่องเที่ยว<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div className="btn-group pl-5">
                                                <select className=" btn province-btn dropdown-toggle"
                                                    name="ageCondition"
                                                    value={Room.ageCondition}
                                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                    id="dropdownMenuButton">
                                                    <option value="selected" selected>กรุณาเลือกช่วงอายุ</option>
                                                    {age.map((ShowAge) => {
                                                        return (
                                                            <option value={ShowAge}>{ShowAge}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>



                                        <div className="buttom-page py-3">
                                            <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                                <div className="row">
                                                    <div className="next-btn col-6">
                                                        <button type="button" className="btn btn-warning btn-lg btn-block text-white"
                                                            onClick={() => prevStep(1)}>ย้อนกลับ</button>
                                                    </div>
                                                    <div className="next-btn col-6">
                                                        <button type="button" className="btn btn-warning btn-lg btn-block text-white"
                                                            onClick={() => nextStep(1)}>ต่อไป</button>
                                                    </div>
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


export default withRouter(CreateRoomStep2);