import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Tooltip,
} from 'antd';
import momentjs from 'moment';
import Stepper from '../components/Stepper';
import { UploadOutlined } from '@ant-design/icons';


const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
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
`

function CreateRoomStep1(props) {
    const { thaiprovince, nextStep, handleRoomForm, Room } = useContext(HookContext)
    const [lineID, setLineId] = useState("");
    const { Option } = AntSelect;
    const { TextArea } = AntInput;
    const dateFormat = 'DD-MM-YYYY';
    const [fileRoomCover, setFileRoomCover] = useState('รูปหน้าปกห้อง')
    const [fileQrCode, setFileQrCode] = useState('คิวอาร์โค้ดกลุ่มไลน์')
    const [roomCoverImg, setRoomCoverImg] = useState(null)
    const [roomQrCodeImg, setRoomQrCodeImg] = useState(null)

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineId(user.lineID)
        }
    }, [])

    const onFinish = values => {
        handleRoomForm(values.roomName, 'roomName')
        handleRoomForm(values.province, 'province')
        handleRoomForm(momentjs(values.startDate).format('ll'), 'startDate')
        handleRoomForm(momentjs(values.endDate).format('ll'), 'endDate')
        handleRoomForm(values.tripDetails, 'tripDetails')
        handleRoomForm(roomCoverImg, 'roomCover')
        handleRoomForm(roomQrCodeImg, 'qrCode')
        nextStep(1)
    };

    const onStartDateChange = (date, dateString) => {
        handleRoomForm(momentjs(date).format('YYYY-MM-DD'), 'startDate')
    }

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

    return (
        <div>
            <div className="container py-2 mt-3">
                <Stepper typeStep="room" step={1} />
            </div>
            <div className="create-room-form pt-3">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <AntForm onFinish={onFinish}>
                                <AntForm.Item name="roomName" label="ชื่อทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <InputComponent placeholder="ใส่ชื่อทริปของคุณ" />
                                </AntForm.Item>
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
                                <div className="buttom-page pt-3">
                                    <AntForm.Item>
                                        <PrimaryButton type="primary" size={"large"} block htmlType="submit">ถัดไป</PrimaryButton>
                                    </AntForm.Item>
                                </div>
                            </AntForm>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateRoomStep1);