import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker
} from 'antd';
import momentjs from 'moment';
import Stepper from '../components/Stepper';


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

function CreateRoomStep1(props) {
    const { thaiprovince, nextStep, handleRoomForm, Room } = useContext(HookContext)
    const [lineID, setLineId] = useState("");
    const { Option } = AntSelect;
    const { TextArea } = AntInput;
    const dateFormat = 'DD/MM/YYYY';

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
        handleRoomForm(values.startDate, 'startDate')
        handleRoomForm(values.endDate, 'endDate')
        handleRoomForm(values.tripDetails, 'tripDetails')
        nextStep(1)
    };

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
                                {/* <div class="pt-4 ">
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
                                </div> */}
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
                                                <DatePicker defaultValue={momentjs(new Date(), dateFormat)} format={dateFormat} />
                                            </AntForm.Item>
                                        </div>
                                        <div className="col-6">
                                            <AntForm.Item name="endDate" label="วันสิ้นสุดทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                                <DatePicker defaultValue={momentjs(new Date(), dateFormat)} format={dateFormat} />
                                            </AntForm.Item>
                                        </div>
                                    </div>
                                </div>
                                <AntForm.Item name="tripDetails" label="รายละเอียดการท่องเที่ยว" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <TextArea rows={4} placeholder="กรอกรายละเอียดการท่องเที่ยวของคุณ" />
                                </AntForm.Item>
                                {/* <div class="pt-4">
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
                                </div> */}
                                <div className="buttom-page pt-3">
                                    <AntForm.Item>
                                        <PrimaryButton type="primary" size={"large"} block htmlType="ถัดไป">ถัดไป</PrimaryButton>
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