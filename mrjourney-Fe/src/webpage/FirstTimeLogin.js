import React, { useContext, useEffect, useState } from 'react';
import '../static/css/Login.css';
import { HookContext } from '../store/HookProvider';
import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import Swal from 'sweetalert2';

function FirstTimeLogin(props) {

    const { AccProfile, handleAccProfileForm } = useContext(HookContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
        }
    }, [])

    const onSubmit = async () => {
        let dataProfile = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            fName: AccProfile.fName,
            lName: AccProfile.lName,
            gender: AccProfile.gender,
            birthday: AccProfile.birthday,
            tel: AccProfile.tel
        }

        await axios.post('http://localhost:5000/accountProfile/createAccountDetail', dataProfile)
            .then(async (res) => {
                console.log(res)
            })
        Swal.fire({
            icon: 'success',
            title: 'ลงทะเบียนสำเร็จ!',
            text: 'ขอให้คุณสนุกกับการท่องเที่ยว',
            confirmButtonColor: '#31CC71',
            confirmButtonText: '<a href="/Home" id="alert-confirm-button">กลับสู่หน้าหลัก</a>',
        })
    };

    return (
        <div className="LoginPage">
            <div className="d-flex justify-content-center">
                <div className="Firstinfo-login ">
                    <form onSubmit={handleSubmit(onSubmit)} className="m-3" >
                        <h3 className="text-center">More information</h3>

                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control"
                                name="fName"
                                value={AccProfile.fName}
                                onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control"
                                name="lName"
                                value={AccProfile.lName}
                                onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                placeholder="Enter your last name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Birthday</label>
                            <input type="date" className="form-control"
                                name="birthday"
                                value={AccProfile.birthday}
                                onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                placeholder="Enter your birthday"
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <br />
                            <select className=" btn province-btn dropdown-toggle"
                                name="gender"
                                value={AccProfile.gender}
                                onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                id="dropdownMenuButton"
                            >
                                <option value="">กรุณาเลือกเพศของคุณ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" size="10" className="form-control"
                                name="tel"
                                value={AccProfile.tel}
                                onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                placeholder="Enter your phone number" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input " id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">ยอมรับว่าข้อมูลข้างต้นเป็นจริงทุกประการ</label>
                            </div>

                        </div>
                        <button type="submit" className="btn firstLogin-btn btn-block" onClick={() => onSubmit()}>Submit</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default FirstTimeLogin;