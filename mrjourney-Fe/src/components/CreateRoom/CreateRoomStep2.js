import React, { useContext, useState, useEffect } from 'react';
import '../../static/css/Stepper.css';
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

function CreateRoomStep2(props) {
    const { nextStep, prevStep, handleRoomForm, Room, plusMember, minusMember } = useContext(HookContext)
    const [gender, selectGender] = useState(["ชาย", "หญิง", "ไม่จำกัดเพศ"])
    const [age, selectAge] = useState(["18 ปีขึ้นไป", "20 ปีขึ้นไป", "ไม่จำกัดช่วงอายุ"])
    const [lineID, setLineID] = useState("")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
        }
    }, [])

    const onFinish = values => {
        handleRoomForm(values.maxMember, 'maxMember')
        handleRoomForm(values.genderCondition, 'genderCondition')
        handleRoomForm(values.ageCondition, 'ageCondition')
        nextStep(1)
    };

    const { Step } = Steps;
    const { Option } = AntSelect;
    return (
        <div>
            <div className="container py-2 mt-5">
                <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps>
            </div>
            <div className="create-room-form pt-3">
                <div className="col-12">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <AntForm onFinish={onFinish}>
                                <AntForm.Item name="maxMember" label="จำนวนที่เปิดรับ" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <InputNumber min={1} defaultValue={1} style={{ width: "100%" }} />
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
                                                    <AntButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => prevStep(1)}
                                                    >ย้อนกลับ</AntButton>
                                                </div>
                                                <div className="col-6 d-flex align-items-center">
                                                    <AntButton
                                                        type="primary"
                                                        size={"large"}
                                                        block htmlType="submit"
                                                    >ยืนยัน</AntButton>
                                                </div>
                                            </div>
                                        </div>
                                    </AntForm.Item>
                                </div>
                            </AntForm>
                            {/* <div className="pt-4">
                                            <label htmlFor="example-date-input">จำนวนคนที่เปิดรับ<span className="p-1" style={{ color: "red" }}>*</span></label>
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
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withRouter(CreateRoomStep2);