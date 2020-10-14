import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { Modal } from 'react-bootstrap';
import { HookContext } from '../../store/HookProvider'
import {
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    TimePicker,
} from 'antd';
import { ReactComponent as EatingIcon } from '../../static/icons/eating.svg';
import { ReactComponent as TravellingIcon } from '../../static/icons/travelling.svg';
import { ReactComponent as SleepingIcon } from '../../static/icons/sleeping.svg';

const ModalHeader = styled(Modal.Header)`
    border-bottom: none;
    padding-bottom: 0px;
`;

const ModalFooter = styled(Modal.Footer)`
    border-top: none;
    display: block;
`;
const AntFormItemFooter = styled(AntForm.Item)`
    margin-bottom: 0px;
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

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

const TimePickerComponent = styled(TimePicker)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active, &:focus {
        border-color: rgb(230, 111, 15);
    }
`

const TypeButtonSelected = styled(AntButton)`
    font-size: 18px;
    border: 1px solid #F37945;
    background: #F37945;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover , &:active, &:focus {
        border: 1px solid #F37945;
        background: #F37945;
    }
`;

const TypeButton = styled(AntButton)`
    font-size: 18px;
    border: 1px solid #F37945;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover , &:active, &:focus {
        border: 1px solid #F37945;
        background: #F37945;
    }
`;

const ColButtonComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;


function CreateTripModal(props) {
    const { handleEventForm, Event, setEvent, keyModal, selectEventType } = useContext(HookContext)
    const format = 'HH:mm'
    const [timeStartEvent, setTimeStartEvent] = useState("");

    const onFinish = values => {
        handleEventForm(values.eventName, 'eventName')
        handleEventForm(Event.startEvent, 'startEvent')
        handleEventForm(Event.endEvent, 'endEvent')
        // handleEventForm(values.startEvent, 'endEvent')
        // handleEventForm(values.endEvent, 'endEvent')
        setEvent(keyModal)
    };

    const onStartEvent = async (e) => {
        console.log('time', e)
        await setTimeStartEvent(e)
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <ModalHeader closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    รายละเอียดกิจกรรม
                    </Modal.Title>
            </ModalHeader>
            <AntForm onFinish={onFinish}>
                <Modal.Body>
                    <div className="container">
                        <AntForm.Item name="eventName" label="ชื่อกิจกรรม" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                            <InputComponent placeholder="ใส่ชื่อสถานที่หรือกิจกรรมของคุณ" />
                        </AntForm.Item>
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-6">
                                    <AntForm.Item name="startEvent" label="เวลาเริ่ม" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                        {/* <TimePickerComponent style={{ width: "100%" }}
                                            format={format} placeholder="เวลาเริ่มกิจกรรม"
                                        /> */}
                                        <input type='time' class="form-control"
                                            name="startEvent"
                                            value={Event.startEvent}
                                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                                        />
                                    </AntForm.Item>
                                </div>
                                <div className="col-6">
                                    <AntForm.Item name="endEvent" label="เวลาจบ" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                        {/* <TimePickerComponent style={{ width: "100%" }}
                                            format={format} placeholder="เวลาจบกิจกรรม"
                                        /> */}
                                        <input type='time' class="form-control"
                                            name="endEvent"
                                            value={Event.endEvent}
                                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                                        />
                                    </AntForm.Item>
                                </div>
                            </div>
                        </div>
                        <label for="exampleInputEmail1" className="pt-2">ประเภท</label>
                        <div className="container">
                            <div className="row text-center">
                                <ColButtonComponent className="col-4 ">
                                    {Event.eventType === 'eating' ?
                                        <TypeButtonSelected
                                            shape="circle"
                                            size={"large"}
                                        // icon={<img src="/img/icons/eating.svg" />}
                                        >
                                            <EatingIcon style={{ margin: "5px", fill: "#F37945" }} />
                                        </TypeButtonSelected>
                                        :
                                        <TypeButton
                                            shape="circle"
                                            size={"large"}
                                            // icon={<img src="/img/icons/eating.svg" />}
                                            onClick={() => selectEventType('eating')}
                                        >
                                            <EatingIcon style={{ margin: "5px" }} />
                                        </TypeButton>
                                    }
                                </ColButtonComponent>
                                <ColButtonComponent className="col-4 ">
                                    {Event.eventType === 'travel' ?
                                        <TypeButtonSelected
                                            shape="circle"
                                            size={"large"}
                                        // icon={<img src="/img/icons/travelling.svg" />}
                                        >
                                            <TravellingIcon style={{ margin: "5px" }} />
                                        </TypeButtonSelected>
                                        :
                                        <TypeButton
                                            shape="circle"
                                            size={"large"}
                                            // icon={<img src="/img/icons/travelling.svg" />}
                                            onClick={() => selectEventType('travel')}
                                        >
                                            <TravellingIcon style={{ margin: "5px" }} />
                                        </TypeButton>
                                    }
                                </ColButtonComponent>
                                <ColButtonComponent className="col-4 ">
                                    {Event.eventType === 'sleeping' ?
                                        <TypeButtonSelected
                                            shape="circle"
                                            size={"large"}
                                        // icon={<img src="/img/icons/sleeping.svg" />}
                                        >
                                            <SleepingIcon style={{ margin: "5px" }} />
                                        </TypeButtonSelected>
                                        :
                                        <TypeButton
                                            shape="circle"
                                            size={"large"}
                                            // icon={<img src="/img/icons/sleeping.svg" />}
                                            onClick={() => selectEventType('sleeping')}
                                        >
                                            <SleepingIcon style={{ margin: "5px" }} />
                                        </TypeButton>
                                    }
                                </ColButtonComponent>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <AntFormItemFooter>
                        <PrimaryButton type="primary" size={"large"} block htmlType="submit">ยืนยัน</PrimaryButton>
                    </AntFormItemFooter>
                </ModalFooter>
            </AntForm>
        </Modal>
    )
}
export default CreateTripModal;