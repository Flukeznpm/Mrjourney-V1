import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import { HookContext } from '../../store/HookProvider'
import axios from 'axios';
import {
    Row, Col, Card,
    Button as AntButton,
    Form as AntForm,
    Switch,
    Input as AntInput
} from 'antd';
import { withRouter } from 'react-router-dom';
import { CaretUpOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import momentjs from 'moment'
import { ReactComponent as DeleteButton } from '../../static/icons/delete.svg';
import DeleteTripModal from '../../components/components/DeleteTripModal';
import ShowEventBox from '../../components/CreateTrip/components/ShowEventBox';
import CreateTripModal from '../../components/Modal/CreateTripModal';
import EditTripModal from '../../components/components/Modal/EditTripModal';


const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:hover , &:active, &:focus {
        border-color: ${props => (props.theme.color.primary)};
    }
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

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
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

const AddEventButton = styled(AntButton)`
     box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    color: #F7F7F7;
    border: none;
    background: ${props => (props.theme.color.primary)};
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

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

function EditTrip(props) {
    const { Trip, setActiveEvent, setNotActiveEvent, keyModal, Event, setEvent, eventModalShow } = useContext(HookContext)
    const [isVisible, setVisible] = useState(false)
    const [tripEvent, setTripEvent] = useState(props.trip)
    const [form] = AntForm.useForm();
    const [isVisibleEditModal, setVisibleEditModal] = useState(false)
    const [keyEdit, setKeyEdit] = useState(1);

    useEffect(() => {
        form.setFieldsValue({
            tripName: props.trip.tripName
        })
    }, [])

    const onDeleteEvent = (key, keyE) => {
        let trip = tripEvent;
        trip.totalDate[key].events.splice(keyE, 1)
        setTripEvent({ ...trip })
    };

    const onVisibleModal = () => {
        setVisible(true)
    }

    const onVisibleEditModal = (key) => {
        setVisibleEditModal(true)
        eventModalShow(key)
    }

    const onFinish = async values => {
        let dataEdit = {
            tripID: props.trip.tripID,
            ownerTrip: props.trip.ownerTrip,
            lineID: props.LineID,
            lineGroupID: props.LineGroup,
            tripName: values.tripName,
            province: props.trip.province,
            startDate: props.trip.startDate,
            endDate: props.trip.endDate,
            totalDate: props.trip.totalDate,
            displayName: props.LineName,
            pictureURL: props.LinePicture
        }
        console.log('total', dataEdit.totalDate);
        await axios.put('https://mrjourney-senior.herokuapp.com/trip/editTrip', dataEdit)
            // await axios.put('http://localhost:5000/trip/editTrip', dataEdit)
            .then(res => {
                console.log('edit: ', res)
                props.setEditTrip(false)
            })
    };

    return (
        <Wrapper>
            <Row justify="center ">
                <div className="container">
                    <AntForm form={form} onFinish={onFinish}>
                        <Col span={24}>
                            <AntForm.Item name="tripName" label="ชื่อทริป" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <InputComponent placeholder="ใส่ชื่อทริปของคุณ" />
                            </AntForm.Item>
                        </Col>
                        <Col span={24} className="pb-3">
                            {props.trip.totalDate.map((totalDate, key) => {
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
                                                {totalDate.events.map((events, keyE) => {
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
                                                                    <DeleteButton onClick={() => onDeleteEvent(key, keyE)} />
                                                                </DeleteEventCard>
                                                            </Col>
                                                        </Row>
                                                    )
                                                })}
                                                <AddEventButton type="primary"
                                                    shape="circle"
                                                    size="middle"
                                                    onClick={() => onVisibleEditModal(key)}
                                                    icon={<PlusOutlined />}
                                                />
                                                <EditTripModal
                                                    centered
                                                    show={isVisibleEditModal}
                                                    setVisibleEditModal={setVisibleEditModal}
                                                    onHide={() => setVisibleEditModal(false)}
                                                    trip={props.trip}
                                                    setTripEvent={setTripEvent}
                                                    tripEvent={tripEvent}
                                             
                                                />
                                            </div>
                                        }
                                    </>
                                )
                            })}
                        </Col>
                        <Row>
                            <Col span={8}>
                                <AntForm.Item>
                                    <SecondaryButton
                                        type="link"
                                        size={"large"}
                                        block
                                        onClick={() => onVisibleModal()}
                                        style={{ color: "#FF4647" }}
                                    >ลบทริป</SecondaryButton >
                                    <DeleteTripModal
                                        isVisible={isVisible}
                                        setVisible={setVisible}
                                        lineGroupID={props.LineGroup}
                                        lineID={props.LineID}
                                        tripID={props.trip.tripID}
                                    />
                                </AntForm.Item>
                            </Col>
                            <Col span={16}>
                                <AntForm.Item>
                                    <OutlineButton
                                        type="link"
                                        size={"large"}
                                        block htmlType="submit"
                                    >ยืนยันแก้ไข</OutlineButton>
                                </AntForm.Item>
                            </Col>
                        </Row>
                    </AntForm>
                </div>
            </Row >
        </Wrapper>
    )
}
export default withRouter(EditTrip);