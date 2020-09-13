import React, { useContext, useEffect, useState } from 'react';
import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
import momentjs from 'moment'
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { useForm } from "react-hook-form";
import { HookContext } from '../../store/HookProvider';

function RoomDetails(props) {
    const { thaiprovince, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [gender, selectGender] = useState(["ชาย", "หญิง", "ไม่จำกัดเพศ"])
    const [age, selectAge] = useState(["18 ปีขึ้นไป", "20 ปีขึ้นไป", "ไม่จำกัดช่วงอายุ"])
    const [roomStatus, setStatus] = useState(true)
    const [isEditRoom, setEditRoom] = useState(false)
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
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
        if(!Room.roomName) {
            Room.roomName = props.roomDetail.roomName
        }
        if(!Room.province) {
            Room.province = props.roomDetail.province
        }
        if(!Room.roomName) {
            Room.roomName = props.roomDetail.startDate
        }
        if(!Room.startDate) {
            Room.endDate = props.roomDetail.endDate
        }
        if(!Room.maxMember || Room.maxMember === 0) {
            Room.maxMember = props.roomDetail.maxMember
        }
        if(!Room.ageCondition) {
            Room.ageCondition = props.roomDetail.ageCondition
        }
        if(!Room.genderCondition) {
            Room.genderCondition = props.roomDetail.genderCondition
        }
        if(!Room.tripDetails) {
            Room.tripDetails = props.roomDetail.tripDetails
        }
        let dataUpdateRoom = {
            roomID: props.roomDetail.roomID,
            // ownerRoom: ownerRoom,
            lineID: lineID,
            roomName: Room.roomName,
            province: Room.province,
            startDate: Room.startDate,
            endDate: Room.endDate,
            maxMember: Room.maxMember,
            genderCondition: Room.genderCondition,
            ageCondition: Room.ageCondition,
            tripDetails: Room.tripDetails,
            roomStatus: roomStatus
        }
        await axios.put('http://localhost:5000/room/editRoom', dataUpdateRoom)
            .then(async (res) => {
                console.log(res)
            })
        setEditRoom(false)
    }

    const onCancelEditRoom = () => {
        Room.roomName = "";
        Room.province = "";
        Room.startDate = "";
        Room.endDate = "";
        Room.maxMember = "";
        Room.ageCondition = "";
        Room.genderCondition = "";
        Room.tripDetails = "";
        setEditRoom(false)
    }
    
    const onEditRoom = (room) => {
        Room.roomName = room.roomName
        Room.province = room.province
        Room.startDate = room.startDate
        Room.endDate = room.endDate
        Room.maxMember = room.maxMember
        Room.ageCondition = room.ageCondition
        Room.genderCondition = room.genderCondition
        Room.tripDetails = room.tripDetails
        setEditRoom(true)
    }

    const AlertCloseRoom = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่ที่จะต้องการปิดห้อง?',
            text: 'เมื่อทำการปิดห้อง จะทำให้ไม่สามารถรับสมาชิกเพิ่มได้',
            showCancelButton: true,
            confirmButtonText: 'ปิดห้อง',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่ห้อง',
        })
    }

    return (
        <div className="col-9">
            <div className="container py-3">
                {isEditRoom === false ?
                    <div className="ShowRoom-Details">
                        <div className="ShowRoom-TripName py-1" style={{ fontSize: "30px" }}>
                            ชื่อทริป : {props.roomDetail.roomName}
                        </div>
                        <div style={{ fontSize: "18px" }}>
                            <div className="ShowRoom-TripProvince py-1">
                                <span className="pr-2"> จังหวัด </span>
                                <button
                                    type="button" class="show-details-btn btn p-1 ">
                                    {props.roomDetail.province}
                                </button>
                            </div>
                            <div className="ShowRoom-Date py-1 ">
                                วันเริ่ม - จบทริป
                                                <div className="py-2">
                                    <span className="Show-Date pl-3 pr-3 ">
                                        <button
                                            type="button" class="show-details-btn btn p-1 ">
                                            {momentjs(props.roomDetail.startDate).format('DD/MM/YYYY')}
                                            <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                        <span className="pl-2 p-2">-</span>
                                        <button
                                            type="button" class="show-details-btn btn p-1">
                                            {momentjs(props.roomDetail.endDate).format('DD/MM/YYYY')}
                                            <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="ShowRoom-Condition py-1">
                                เงื่อนไข
                         <div className="py-2">
                                    เพศ {props.roomDetail.genderCondition === 'ชาย' ?
                                        <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                            <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                        </span>
                                        :
                                        ""}
                                    {props.roomDetail.genderCondition === 'หญิง' ?
                                        <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                            <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                        </span>
                                        :
                                        ""}
                                    {props.roomDetail.genderCondition === 'ไม่จำกัดเพศ' ?
                                        <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                            <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                            <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                        </span>
                                        :
                                        ""}
                                    <span className="Show-ageCondition pl-2">
                                        <span className="pr-2"> อายุ </span>
                                        <button
                                            type="button" class="show-details-btn btn p-1 ">
                                            {props.roomDetail.ageCondition}
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="ShowRoom-MaxMember py-1">
                                <label for="exampleInputEmail1">จำนวนคนที่เปิดรับ</label>
                                <button
                                    type="button" class="maxMember-btn btn ml-2 text-center"
                                    style={{ width: "40px", height: "40px" }}
                                >
                                    {props.members}/
                                    {props.roomDetail.maxMember}
                                </button>
                            </div>
                            <div class="pt-4">
                                <label for="exampleInputEmail1">รายละเอียด</label>
                                <textarea disabled class="form-control" id="exampleFormControlTextarea1" rows="3" value={props.roomDetail.tripDetails}>
                                </textarea>
                            </div>
                            <div className="ShowRoom-QrCode py-1">
                                QrCode
                                <div className=" text-center">
                                    <img src={TestQrCode} alt="QrCode" width="150" height="150" />
                                </div>
                            </div>
                        </div>
                        <div className="container text-center py-3">
                            <button type="button" className="btn btn-warning mr-3 text-white" onClick={() => onEditRoom(props.roomDetail)}>แก้ไขห้อง</button>
                            <button type="button" className="btn btn-warning ml-3 text-white" onClick={AlertCloseRoom}>ปิดห้อง</button>
                        </div>
                    </div>
                    :
                    //EditRoom
                    <div className="ShowRoom-Edit-Details" style={{ fontSize: "18px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="ShowRoom-TripName py-1">
                                <div className="form-group row d-flex align-items-center">
                                    <label for="RoomName" class="col-sm-3 col-form-label">ชื่อทริป : </label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control"
                                            name="roomName"
                                            value={Room.roomName}
                                            onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                            placeholder={props.roomDetail.roomName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ShowRoom-TripProvince py-1">
                                <div className="form-group row d-flex align-items-center">
                                    <label for="RoomName" class="col-sm-3 col-form-label">จังหวัด :</label>
                                    <div className="col-sm-6 btn-group">
                                        <select className=" btn province-btn dropdown-toggle"
                                            name="province"
                                            value={Room.province}
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
                                </div>
                            </div>
                            <div className="ShowRoom-Date py-1 ">
                                วันเริ่ม - จบทริป
                                    <div className="Show-Date pl-3 pr-3 py-2">
                                    <div className="form-group row d-flex align-items-center">
                                        <input type="date" class="col-sm-4 form-control"
                                            name="startDate"
                                            value={Room.startDate}
                                            max={Room.endDate}
                                            onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                        />
                                        <div className="col-sm-1 text-center">-</div>
                                        <input type="date" class="col-sm-4 form-control"
                                            name="endDate"
                                            value={Room.endDate}
                                            min={Room.startDate}
                                            onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ShowRoom-Condition py-1">
                                เงื่อนไข
                                    <div className="py-2">
                                    <span className="Show-genderCondition pr-2">
                                        <span className="pr-2"> เพศ </span>
                                        <div className="btn-group pl-4">
                                            <select className=" btn province-btn dropdown-toggle"
                                                name="genderCondition"
                                                value={Room.genderCondition}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
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
                                    </span>
                                    <span className="Show-ageCondition pl-2">
                                        <span className="pr-2"> อายุ </span>
                                        <div className="btn-group pl-4">
                                            <select className=" btn province-btn dropdown-toggle"
                                                name="ageCondition"
                                                value={Room.ageCondition}
                                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                                id="dropdownMenuButton"
                                            >
                                                <option value="" selected>กรุณาเลือกช่วงอายุ</option>
                                                {age.map((ShowAge) => {
                                                    return (
                                                        <option value={ShowAge}>{ShowAge}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="ShowRoom-Maxmber py-2">
                                <label>จำนวนคนที่เปิดรับ</label>
                                <div className="input-group">
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-default btn-number"
                                            onClick={() => minusMember(1)}>
                                            <span className="fas fa-minus"></span>
                                        </button>
                                    </span>
                                    <input type="text"
                                        name="maxMember"
                                        className="form-control input-number"
                                        value={Room.maxMember}
                                    />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-default btn-number"
                                            onClick={() => plusMember(1)}>
                                            <span className="fas fa-plus" aria-hidden="true"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="pt-4">
                                <label for="exampleInputEmail1">รายละเอียด</label>
                                <textarea class="form-control" rows="3"
                                    name="tripDetails"
                                    value={Room.tripDetails}
                                    ref={register({ required: true })}
                                    onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                    placeholder={props.roomDetail.tripDetails}
                                />
                            </div>
                            <div className="ShowRoom-QrCode py-1">
                                QrCode
                                <div className=" text-center">
                                    <img src={TestQrCode} alt="QrCode" width="150" height="150" />
                                </div>
                            </div>

                            <div className="container text-center py-3">
                                <button type="button"
                                    className="btn btn-danger mr-3 text-white"
                                    onClick={() => onCancelEditRoom()}>
                                    ยกเลิกแก้ไข
                                </button>
                                <button type="button"
                                    className="btn btn-success ml-3 text-white"
                                    onClick={() => onSubmit()}>
                                    ยืนยันการแก้ไข
                                </button>
                            </div>

                        </form>
                    </div>
                }
            </div>
        </div >
    )
}

export default RoomDetails;