import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Row, Col, Card,
    Button as AntButton,
    Form as AntForm,
    Switch
} from 'antd';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../store/HookProvider'
import DeleteTripModal from '../components/components/DeleteTripModal';
import { ReactComponent as DeleteButton } from '../static/icons/delete.svg';
import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import ShowEventBox from '../components/CreateTrip/components/ShowEventBox';
import momentjs from 'moment';
import Stepper from '../components/components/Stepper';
import EnableTripModal from '../components/components/Modal/EnableTripModal';
import Swal from 'sweetalert2';

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

const SwitchComponent = styled(Switch)`
  background-color: #E9DDD1;
  &.ant-switch-checked {
    background-color: ${props => (props.theme.color.primary)};
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
    const [isVisibleEnableTrip, setVisibleEnableTrip] = useState(false)
    const [isEnableTrip, setEnableTrip] = useState(true)

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
                            if (res.status === 202) {
                                isLoading(false)
                            } else {
                                setTripList(res.data)
                                isLoading(false)
                            }
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

    const onChangeEdit = () => {
        setEditTrip(!isEditTrip)
    }

    const backToChat = () => {
        liff.closeWindow()
    }
    const checkEnableTrip = (date) => {
        let currentDate = new Date()
        let endDateStr = momentjs(date).format('ll')
        var endDate = new Date(Date.parse(endDateStr.replace(/-/g, " ")))
        let checkEndDate = endDate <= currentDate;
        if (checkEndDate === true) {
            setVisibleEnableTrip(true)
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'ขออภัย!',
                text: 'ทริปนี้ยังไม่ถึงวันจบทริป ไม่สามารถปิดทริปได้',
                showCancelButton: false,
                confirmButtonColor: '#D33',
                confirmButtonText: 'ยอมรับ'
            })
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
                {tripList.map((trip) => {
                    return (
                        <>
                            {trip.tripName ?
                                <>
                                    <div className="top-page mb-4 pb-4">
                                        <Stepper typeStep="trip" step={4} />
                                        <Row className="py-3">
                                            <Col span={6} offset={18}>
                                                < SwitchComponent onChange={onChangeEdit} />
                                            </Col>
                                        </Row>
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
                                                                                        <Col span={19}>
                                                                                            <div className="container">
                                                                                                <EventCard>
                                                                                                    <ShowEventBox eventDetail={events} />
                                                                                                </EventCard>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col span={5} >
                                                                                            <DeleteEventCard>
                                                                                                <DeleteButton />
                                                                                            </DeleteEventCard>
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
                                    {trip.ownerTrip === LineID ?
                                        <Row justify="center" className="bg-white fixed-bottom">
                                            <AntForm className="container">
                                                <AntFormItem>
                                                    <Row>
                                                        <Col span={8}>
                                                            <SecondaryButton
                                                                type="link"
                                                                size={"large"}
                                                                block
                                                                onClick={() => checkEnableTrip(trip.endDate)}
                                                            >ปิดทริป</SecondaryButton >
                                                        </Col>
                                                        <Col span={16}>
                                                            <PrimaryButton type="primary" size={"large"}
                                                                block htmlType="button"
                                                                onClick={() => backToChat()}
                                                            >กลับสู่ห้องแชท</PrimaryButton>
                                                        </Col>
                                                    </Row>
                                                    <EnableTripModal
                                                        isVisible={isVisibleEnableTrip}
                                                        setVisible={setVisibleEnableTrip}
                                                        lineGroupID={LineGroup}
                                                        lineID={LineID}
                                                    />
                                                </AntFormItem>
                                            </AntForm>
                                        </Row>
                                        :
                                        <Row justify="center" className="bg-white fixed-bottom">
                                            <AntForm className="container">
                                                <AntFormItem>
                                                    <Row>
                                                        <Col span={24}>
                                                            <PrimaryButton type="primary" size={"large"}
                                                                block htmlType="button"
                                                                onClick={() => backToChat()}
                                                            >กลับสู่ห้องแชท</PrimaryButton>
                                                        </Col>
                                                    </Row>
                                                </AntFormItem>
                                            </AntForm>
                                        </Row>
                                    }
                                </>
                                :
                                <WrapperLoading>
                                    <RowLoading justify="center">
                                        <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                            ขณะนี้ยังไม่มีทริปที่ถูกสร้าง
                                      </h2>
                                        <AntForm className="container">
                                            <AntFormItem>
                                                <Col span={24}>
                                                    <Link to={`/CheckTrip`}>
                                                        <PrimaryButton type="primary" size={"large"}
                                                            block htmlType="button"
                                                        >สร้างแผนการท่องเที่ยว</PrimaryButton>
                                                    </Link>
                                                </Col>
                                            </AntFormItem>
                                        </AntForm>
                                    </RowLoading>
                                </WrapperLoading>
                            }
                        </>
                    )
                })
                }
            </Wrapper >
        )
    }
}
export default withRouter(CheckTrip);