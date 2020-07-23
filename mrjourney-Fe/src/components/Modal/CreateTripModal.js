import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import { HookContext } from '../../store/HookProvider'
import { useForm } from "react-hook-form";
import RequiredForm from "../Required/RequiredForm"

function CreateTripModal(props) {
    const { handleEventForm, Event, setEvent, keyModal, selectEventType } = useContext(HookContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const [ValidEventName, setValidEventName] = useState(false)
    const [ValidStartEvent, setValidStartEvent] = useState(false)
    const [ValidEndEvent, setValidEndEvent] = useState(false)
    const [ValidEventType, setValidEventType] = useState(false)

    const onSubmit = () => {
        if (Event.eventName && Event.startEvent && Event.endEvent && Event.eventType) {
            setEvent(keyModal)
        } else {
            if (!Event.eventName) {
                setValidEventName(true)
            }
            if (Event.eventName) {
                setValidEventName(false)
            }
            if (!Event.startEvent) {
                setValidStartEvent(true)
            }
            if (Event.startEvent) {
                setValidStartEvent(false)
            }
            if (!Event.endEvent) {
                setValidEndEvent(true)
            }
            if (Event.endEvent) {
                setValidEndEvent(false)
            }
            if (!Event.eventType) {
                setValidEventType(true)
            }
            if (Event.eventType) {
                setValidEventType(false)
            }
            return false
        }
    };

    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        รายละเอียดกิจกรรม
                    </Modal.Title>
                </Modal.Header>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Modal.Body>
                    <div className="container">
                        <div className="InputForm">
                            <label for="exampleInputEmail1">ชื่อสถานที่</label>
                            <input type='text' class="form-control" placeholder='ใส่ชื่อสถานที่หรือกิจกรรมของคุณ'
                                name="eventName"
                                value={Event.eventName}
                                onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                            />
                        </div>
                        {ValidEventName === true ? <RequiredForm /> : ""}
                        {console.log('event', errors.eventName)}
                        <label for="exampleInputEmail1" className="pt-2">เวลาเริ่ม</label>
                        <input type='time' class="form-control"
                            name="startEvent"
                            value={Event.startEvent}
                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                        />
                        {ValidStartEvent === true ? <RequiredForm /> : ""}
                        {console.log('start', errors.startEvent)}
                        <label for="exampleInputEmail1" className="pt-2">เวลาจบ</label>
                        <input type='time' class="form-control"
                            name="endEvent"
                            value={Event.endEvent}
                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                        />
                        {ValidEndEvent === true ? <RequiredForm /> : ""}
                        <label for="exampleInputEmail1" className="pt-2">ประเภท</label>
                        <div className="container">
                            <div className="row text-center">

                                <div className="col-4 ">

                                    <button type="button" class="event-type-btn-inmodal btn p-0 ml-1"
                                        onClick={() => selectEventType('eating')}>
                                        <i
                                            class="fas fa-utensils fa-2x">
                                        </i>
                                    </button>
                                </div>
                                <div className="col-4 ">
                                    <button type="button" class="event-type-btn-inmodal btn p-0 ml-1"
                                        onClick={() => selectEventType('travel')}>
                                        <i
                                            class="fas fa-car-side fa-2x ">
                                        </i>
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button type="button" class="event-type-btn-inmodal btn p-0 ml-1"
                                        onClick={() => selectEventType('sleep')}>
                                        <i
                                            class="fas fa-bed fa-2x ">
                                        </i>
                                    </button>
                                </div>
                            </div>
                            {ValidEventType === true ? <RequiredForm /> : ""}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ color: "white", backgroundColor: "orange", borderColor: "orange" }}
                        onClick={() => onSubmit()}>เสร็จสิ้น</Button>
                </Modal.Footer>
                {/* </form> */}
            </Modal>
        </div>
    )
}
export default CreateTripModal;