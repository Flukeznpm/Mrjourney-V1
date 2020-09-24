import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import '../../static/css/App.css';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    InputNumber
} from 'antd';
import momentjs from 'moment';

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

const DatePickerComponent = styled(DatePicker)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active {
        border-color: rgb(230, 111, 15);
    }
`

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
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

function CreateTripStep1(props) {
    const { thaiprovince, handleTripForm, plusDate, minusDate, Trip, confirmTripStep, toDate } = useContext(HookContext)

    const [Linename, setLineName] = useState('')
    const [Linepicture, setLinePicture] = useState('')

    const { Option } = AntSelect;
    const dateFormat = 'DD/MM/YYYY';

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineName(user.displayName)
            setLinePicture(user.pictureURL)
        }
    }, [])

    const onFinish = values => {
        handleTripForm(values.tripName, 'tripName')
        handleTripForm(values.province, 'province')
        handleTripForm(values.date, 'date')
        handleTripForm(values.numberAddDate, 'numberAddDate')
        confirmTripStep(1)
    };

    return (
        <div>

            <div className="container py-2 mt-3">
                <Stepper typeStep="trip" step={1} />
            </div>
            <div className="content-page py-2">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <AntForm onFinish={onFinish}>
                                <AntForm.Item name="tripName" label="ชื่อทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
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
                                            <AntForm.Item name="date" label="วันเริ่มทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                                <DatePickerComponent style={{ width: "100%" }}
                                                    disabledDate={d => !d || d.isSameOrBefore(momentjs(new Date()).add(-1, 'day'))}
                                                    format={dateFormat}
                                                />
                                            </AntForm.Item>
                                        </div>
                                        <div className="col-6">
                                            <AntForm.Item name="numberAddDate" label="จำนวนวันเดินทาง" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                                <InputNumberComponent min={1} style={{ width: "100%" }} placeholder="จำนวนวันเดินทาง" />
                                            </AntForm.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="container col-md-6 fixed-bottom">
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
export default withRouter(CreateTripStep1);


