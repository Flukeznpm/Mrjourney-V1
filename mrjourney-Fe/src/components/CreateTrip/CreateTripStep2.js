import React, { useContext, useEffect, useState } from 'react';
import '../../static/css/App.css';
import "../../static/css/Event-Trip.css";
import CreateTripModal from '../Modal/CreateTripModal'
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import momentjs from 'moment'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'

function CreateTripStep2(props) {
    const { nextStep, prevStep, deleteEvent, Trip, addModalShow, keyModal, setActiveEvent, setNotActiveEvent, eventModalClose, setEvent, eventModalShow } = useContext(HookContext)
  
    const [Linename, setLineName] = useState('')
    const [Linepicture, setLinePicture] = useState('')

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT == undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineName(user.displayName)
            setLinePicture(user.pictureURL)
        }
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        let dataTrip = {
            tripname: this.state.tripname,
            province: this.state.province,
            date: this.state.date,
            day: this.state.day
        }
        axios.post('http://localhost:5000/trip/createTrip', dataTrip)
            .then(res => {
                console.log(res)
            });
    }

    return (
        <div>
            <div className="top-page mb-3">
                <div className=" step-progress step-2 mt-3 pt-2">
                    <ul>
                        <li>
                            <img src={LogoStep1} style={{ opacity: "20%" }} /><br />
                            <i class="fas fa-check"></i>
                            <p>สร้างแผน</p>
                        </li>
                        <li>
                            <img src={LogoStep2} style={{ opacity: '80%' }} /><br />
                            <i class="fas fa-sync-alt"></i>
                            <p>ระบุรายละเอียด</p>
                        </li>
                        <li>
                            <img src={LogoStep3} style={{ opacity: '20%' }} /><br />
                            <i class="fas fa-times"></i>
                            <p>เสร็จสิ้น</p>
                        </li>
                    </ul>
                </div>
                <div className="content-page py-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <div className="trip-perday-box py-3">
                                    <div className="text-center " style={{ paddingBottom: "25px" }}>
                                        <span className="show-date-to-end ">
                                            <span className="mt-2 mb-2 ml-3 mr-3" style={{ fontWeight: "normal" }}>
                                                <span className="p-1"> {momentjs(Trip.date).format('DD/MM/YYYY')}
                                                </span>
                                                    &nbsp;-&nbsp;
                                                    <span className="p-1">{momentjs(Trip.date).add(Trip.numberAddDate - 1, 'day').format('DD/MM/YYYY')}
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                    {Trip.totalDate.map((PerDay, key) => {
                                        console.log('per', PerDay)
                                        return (
                                            <div>

                                                {Trip.activeEvent !== key ?
                                                    <div class="alert event-box-disabled">
                                                        <span className="text-white">{PerDay.eventDate}</span>
                                                        <span className="float-right">
                                                            <i class="fas fa-caret-down" onClick={() => setActiveEvent(key)} style={{ cursor: "pointer" }} />
                                                        </span>
                                                    </div>
                                                    :
                                                    <div class="alert event-box-active border-bottom">
                                                        <span style={{ color: "rgb(241, 82, 19)", fontSize: "24px" }}>{PerDay.eventDate}</span>
                                                        <span className="float-right">
                                                            <i class="fas fa-caret-up" onClick={() => setNotActiveEvent(key)} style={{ cursor: "pointer" }} />
                                                        </span>
                                                        {PerDay.event.map((eventDetail) => {
                                                            return (
                                                                <div className="container">
                                                                    <div className="row py-2">
                                                                        <div className="col-9">
                                                                            <span className="float-left">
                                                                                {eventDetail.eventName}
                                                                                <br />{eventDetail.startEvent}
                                                                            </span>
                                                                            <div className="m-2">
                                                                                {eventDetail.eventType == 'eating' ?
                                                                                    <button
                                                                                        type="button" class="event-type-btn btn p-0 ml-1 float-right">
                                                                                        <span class="shadow fas fa-utensils"></span>
                                                                                    </button>
                                                                                    : ""}
                                                                                {eventDetail.eventType == 'travel' ?
                                                                                    <button
                                                                                        type="button" class="event-type-btn btn p-0 ml-1 float-right">
                                                                                        <span class="shadow fas fa-car-side"></span>
                                                                                    </button>
                                                                                    : ""}

                                                                                {eventDetail.eventType == 'sleep' ?
                                                                                    <button
                                                                                        type="button" class="event-type-btn btn p-0 ml-1 float-right">
                                                                                        <span class="shadow fas fa-bed"></span>
                                                                                    </button>
                                                                                    : ""}
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-3">
                                                                            <div className="m-2">
                                                                                <button type="button"
                                                                                    class="delete-event-btn p-0 ml-1 btn float-right"
                                                                                    onClick={() => deleteEvent(eventDetail, key)}>
                                                                                    <span class="shadow fas fa-trash-alt"></span></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <p className="text-center">
                                                            <button type="button" className="add-details-btn btn p-0 pt-1"
                                                                onClick={() => eventModalShow(key)}>
                                                                <span className="far fa-plus-square fa-lg">
                                                                </span>
                                                            </button>
                                                            <CreateTripModal
                                                                show={addModalShow}
                                                                onConfirm={() => setEvent(keyModal)}
                                                                onHide={() => eventModalClose(keyModal)}
                                                                show={addModalShow}
                                                            ></CreateTripModal>
                                                        </p>
                                                    </div>
                                                }

                                            </div>
                                        )
                                    })}

                                    <div className="buttom-page py-3">
                                        <div className="container py-3">
                                            <div className="col-2 float-left ml-4">
                                                <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                    onClick={() => prevStep(1)}>ย้อนกลับ</button>
                                            </div>
                                            <div className=" col-2 float-right mr-4">
                                                <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                    onClick={() => nextStep(1)}>เสร็จสิ้น</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateTripStep2);

