import React, { useContext } from 'react';
import { Modal, Button} from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import { HookContext } from '../../store/HookProvider'

function CreateTripModal(props) {
    const { handleEventForm, Event, selectEventType } = useContext(HookContext)
    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        รายละเอียดกิจกรรม
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <label for="exampleInputEmail1">ชื่อสถานที่</label>
                        <input type='text' class="form-control" placeholder='ใส่ชื่อสถานที่หรือกิจกรรมของคุณ'
                            name="eventName"
                            value={Event.eventName}
                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                        />
                        <label for="exampleInputEmail1" className="pt-2">เวลาเริ่ม</label>
                        <input type='time' class="form-control"
                            name="startEvent"
                            value={Event.startEvent}
                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                        />
                        <label for="exampleInputEmail1" className="pt-2">เวลาจบ</label>
                        <input type='time' class="form-control"
                            name="endEvent"
                            value={Event.endEvent}
                            onChange={(e) => handleEventForm(e.target.value, e.target.name)}
                        />
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
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ color: "white", backgroundColor: "orange", borderColor: "orange" }}
                        onClick={props.onConfirm}>เสร็จสิ้น</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default CreateTripModal;