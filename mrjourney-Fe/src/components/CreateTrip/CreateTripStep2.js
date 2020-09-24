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
import {
    Card,
    Form as AntForm,
    Row,
    Col,
    Tooltip,
    Button as AntButton,
} from 'antd';
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ShowStartToEnd from './components/ShowStartToEnd';
import ShowEventBox from './components/ShowEventBox';

const DateCardNotActive = styled(Card)`
  border-radius: 8px;
  background: ${props => (props.theme.color.primary)};
  color: white;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
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

const EventCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  height: 100%;
  .ant-card-body {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 12px;
  }
`;

const EventCardNoBg = styled(Card)`
  border-radius: 10px;
  height: 100%;
  border: none;
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
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const PrevButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        color: ${props => (props.theme.color.primaryPress)};
        background: #F7F7F7;
    }
`;

const AddEventButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    border: none;
    margin: 10px 0px;
    .anticon {
      display: flex;
      justify-content: center;
      align-items: center;
  }
    &:hover , &:active , &:focus {
        color: ${props => (props.theme.color.primary)};
        border: none;
        background: #F5F5F5;
    }
`;

const Wrapper = styled.div`
display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`



function CreateTripStep2(props) {
    const { nextTripStep, prevTripStep, deleteEvent, Trip, addModalShow, keyModal, setActiveEvent, setNotActiveEvent, eventModalClose, setEvent, eventModalShow } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [lineGroupID, setLineGroupID] = useState("Line_Group_002")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [tripStatus, setTripStatus] = useState(true)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataTrip = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            lineGroupID: lineGroupID,
            tripName: Trip.tripName,
            province: Trip.province,
            startDate: momentjs(Trip.date).format('ll'),
            endDate: momentjs(Trip.date).add(Trip.numberAddDate - 1, 'day').format('ll'),
            tripStatus: tripStatus,
            events: Trip.totalDate
        }
        await axios.post('http://localhost:5000/trip/createTrip', dataTrip)
            .then(res => {
                console.log(res)
            });
        nextTripStep(1)
    }

    return (
        <Wrapper>
            <div className="top-page">
                <div className="container py-2 mt-3">
                    <Stepper typeStep="trip" step={2} />
                </div>
                <Row justify="center">
                    <div className="container">
                        <Col span={24} className="py-3">
                            <ShowStartToEnd />
                            {Trip.totalDate.map((PerDay, key) => {
                                return (
                                    <>
                                        {Trip.activeEvent !== key ?
                                            <DateCardNotActive onClick={() => setActiveEvent(key)}>
                                                <Row justify="center">
                                                    {PerDay.eventDate}
                                                    <CaretDownOutlined />
                                                </Row>
                                            </DateCardNotActive>
                                            :
                                            <div>
                                                <DateCardNotActive onClick={() => setNotActiveEvent(key)}>
                                                    <Row justify="center">
                                                        {PerDay.eventDate}
                                                        <CaretUpOutlined />
                                                    </Row>
                                                </DateCardNotActive>
                                                {PerDay.event.map((eventDetail, eventKey) => {
                                                    return (
                                                        <Row>
                                                            <Col span={19}>
                                                                <div className="container">
                                                                    {eventKey / 2 !== 0 ?
                                                                        <EventCard>
                                                                            <ShowEventBox eventDetail={eventDetail} />
                                                                        </EventCard>
                                                                        :
                                                                        <EventCardNoBg>
                                                                            <ShowEventBox eventDetail={eventDetail} />
                                                                        </EventCardNoBg>
                                                                    }
                                                                </div>
                                                            </Col>
                                                            <Col span={5} >
                                                                <DeleteEventCard>
                                                                    <DeleteOutlined onClick={() => deleteEvent(eventDetail, key)} />
                                                                </DeleteEventCard>
                                                            </Col>
                                                        </Row>

                                                    )
                                                })}
                                                <AddEventButton block
                                                    size={"large"} htmlType="submit"
                                                    onClick={() => eventModalShow(key)}
                                                >
                                                    <PlusOutlined />
                                                </AddEventButton>
                                                <CreateTripModal
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
            <div className="container">
                <AntForm>
                    <AntForm.Item>
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
                    </AntForm.Item>
                </AntForm>
            </div>
        </Wrapper>
    )
}

export default withRouter(CreateTripStep2);

