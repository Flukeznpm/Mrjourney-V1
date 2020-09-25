import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    Steps,
    InputNumber
} from 'antd';
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

const InputNumberComponent = styled(InputNumber)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-content: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

function CreateRoomStep2(props) {
    const { nextStep, prevStep, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext)
    const [gender, selectGender] = useState(["ชาย", "หญิง", "ไม่จำกัดเพศ"])
    const [age, selectAge] = useState(["ต่ำกว่า 18 ปี", "18-25 ปี", "25 ปีขึ้นไป", "ไม่จำกัดช่วงอายุ"])
    const [lineID, setLineID] = useState("")
    const [form] = AntForm.useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
        }
        form.setFieldsValue({
            maxMember: Room.maxMember
        })
    }, [])

    const onFinish = values => {
        handleRoomForm(values.maxMember, 'maxMember')
        handleRoomForm(values.genderCondition, 'genderCondition')
        handleRoomForm(values.ageCondition, 'ageCondition')
        nextStep(1)
    };
    const { Option } = AntSelect;
    return (
        <div>
            <div className="container py-2 mt-3">
                <Stepper typeStep="room" step={2} />
            </div>
            <div className="create-room-form pt-3">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <AntForm form={form} onFinish={onFinish}>
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
                                <div className="buttom-page pt-3">
                                    <AntForm.Item>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6 d-flex align-items-center">
                                                    <OutlineButton
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => prevStep(1)}
                                                    >ย้อนกลับ</OutlineButton>
                                                </div>
                                                <div className="col-6 d-flex align-items-center">
                                                    <PrimaryButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="submit"
                                                    >ยืนยัน</PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
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


export default withRouter(CreateRoomStep2);