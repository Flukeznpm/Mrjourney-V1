import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import CreateTripModal from '../Modal/CreateTripModal'
import momentjs from 'moment'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';
import liff from '@line/liff';
import {
    Card,
    Form as AntForm,
    Row,
    Col,
    Tooltip,
    Button as AntButton,
} from 'antd';
import { CaretUpOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import { ReactComponent as DeleteButton } from '../../static/icons/delete.svg';
import ShowStartToEnd from './components/ShowStartToEnd';
import ShowEventBox from './components/ShowEventBox';

const DateCardNotActive = styled(Card)`
  border-radius: 8px;
  background: ${props => (props.theme.color.primary)};
  color: white;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 5px 0px 5px 0px;
  font-size: 24px;
  height: 100%;
  cursor: pointer;
  .anticon {
      display: flex;
      align-items: center;
      padding: 0px 10px;
  }
`;

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

const EventCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.025), 0px 3px 4px rgba(0, 0, 0, 0.06);
  height: 100%;
  .ant-card-body {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 12px;
  }
`;

const DeleteEventCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  background: #FF4647;
  text-align: center;
  font-size: 18px;
  color: white;
  cursor: pointer;
  .ant-card-body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 12px;
  }
  height: 100%;
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    height: 50px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const PrevButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        color: ${props => (props.theme.color.primaryPress)};
        background: #F7F7F7;
    }
`;

const AddEventButton = styled(AntButton)`
    box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    color: #F7F7F7;
    border: none;
    background: ${props => (props.theme.color.primary)};
    .anticon {
      display: flex;
      font-size: 22px;
      justify-content: center;
      align-items: center;
  }
    &:hover , &:active , &:focus {
        color: #F7F7F7;
        border: none;
        background: ${props => (props.theme.color.primaryPress)};
    }
`;

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

function CreateTripStep2(props) {
    const { nextTripStep, prevTripStep, deleteEvent, Trip, addModalShow, keyModal, setActiveEvent, setNotActiveEvent, eventModalClose, setEvent, eventModalShow } = useContext(HookContext)
    const [lineGroupID, setLineGroupID] = useState('')
    const [tripStatus, setTripStatus] = useState(true)
    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [loading, isLoading] = useState(false)

    useEffect(() => {
        liff.init({ liffId: '1653975470-jV83lv9w' }).then(async () => {
            if (liff.isLoggedIn()) {
                let profile = await liff.getProfile();
                setLineID(profile.userId);
                setLineName(profile.displayName);
                setLinePicture(profile.pictureUrl);
                const context = await liff.getContext();
                setLineGroupID(context.groupId)
            } else {
                props.history.push('/Home');
            }
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataTrip = {
            lineID: LineID,
            displayName: LineName,
            pictureURL: LinePicture,
            lineGroupID: lineGroupID,
            tripName: Trip.tripName,
            province: Trip.province,
            startDate: momentjs(Trip.date).format('ll'),
            endDate: momentjs(Trip.date).add(Trip.numberAddDate - 1, 'day').format('ll'),
            tripStatus: tripStatus,
            totalDate: Trip.totalDate,
            createDate: new Date()
        }
        isLoading(true)
        await axios.post('https://mrjourney-senior.herokuapp.com/trip/createTrip', dataTrip)
            .then(res => {
                console.log(res)
            });
        nextTripStep(1)
        if (liff.getContext().type !== "none") {
            liff.sendMessages([
                {
                    "type": "text",
                    "text": "สร้างทริปสำเร็จ!"
                },
                {
                    "type": "text",
                    "text": "#ดูแผน"
                }
            ])
        }
    }
    if (loading) {
        return (
            <WrapperLoading>
                <RowLoading justify="center">
                    <LoadingGif src="/gif/loading-v2.gif" alt="loading..." />
                </RowLoading>
            </WrapperLoading>
        )
    } else {
        return (
            <Wrapper>
                <div className="top-page mb-4 pb-4">
                    <Stepper typeStep="trip" step={2} />
                    <Row justify="center ">
                        <div className="container">
                            <Col span={24} className="pb-3">
                                <div className="pt-4 pb-2" >
                                    <ShowStartToEnd />
                                </div>
                                {Trip.totalDate.map((PerDay, key) => {
                                    return (
                                        <>
                                            {Trip.activeEvent !== key ?
                                                <DateCardNotActive onClick={() => setActiveEvent(key)}>
                                                    <Row justify="center">
                                                        {momentjs(PerDay.eventDate).format('ll')}
                                                        <CaretDownOutlined />
                                                    </Row>
                                                </DateCardNotActive>
                                                :
                                                <div>
                                                    <DateCardNotActive onClick={() => setNotActiveEvent(key)}>
                                                        <Row justify="center">
                                                            {momentjs(PerDay.eventDate).format('ll')}
                                                            <CaretUpOutlined />
                                                        </Row>
                                                    </DateCardNotActive>
                                                    {PerDay.event.map((eventDetail, keyE) => {
                                                        return (
                                                            <Row className="my-1">
                                                                <Col span={19}>
                                                                    <div className="container">
                                                                        <EventCard>
                                                                            <ShowEventBox eventDetail={eventDetail} />
                                                                        </EventCard>
                                                                    </div>
                                                                </Col>
                                                                <Col span={5} >
                                                                    <DeleteEventCard onClick={() => deleteEvent(key, keyE)}>
                                                                        <DeleteButton />
                                                                    </DeleteEventCard>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                    <AddEventButton type="primary"
                                                        shape="circle"
                                                        size="middle"
                                                        onClick={() => eventModalShow(key)}
                                                        icon={<PlusOutlined />}
                                                    />
                                                    <CreateTripModal
                                                        centered
                                                        show={addModalShow}
                                                        onConfirm={() => setEvent(keyModal)}
                                                        onHide={() => eventModalClose(keyModal)}
                                                    ></CreateTripModal>
                                                </div>
                                            }
                                        </>
                                    )
                                })}

                            </Col>
                        </div>
                    </Row>
                </div>
                <Row justify="center" className="bg-white fixed-bottom">
                    <AntForm className="container">
                        <AntFormItem>
                            <Row>
                                <Col span={8}>
                                    <PrevButton
                                        type="link"
                                        size={"large"}
                                        block htmlType="button"
                                        onClick={() => prevTripStep(1)}
                                    >ย้อนกลับ</PrevButton>
                                </Col>
                                <Col span={16}>
                                    <PrimaryButton
                                        type="primary"
                                        size={"large"}
                                        block htmlType="submit"
                                        onClick={handleSubmit}
                                    >ยืนยัน</PrimaryButton>
                                </Col>
                            </Row>
                        </AntFormItem>
                    </AntForm>
                </Row>
            </Wrapper>
        )
    }
}

export default withRouter(CreateTripStep2);

