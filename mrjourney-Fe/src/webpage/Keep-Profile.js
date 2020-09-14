import React, { useContext, useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import ProfileImg from '../static/img/bg-slide-test-1.jpg';
import '../static/css/App.css';
import '../static/css/Profile.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { Tabs, Tab } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { HookContext } from '../store/HookProvider';
import momentjs from 'moment'
import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import ProfileMoreDetails from '../components/Profile/ProfileMoreDetails';

function Profile(props) {
    const { AccProfile, handleAccProfileForm } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])
    const [gender, selectGender] = useState(["ชาย", "หญิง"])
    const [isEditProfile, setEditProfile] = useState(false)
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        axios.get(`http://localhost:5000/accountProfile?lineID=${user.lineID}`)
            .then(res => {
                setShowAcc(res.data)
            })
    }, [])

    const onSubmit = async () => {
        acc.map((acc) => {
            if (!AccProfile.fName) {
                AccProfile.fName = acc.fName
            }
            if (!AccProfile.lName) {
                AccProfile.lName = acc.lName
            }
            if (!AccProfile.gender) {
                AccProfile.gender = acc.gender
            }
            if (!AccProfile.birthday) {
                AccProfile.birthday = acc.birthday
            }
            if (!AccProfile.tel) {
                AccProfile.tel = acc.tel
            }
        })

        let dataUpdateProfile = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            fName: AccProfile.fName,
            lName: AccProfile.lName,
            gender: AccProfile.gender,
            birthday: AccProfile.birthday,
            tel: AccProfile.tel
        }
        await axios.put('http://localhost:5000/accountProfile/editAccountDetail', dataUpdateProfile)
            .then(async (res) => {
                console.log(res)
            })
        setEditProfile(false)
    }

    const onCancel = async () => {
        AccProfile.fName = "";
        AccProfile.lName = "";
        AccProfile.gender = "";
        AccProfile.birthday = "";
        AccProfile.tel = "";
        setEditProfile(false)
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />

                <div className="content-page pt-5">
                    <div className="Profile-Details text-center">
                        <img src={pictureURL} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                        <div className="line-name pt-2" style={{ fontSize: "28px" }}>คุณ : {displayName}</div>
                        <div className="personal-details">
                            {acc.map((acc) => {
                                return (
                                    <div className="edit-profile">
                                        {isEditProfile ?
                                            <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group row">
                                                    <label for="First Name" class="col-sm-4 col-form-label detail-label">ชื่อ </label>
                                                    <div class="col-sm-5">
                                                        <input type="text" className="form-control"
                                                            name="fName"
                                                            value={AccProfile.fName}
                                                            onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                                            placeholder={acc.fName}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="Last Name" class="col-sm-4 col-form-label detail-label">นามสกุล </label>
                                                    <div class="col-sm-5">
                                                        <input type="text" className="form-control"
                                                            name="lName"
                                                            value={AccProfile.lName}
                                                            onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                                            placeholder={acc.lName}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="Gender" class="col-sm-4 col-form-label detail-label">เพศ </label>
                                                    <div class="col-sm-5">
                                                        <select className=" btn province-btn dropdown-toggle"
                                                            name="gender"
                                                            value={AccProfile.gender}
                                                            onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                                            id="dropdownMenuButton"
                                                        >
                                                            <option value="" selected>กรุณาเลือกเพศ</option>
                                                            {gender.map((ShowGender) => {
                                                                return (
                                                                    <option value={ShowGender}>{ShowGender}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="Birth" class="col-sm-4 col-form-label detail-label">วันเกิด </label>
                                                    <div class="col-sm-5">
                                                        <input type="date" className="form-control"
                                                            name="birthday"
                                                            value={AccProfile.birthday}
                                                            onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                                            placeholder="Enter your birthday"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="Tel" class="col-sm-4 col-form-label detail-label">เบอร์โทรศัพท์ </label>
                                                    <div class="col-sm-5">
                                                        <input type="tel" size="10" className="form-control"
                                                            name="tel"
                                                            value={AccProfile.tel}
                                                            onChange={(e) => handleAccProfileForm(e.target.value, e.target.name)}
                                                            placeholder={acc.tel}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <button className="btn btn-danger mx-2" onClick={() => onCancel()}>cancel</button>
                                                    <button type="submit" className="btn btn-success mx-2" onClick={() => onSubmit()}>Submit</button>
                                                </div>
                                            </form>
                                            :
                                            <div className="show-profile">
                                                <div className="detail-text"> ชื่อ : {acc.fName} </div>
                                                <div className="detail-text"> นามสกุล : {acc.lName} </div>
                                                <div className="detail-text">เพศ : {acc.gender}</div>
                                                <div className="detail-text">วันเกิด : {momentjs(acc.birthday).format('ll')}</div>
                                                <div className="detail-text">เบอร์โทรศัพท์ : {acc.tel}</div>
                                                <div className="p-3">
                                                    <button type="submit" className="btn btn-primary" onClick={() => setEditProfile(true)}>Edit</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="container">
                        <div className="Profile-show-box mt-2" >
                            {acc.map((acc) => {
                                return (
                                    <ProfileMoreDetails accBio={acc}></ProfileMoreDetails>
                                )
                            })}
                        </div>
                        <div className="Profile-score py-2 mt-5">
                            <div className="container">
                                <div className="text-left pl-3">คะแนน</div><p />
                                <div className="row text-center">
                                    <div className="col-4">
                                        <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                        <div className="pt-2">ความสนุก</div>
                                    </div>
                                    <div className="col-4">
                                        <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                        <div className="pt-2">ความคุ้มค่า</div>
                                    </div>
                                    <div className="col-4">
                                        <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                        <div className="pt-2">การจัดการแผน</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div >
    )
}
export default withRouter(Profile);