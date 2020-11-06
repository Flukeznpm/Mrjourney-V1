import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import '../../static/css/App.css';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';
import { Link } from 'react-router-dom';
import liff from '@line/liff';
import axios from 'axios';
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Col, Row,
    InputNumber
} from 'antd';
import momentjs from 'moment';

const WrapperLoading = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

const RowLoading = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`

const LoadingGif = styled.img`
    height: 250px;
    width: 250px;
   
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    height: 50px;
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
    const [loading, isLoading] = useState(true)
    const [tripList, setTripList] = useState([{}])

    const { Option } = AntSelect;
    const dateFormat = 'DD/MM/YYYY';
    const [form] = AntForm.useForm();

    useEffect(() => {
        liff.init({ liffId: '1653975470-jV83lv9w' }).then(async () => {
            if (liff.isLoggedIn()) {
                if (!LineGroup || LineGroup === '') {
                    let profile = await liff.getProfile();
                    setLineID(profile.userId);
                    setLineName(profile.displayName);
                    setLinePicture(profile.pictureUrl);
                    const context = await liff.getContext();
                    setLineGroup(context.groupId)
                } else {
                    await axios.get(`https://mrjourney-senior.herokuapp.com/trip?lineGroupID=${LineGroup}`)
                        .then(res => {
                            setTripList(res.data)
                            // isLoading(false)
                        });
                    // isLoading(false)
                }

            } else {
                props.history.push('/Home');
            }
        });
        form.setFieldsValue({
            numberAddDate: Trip.numberAddDate
        })
    }, [LineGroup])

    const onFinish = values => {
        handleTripForm(values.tripName, 'tripName')
        handleTripForm(values.province, 'province')
        handleTripForm(values.date, 'date')
        handleTripForm(values.numberAddDate, 'numberAddDate')
        confirmTripStep(1)
    };

    // if (loading) {
    //     return (
    //         <WrapperLoading>
    //             <RowLoading justify="center">
    //                 <LoadingGif src="/gif/loading.gif" alt="loading..." />
    //             </RowLoading>
    //         </WrapperLoading>
    //     )
    // } else {
        return (
            <div>
                {tripList.map((trip) => {
                    return (
                        <>
                            {trip.tripName ?
                                <WrapperLoading>
                                    <RowLoading justify="center">
                                        <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                            ขณะนี้ยังมีทริปเก่าที่ยังถูกสร้างอยู่
                                          </h2>
                                        <AntForm className="container">
                                            <AntFormItem>
                                                <Col span={24}>
                                                    <Link to={`/CheckTrip`}>
                                                        <PrimaryButton type="primary" size={"large"}
                                                            block htmlType="button"
                                                        >ดูแผนการท่องเที่ยว</PrimaryButton>
                                                    </Link>
                                                </Col>
                                            </AntFormItem>
                                        </AntForm>
                                    </RowLoading>
                                </WrapperLoading>
                                :
                                <>
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
                                                                            format={dateFormat} placeholder="เลือกวันที่เริ่มเดินทาง"
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
                                </>
                            }
                        </>
                    )
                })}
            </div>
        )
    }
// }
export default withRouter(CreateTripStep1);


