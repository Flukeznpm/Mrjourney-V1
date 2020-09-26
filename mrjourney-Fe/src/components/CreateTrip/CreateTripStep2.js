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
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

function CreateTripStep2(props) {
    const { nextTripStep, prevTripStep, deleteEvent, Trip, addModalShow, keyModal, setActiveEvent, setNotActiveEvent, eventModalClose, setEvent, eventModalShow } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [lineGroupID, setLineGroupID] = useState("Line_Group_001")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [tripStatus, setTripStatus] = useState(true)

    // useEffect(() => {
    //     let loadJWT = cookie.load('jwt');
    //     if (loadJWT === undefined) {
    //         // props.history.push('/Home');
    //     } else {
    //         var user = jwt.verify(loadJWT, 'secreatKey');
    //         setLineID(user.lineID)
    //         setDisplayName(user.displayName)
    //         setPictureURL(user.pictureURL)
    //     }
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataTrip = {
            // lineID: lineID,
            // displayName: displayName,
            // pictureURL: pictureURL,
            lineGroupID: lineGroupID,
            tripName: Trip.tripName,
            province: Trip.province,
            startDate: momentjs(Trip.date).format('ll'),
            endDate: momentjs(Trip.date).add(Trip.numberAddDate - 1, 'day').format('ll'),
            tripStatus: tripStatus,
            totalDate: Trip.totalDate
        }
        await axios.post('https://mrjourney-senior.herokuapp.com/trip/createTrip', dataTrip)
            .then(res => {
                console.log(res)
            });
        nextTripStep(1)
    }

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
                                                {PerDay.event.map((eventDetail, key) => {
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
                                                                <DeleteEventCard onClick={() => deleteEvent(eventDetail, key)}>
                                                                    <DeleteButton />
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

export default withRouter(CreateTripStep2);

