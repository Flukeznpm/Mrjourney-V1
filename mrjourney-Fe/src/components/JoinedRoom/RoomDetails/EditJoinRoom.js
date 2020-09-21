import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { useForm } from "react-hook-form";
import { HookContext } from '../../../store/HookProvider';
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Tooltip,
    InputNumber
} from 'antd';
import momentjs from 'moment';

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    background: #D91E36;
    border: #D91E36;
    &:hover , &:active, &:focus {
        background: #A21629;
        border: #A21629;
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

const DatePickerComponent = styled(DatePicker)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active {
        border-color: rgb(230, 111, 15);
    }
`;
const InputNumberComponent = styled(InputNumber)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-content: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

function EditJoinRoom(props) {
    const { thaiprovince, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext);
    const [lineID, setLineID] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [gender, selectGender] = useState(["ชาย", "หญิง", "ไม่จำกัดเพศ"]);
    const [age, selectAge] = useState(["18 ปีขึ้นไป", "20 ปีขึ้นไป", "ไม่จำกัดช่วงอายุ"]);
    const [roomStatus, setStatus] = useState(true);
    const [fileRoomCover, setFileRoomCover] = useState('รูปหน้าปกห้อง');
    const [fileQrCode, setFileQrCode] = useState('คิวอาร์โค้ดกลุ่มไลน์');
    const [roomCoverImg, setRoomCoverImg] = useState(null);
    const [roomQrCodeImg, setRoomQrCodeImg] = useState(null);
    const { Option } = AntSelect;
    const { TextArea } = AntInput;
    const dateFormat = 'DD-MM-YYYY';

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


    const onFileCoverChange = async (e) => {
        const file = e.target.files[0];
        setFileRoomCover(file.name)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            let generateNameImage = 'roomCover' + new Date().getTime();
            let dataBase64 = {
                image: reader.result,
                nameImage: generateNameImage
            }
            console.log(dataBase64.nameImage)
            await axios.post('http://localhost:5000/room/uploadRoomCoverImage', dataBase64)
                .then(res => {
                    console.log('URL: ', res)
                    setRoomCoverImg(res.data)
                })
        }
    }

    const onFileQrCodeChange = async (e) => {
        const file = e.target.files[0];
        setFileQrCode(file.name)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            let generateQrCodeName = 'roomQrCode' + new Date().getTime();
            let dataBase64 = {
                image: reader.result,
                nameImage: generateQrCodeName
            }
            console.log(dataBase64.nameImage)
            await axios.post('http://localhost:5000/room/uploadRoomQrCodeImage', dataBase64)
                .then(res => {
                    console.log('URL: ', res)
                    setRoomQrCodeImg(res.data)
                })
        }
    }

    // const onSubmit = async () => {
    //     if (!Room.roomName) {
    //         Room.roomName = props.roomDetail.roomName
    //     }
    //     if (!Room.province) {
    //         Room.province = props.roomDetail.province
    //     }
    //     if (!Room.roomName) {
    //         Room.roomName = props.roomDetail.startDate
    //     }
    //     if (!Room.startDate) {
    //         Room.endDate = props.roomDetail.endDate
    //     }
    //     if (!Room.maxMember || Room.maxMember === 0) {
    //         Room.maxMember = props.roomDetail.maxMember
    //     }
    //     if (!Room.ageCondition) {
    //         Room.ageCondition = props.roomDetail.ageCondition
    //     }
    //     if (!Room.genderCondition) {
    //         Room.genderCondition = props.roomDetail.genderCondition
    //     }
    //     if (!Room.tripDetails) {
    //         Room.tripDetails = props.roomDetail.tripDetails
    //     }

    //     let dataUpdateRoom = {
    //         roomID: props.roomDetail.roomID,
    //         lineID: lineID,
    //         roomName: Room.roomName,
    //         province: Room.province,
    //         startDate: Room.startDate,
    //         endDate: Room.endDate,
    //         maxMember: Room.maxMember,
    //         genderCondition: Room.genderCondition,
    //         ageCondition: Room.ageCondition,
    //         tripDetails: Room.tripDetails,
    //         roomStatus: roomStatus,
    //         roomCover: roomCoverImg,
    //         qrCode: roomQrCodeImg
    //     }

    //     await axios.put('http://localhost:5000/room/editRoom', dataUpdateRoom)
    //         .then(async (res) => {
    //             console.log(res)
    //         })
    //     props.setEditRoom(false)
    // }

    const onCancelEditRoom = () => {
        props.setEditRoom(false)
    }

    const onFinish = async (value) => {

        let dataUpdateRoom = {
            roomID: props.roomDetail.roomID,
            lineID: lineID,
            roomName: value.roomName,
            province: value.province,
            startDate: momentjs(value.startDate).format('ll'),
            endDate: momentjs(value.endDate).format('ll'),
            maxMember: value.maxMember,
            genderCondition: value.genderCondition,
            ageCondition: value.ageCondition,
            tripDetails: value.tripDetails,
            roomStatus: roomStatus,
            roomCover: roomCoverImg,
            qrCode: roomQrCodeImg
        }
        await axios.put('http://localhost:5000/room/editRoom', dataUpdateRoom)
            .then(async (res) => {
                console.log(res)
            })
        props.setEditRoom(false)
    };

    const onStartDateChange = (date, dateString) => {
        handleRoomForm(momentjs(date).format('YYYY-MM-DD'), 'startDate')
    }

    return (

        <div className="ShowRoom-Edit-Details">


            <Tooltip title="กรุณารอรูปตัวอย่างแสดง">
                <div class="input-group pt-3">
                    <div class="custom-file" >
                        <input type="file" class="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" onChange={onFileCoverChange} />
                        <label class="custom-file-label" for="inputGroupFile01">{fileRoomCover}</label>
                    </div>
                </div>
            </Tooltip>
            <Tooltip title="รูปปกห้อง">
                <div className="text-center pt-2">
                    <img width="150px" src={roomCoverImg} />
                </div>
            </Tooltip>

            <AntForm onFinish={onFinish}>
                <AntForm.Item name="roomName" label="ชื่อทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                    <InputComponent placeholder="ใส่ชื่อทริปของคุณ" />
                </AntForm.Item>
                <AntForm.Item name="province" labelCol={{ span: 24 }} label="จังหวัด" rules={[{ required: true }]}>
                    <AntSelect
                        placeholder="กรุณาเลือกจังหวัด"
                    >
                        {thaiprovince.map((ThaiProvinceShow) => {
                            return (
                                <Option value={ThaiProvinceShow}>{ThaiProvinceShow}</Option>
                            )
                        })}
                    </AntSelect>
                </AntForm.Item>
                <div className="col-12 p-0">
                    <div className="row">
                        <div className="col-6">
                            <AntForm.Item name="startDate" label="วันเริ่มทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <DatePickerComponent onChange={onStartDateChange}
                                    disabledDate={d => !d || d.isSameOrBefore(momentjs(new Date()).add(-1, 'day'))}
                                    format={dateFormat} />
                            </AntForm.Item>
                        </div>
                        <div className="col-6">
                            <AntForm.Item name="endDate" label="วันสิ้นสุดทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <DatePickerComponent
                                    disabledDate={d => !d || d.isSameOrBefore(Room.startDate)}
                                    format={dateFormat} />
                            </AntForm.Item>
                        </div>
                    </div>
                </div>
                <AntForm.Item name="maxMember" label="จำนวนที่เปิดรับ" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                    <InputNumberComponent min={1} style={{ width: "100%" }} />
                </AntForm.Item>
                <AntForm.Item name="genderCondition" labelCol={{ span: 24 }} label="เพศที่อนุญาต" rules={[{ required: true }]}>
                    <AntSelect
                        placeholder="กรุณาเลือกเพศที่อนุญาตให้ร่วมการท่องเที่ยว"
                    >
                        {gender.map((showGender) => {
                            return (
                                <Option value={showGender}>{showGender}</Option>
                            )
                        })}
                    </AntSelect>
                </AntForm.Item>
                <AntForm.Item name="ageCondition" labelCol={{ span: 24 }} label="ช่วงอายุ" rules={[{ required: true }]}>
                    <AntSelect
                        placeholder="กรุณาเลือกช่วงอายุที่อนุญาตให้ร่วมการท่องเที่ยว"
                    >
                        {age.map((showAge) => {
                            return (
                                <Option value={showAge}>{showAge}</Option>
                            )
                        })}
                    </AntSelect>
                </AntForm.Item>
                <AntForm.Item name="tripDetails" label="รายละเอียดการท่องเที่ยว" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                    <TextArea rows={4} placeholder="กรอกรายละเอียดการท่องเที่ยวของคุณ" />
                </AntForm.Item>
                <Tooltip title="กรุณารอรูปตัวอย่างแสดง">
                    <div class="input-group pt-3 pb-2">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01" onChange={onFileQrCodeChange} />
                            <label class="custom-file-label" for="inputGroupFile01">{fileQrCode}</label>
                        </div>
                    </div>
                </Tooltip>
                <Tooltip title="รูปคิวอาร์โค้ดกลุ่มไลน์">
                    <div className="text-center pt-2">
                        <img width="150px" src={roomQrCodeImg} />
                    </div>
                </Tooltip>
                <div className="container text-center py-3">
                    <AntForm.Item>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 d-flex align-items-center">
                                    <OutlineButton
                                        size={"large"}
                                        block htmlType="button"
                                        onClick={() => onCancelEditRoom()}
                                    >ยกเลิกแก้ไข</OutlineButton>
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                    <PrimaryButton
                                        type="primary"
                                        size={"large"}
                                        block htmlType="submit"
                                    >ยืนยันแก้ไข</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </AntForm.Item>
                </div>
            </AntForm>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            {/* <div className="ShowRoom-TripName py-1"> */}
            {/* <div className="form-group row d-flex align-items-center">
                        <label for="RoomName" class="col-sm-3 col-form-label">ชื่อทริป : </label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control"
                                name="roomName"
                                value={Room.roomName}
                                onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                                placeholder={props.roomDetail.roomName}
                            />
                        </div>
                    </div> */}
            {/* </div> */}
            {/* <div className="ShowRoom-TripProvince py-1">
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
                </div> */}
            {/* <div className="ShowRoom-Date py-1 ">
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
                </div> */}
            {/* <div className="ShowRoom-Condition py-1">
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
                </div> */}
            {/* <div className="ShowRoom-Maxmber py-2">
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
                </div> */}
            {/* <div class="pt-4">
                    <label for="exampleInputEmail1">รายละเอียด</label>
                    <textarea class="form-control" rows="3"
                        name="tripDetails"
                        value={Room.tripDetails}
                        ref={register({ required: true })}
                        onChange={(e) => handleRoomForm(e.target.value, e.target.name)}
                        placeholder={props.roomDetail.tripDetails}
                    />
                </div> */}
            {/* </form> */}

        </div>

    )
}

export default EditJoinRoom;