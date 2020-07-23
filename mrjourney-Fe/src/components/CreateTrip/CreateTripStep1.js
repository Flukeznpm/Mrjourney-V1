import React, { useContext, useEffect, useState } from 'react';
import '../../static/css/App.css';
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


function CreateTripStep1(props) {
    const { thaiprovince, handleTripForm, plusDate, minusDate, Trip, confirmTripStep, toDate } = useContext(HookContext)

    const [Linename, setLineName] = useState('')
    const [Linepicture, setLinePicture] = useState('')
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineName(user.displayName)
            setLinePicture(user.pictureURL)
        }
    }, [])

    const onSubmit = () => {
        if (Trip.tripName && Trip.province && Trip.date) {
            confirmTripStep(1)
        } else {
            return false
        }
    };

    return (
        <div>
            <div className="top-page">
                <div className="step-progress step-1 mt-3 pt-2" >
                    <ul>
                        <li>
                            <img src={LogoStep1} style={{ opacity: "80%" }} /><br />
                            <i class="fas fa-sync-alt"></i>
                            <p>สร้างแผน</p>
                        </li>
                        <li>
                            <img src={LogoStep2} style={{ opacity: '20%' }} /><br />
                            <i class="fas fa-times"></i>
                            <p>ระบุรายละเอียด</p>
                        </li>
                        <li>
                            <img src={LogoStep3} style={{ opacity: '20%' }} /><br />
                            <i class="fas fa-times"></i>
                            <p>เสร็จสิ้น</p>
                        </li>
                    </ul>
                </div>
                <div className="content-page py-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <div className="py-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <div className="InputFrom">
                                                <div className="pt-4">
                                                    <label htmlFor="exampleInputEmail1">ชื่อทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                    <input type='text' className="form-control"
                                                        name="tripName"
                                                        value={Trip.tripName}
                                                        onChange={(e) => handleTripForm(e.target.value, e.target.name)}
                                                        placeholder="ใส่ชื่อทริปท่องเที่ยว"
                                                        ref={register({ required: true })}
                                                    />
                                                </div>
                                                {errors.tripName && <RequiredForm />}
                                            </div>
                                            <div className="InputFrom">
                                                <div className="pt-4">
                                                    <label htmlFor="exampleInputEmail1" >จังหวัด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                    <div className="btn-group pl-5">
                                                        <select className=" btn province-btn dropdown-toggle"
                                                            name="province"
                                                            value={Trip.province}
                                                            onChange={(e) => handleTripForm(e.target.value, e.target.name)}
                                                            id="dropdownMenuButton"
                                                            ref={register({ required: true })}
                                                        >
                                                            <option value="" selected>กรุณาเลือกจังหวัด</option>
                                                            {thaiprovince.map((ThaiProvinceShow) => {
                                                                return (
                                                                    <option value={ThaiProvinceShow}>{ThaiProvinceShow}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                {errors.province && <RequiredForm />}
                                            </div>
                                            <div className="InputFrom">
                                                <div className="pt-4">
                                                    <label htmlFor="exampleInputEmail1">เลือกวันเริ่มเดินทาง<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                    <input type='date' className="form-control"
                                                        name="date"
                                                        value={Trip.date}
                                                        min={toDate}
                                                        onChange={(e) => handleTripForm(e.target.value, e.target.name)}
                                                        ref={register({ required: true })}
                                                    />
                                                </div>
                                                {errors.date && <RequiredForm />}
                                            </div>
                                            <div className="col pt-4">
                                                <label htmlFor="example-date-input">จำนวนวัน<span className="p-1" style={{ color: "red" }}>*</span></label>
                                                <div className="input-group">

                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default btn-number"
                                                            onClick={() => minusDate(1)}>
                                                            <span className="fas fa-minus"></span>
                                                        </button>
                                                    </span>
                                                    <input type="text"
                                                        name="numberAddDate"
                                                        className="form-control input-number"
                                                        value={Trip.numberAddDate}
                                                        ref={register({ required: true })}
                                                    />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default btn-number"
                                                            onClick={() => plusDate(1)}>
                                                            <span className="fas fa-plus" aria-hidden="true"></span>
                                                        </button>
                                                    </span>
                                                </div>
                                                {errors.numberAddDate && <RequiredForm />}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-2"></div>
                                                <div className="col-8">
                                                    <div className="buttom-page py-3">
                                                        <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                                            <div className="next-btn">
                                                                <button type="submit" className="btn btn-warning btn-lg btn-block text-white"
                                                                    onClick={() => onSubmit()}>ต่อไป</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2"></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default withRouter(CreateTripStep1);


