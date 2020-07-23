import React, { useContext, useState, useEffect } from 'react';
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import { useForm } from "react-hook-form";
import RequiredForm from "../Required/RequiredForm"

function CreateRoomStep1(props) {
    const { thaiprovince, nextStep, handleRoomForm, Room } = useContext(HookContext)
    const [lineID, setLineId] = useState("");
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineId(user.lineID)
        }
    }, [])

    const onSubmit = () => {
        if (Room.roomName && Room.province && Room.startDate && Room.endDate) {
            nextStep(1)
        } else {
            return false
        }
    };

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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <div className="container">
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1">ชื่อทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <input type="text" class="form-control"
                                                name="roomName"
                                                value={Room.roomName}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                ref={register({ required: true })}
                                                placeholder="ใส่ชื่อทริปของคุณ"
                                            />
                                            {errors.roomName && <RequiredForm />}
                                        </div>
                                        <div class="pt-4 ">
                                            <label for="exampleInputEmail1">หน้าปกทริป<span className="p-1" style={{ color: "red", fontSize: "12px" }}>(ขนาดไม่เกิน 800px)</span></label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="validatedCustomFile"
                                                    name="roomCover"
                                                    value={Room.roomCover}
                                                    ref={register({ required: true })}
                                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                />
                                                <label class="custom-file-label" for="validatedCustomFile" >{Room.roomCover}</label>
                                                {errors.roomCover && <RequiredForm />}
                                            </div>
                                        </div>
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1" >จังหวัด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div className="btn-group pl-5">
                                                <select className=" btn province-btn dropdown-toggle"
                                                    name="province"
                                                    value={Room.province}
                                                    ref={register({ required: true })}
                                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                    id="dropdownMenuButton"
                                                >
                                                    <option value="" selected>กรุณาเลือกจังหวัด</option>
                                                    {thaiprovince.map((ThaiProvinceShow) => {
                                                        return (
                                                            <option value={ThaiProvinceShow}>{ThaiProvinceShow}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {errors.province && <RequiredForm />}
                                        </div>
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1">วันเริ่มทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <input type="date" class="form-control"
                                                name="startDate"
                                                value={Room.startDate}
                                                max={Room.endDate}
                                                ref={register({ required: true })}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                            />
                                            {errors.startDate && <RequiredForm />}
                                        </div>
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1">วันสิ้นสุดทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <input type="date" class="form-control"
                                                name="endDate"
                                                value={Room.endDate}
                                                min={Room.startDate}
                                                ref={register({ required: true })}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                            />
                                            {errors.endDate && <RequiredForm />}
                                        </div>
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1">รายละเอียดการเดินทาง<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <textarea class="form-control" rows="3"
                                                name="tripDetails"
                                                value={Room.tripDetails}
                                                ref={register({ required: true })}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                            />
                                            {errors.tripDetails && <RequiredForm />}
                                        </div>
                                        <div class="pt-4">
                                            <label for="exampleInputEmail1">คิวอาร์โค้ด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="validatedCustomFile"
                                                    name="qrCode"
                                                    value={Room.qrCode}
                                                    ref={register({ required: true })}
                                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                />
                                                <label class="custom-file-label" for="validatedCustomFile" >{Room.qrCode}</label>
                                                {errors.qrCode && <RequiredForm />}
                                            </div>
                                        </div>
                                        <div className="buttom-page py-3">
                                            <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                                <div className="next-btn">
                                                    <button type="submit" className="btn btn-warning btn-lg btn-block text-white"
                                                        onClick={() => onSubmit()}>ต่อไป</button>
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

export default withRouter(CreateRoomStep1);