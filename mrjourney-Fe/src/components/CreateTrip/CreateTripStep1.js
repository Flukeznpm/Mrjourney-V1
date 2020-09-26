import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import '../../static/css/App.css';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';
import liff from '@line/liff';
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
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const DatePickerComponent = styled(DatePicker)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active, &:focus {
        border-color: rgb(230, 111, 15);
    }
`

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:hover , &:active, &:focus {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

const InputNumberComponent = styled(InputNumber)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-content: center;
    &:hover , &:active, &:focus {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`

function CreateTripStep1(props) {
    const { thaiprovince, handleTripForm, Trip, confirmTripStep, toDate } = useContext(HookContext)

    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')

    const { Option } = AntSelect;
    const dateFormat = 'DD/MM/YYYY';
    const [form] = AntForm.useForm();

    useEffect(() => {
        liff.init({ liffId: '1653975470-jV83lv9w' }).then(async () => {
            if (liff.isLoggedIn()) {
                let profile = await liff.getProfile();
                setLineID(profile.userId);
                setLineName(profile.displayName);
                setLinePicture(profile.pictureUrl);
                const context = await liff.getContext();
                setLineGroup(context.groupId)
            } else {
                props.history.push('/Home');
            }
        });
        form.setFieldsValue({
            numberAddDate: Trip.numberAddDate
        })
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
            <div className="pb-2">
                <Stepper typeStep="trip" step={1} />
            </div>
            <div className="content-page py-2">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <AntForm form={form} onFinish={onFinish}>
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
                                    <AntFormItem>
                                        <PrimaryButton type="primary" size={"large"} block htmlType="ถัดไป">ถัดไป</PrimaryButton>
                                    </AntFormItem>
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


