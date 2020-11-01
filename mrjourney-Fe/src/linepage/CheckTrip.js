import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col, Card,
    Button as AntButton,
    Form as AntForm
} from 'antd';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../store/HookProvider'
import DeleteTripModal from '../components/components/DeleteTripModal';
import { ReactComponent as DeleteButton } from '../static/icons/delete.svg';
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import ShowEventBox from '../components/CreateTrip/components/ShowEventBox';
import momentjs from 'moment';
import Stepper from '../components/components/Stepper';

const WrapperLoading = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
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

const SecondaryButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        color: ${props => (props.theme.color.primaryPress)};
        background: #F7F7F7;
    }
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;


function CheckTrip(props) {
    const { Trip, setActiveEvent, setNotActiveEvent } = useContext(HookContext)
    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')
    const [tripList, setTripList] = useState([{}])
    const [loading, isLoading] = useState(true)
    const [isVisible, setVisible] = useState(false)
    const [isEditTrip, setEditTrip] = useState(false)

    useEffect(() => {
        liff.init({ liffId: '1653975470-4Webv3MY' }).then(async () => {
            if (liff.isLoggedIn()) {
                if (!LineGroup || LineGroup === '') {
                    let profile = await liff.getProfile();
                    setLineID(profile.userId);
                    setLineName(profile.displayName);
                    setLinePicture(profile.pictureUrl);
                    const context = await liff.getContext();
                    setLineGroup(context.groupId)
                    isLoading(true)
                } else {
                    await axios.get(`https://mrjourney-senior.herokuapp.com/trip?lineGroupID=${LineGroup}`)
                        .then(res => {
                            setTripList(res.data)
                            isLoading(false)
                        });
                }
            } else {
                props.history.push('/Home');
            }
        })
    }, [LineGroup]);

    const onVisibleModal = () => {
        setVisible(true)
    }

    if (loading) {
        return (
            <WrapperLoading>
                <RowLoading justify="center">
                    <LoadingGif src="/gif/loading.gif" alt="loading..." />
                </RowLoading>
            </WrapperLoading>
        )
    } else {
        return (

            <Wrapper>
                {tripList.map((trip) => {
                    return (
                        <>
                            <div className="top-page mb-4 pb-4">
                                <Stepper typeStep="trip" step={4} />
                                {isEditTrip === true ?
                                    <Row justify="center ">
                                        <div className="container">
                                            <Col span={24} className="pb-3">
                                                <div className="p-2" style={{ fontSize: "16px" }}>
                                                    {trip.tripName}
                                                </div>
                                                {trip.totalDate.map((totalDate, key) => {
                                                    return (
                                                        <>
                                                            {Trip.activeEvent !== key ?
                                                                <DateCardNotActive onClick={() => setActiveEvent(key)}>
                                                                    <Row justify="center">
                                                                        {momentjs(totalDate.eventDate).format('ll')}
                                                                        <CaretDownOutlined />
                                                                    </Row>
                                                                </DateCardNotActive>
                                                                :
                                                                <div>
                                                                    <DateCardNotActive onClick={() => setNotActiveEvent(key)}>
                                                                        <Row justify="center">
                                                                            {momentjs(totalDate.eventDate).format('ll')}
                                                                            <CaretUpOutlined />
                                                                        </Row>
                                                                    </DateCardNotActive>
                                                                    {totalDate.events.map((events, key) => {
                                                                        return (
                                                                            <Row className="my-1">
                                                                                <Col span={24}>
                                                                                    <div className="container">
                                                                                        <EventCard>
                                                                                            <ShowEventBox eventDetail={events} />
                                                                                        </EventCard>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        </div>
                                        <AntForm className="container">
                                            <AntFormItem>
                                                <Col span={24}>
                                                    <SecondaryButton
                                                        type="link"
                                                        size={"large"}
                                                        block
                                                        onClick={() => onVisibleModal()}
                                                        style={{ color: "#FF4647" }}
                                                    >ลบทริป</SecondaryButton >
                                                </Col>
                                                <DeleteTripModal
                                                    isVisible={isVisible}
                                                    setVisible={setVisible}
                                                    lineGroupID={LineGroup}
                                                    lineID={LineID}
                                                    tripID={trip.tripID}
                                                />
                                            </AntFormItem>
                                        </AntForm>
                                    </Row>
                                    :
                                    <Row justify="center ">
                                        <div className="container">
                                            <Col span={24} className="pb-3">
                                                <div className="p-2" style={{ fontSize: "16px" }}>
                                                    {trip.tripName}
                                                </div>
                                                {trip.totalDate.map((totalDate, key) => {
                                                    return (
                                                        <>
                                                            {Trip.activeEvent !== key ?
                                                                <DateCardNotActive onClick={() => setActiveEvent(key)}>
                                                                    <Row justify="center">
                                                                        {momentjs(totalDate.eventDate).format('ll')}
                                                                        <CaretDownOutlined />
                                                                    </Row>
                                                                </DateCardNotActive>
                                                                :
                                                                <div>
                                                                    <DateCardNotActive onClick={() => setNotActiveEvent(key)}>
                                                                        <Row justify="center">
                                                                            {momentjs(totalDate.eventDate).format('ll')}
                                                                            <CaretUpOutlined />
                                                                        </Row>
                                                                    </DateCardNotActive>
                                                                    {totalDate.events.map((events, key) => {
                                                                        return (
                                                                            <Row className="my-1">
                                                                                <Col span={24}>
                                                                                    <div className="container">
                                                                                        <EventCard>
                                                                                            <ShowEventBox eventDetail={events} />
                                                                                        </EventCard>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        </div>
                                    </Row>
                                }
                            </div>
                            <Row justify="center" className="bg-white fixed-bottom">
                                <AntForm className="container">
                                    {trip.ownerID === LineID ?
                                        <AntFormItem>
                                            <Row>
                                                <Col span={8}>
                                                    <SecondaryButton
                                                        type="link"
                                                        size={"large"}
                                                        block
                                                    >ปิดทริป</SecondaryButton >
                                                </Col>
                                                <Col span={16}>
                                                    <PrimaryButton type="primary" size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => setEditTrip(true)}
                                                    >แก้ไขทริป</PrimaryButton>
                                                </Col>
                                            </Row>
                                        </AntFormItem>
                                        :
                                        null
                                    }
                                </AntForm>
                            </Row>
                        </>
                    )
                })
                }
            </Wrapper >
        )
    }
}
export default withRouter(CheckTrip);