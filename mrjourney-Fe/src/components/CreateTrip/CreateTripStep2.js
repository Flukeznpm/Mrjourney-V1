import React from 'react';
import '../../static/css/App.css';
import "../../static/css/Event-Trip.css";
import Swal from 'sweetalert2';
import CreateTripModal from '../Modal/CreateTripModal'
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import momentjs from 'moment'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';

class CreateTripStep2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addModalShow: false,
            Event: {
                eventName: '',
                startEvent: '',
                endEvent: '',
                eventType: '',

            },
            //>>>>>>>>>>>
            keyModal: 0
        }
    }








    componentDidMount() {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT == undefined) {
            this.props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            this.setState({
                Linename: user.displayName,
                Linepicture: user.pictureURL
            })
        }
    }

    onhandleEventForm = async (e) => {
        let value = e.target.value
        let name = e.target.name
        await this.setState(prevState => ({
            Event: {
                ...prevState.Event,
                [name]: value,
            }
        }))
    }

    onSelectTypeEat = () => {
        this.setState(prevState => ({
            Event: {
                ...prevState.Event,
                eventType: this.state.Event.eventType = 'eating'
            }
        }))
    }
    onSelectTypeTravel = () => {
        this.setState(prevState => ({
            Event: {
                ...prevState.Event,
                eventType: this.state.Event.eventType = 'travel'
            }
        }))
    }
    onSelectTypeSleep = () => {
        this.setState(prevState => ({
            Event: {
                ...prevState.Event,
                eventType: this.state.Event.eventType = 'sleep'
            }
        }))
    }

    addModalClose = () => {
        this.setState({
            addModalShow: false,
            Event: {
                eventName: '',
                startEvent: '',
                endEvent: '',
                eventType: ''
            },
        })
    }

    addModalConfirm = (key) => {
        let Event = this.state.Event
        // let Trip = this.props.
        console.log('key', key);
        this.props.handleSetEvent(Event, key)

        this.setState({
            addModalShow: false,
            Event: {
                eventName: '',
                startEvent: '',
                endEvent: '',
                eventType: ''
            },
        })
    }



    handleSubmit(e) {
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




    render() {
        return (
            <div>
                <div className="top-page mb-3">
                    {/* <div className="container content-page py-2"> */}
                    <div className=" step-progress step-2 mt-3 pt-2">
                        <ul>
                            <li>
                                <img src={LogoStep1} style={{ opacity: "20%" }} /><br />
                                <i class="fas fa-check"></i>
                                <p>สร้างแผน</p>
                            </li>
                            <li>
                                <img src={LogoStep2} style={{ opacity: '80%' }} /><br />
                                {/* <i class="fas fa-sync-alt"></i> */}
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

                                    <div className="header-trip">
                                        <h3>ชื่อทริป : {this.props.TripForm.tripName}</h3>
                                        <h4>จังหวัด : {this.props.TripForm.province}</h4>
                                    </div>
                                    <div className="trip-perday-box py-3">

                                        <div className="text-center py-2">
                                            <span className="show-date-to-end">
                                                <span className="p-1"> {momentjs(this.props.TripForm.date).format('DD/MM/YYYY')}
                                                </span>
                                                <span className="p-1">{momentjs(this.props.TripForm.date).add(this.props.TripForm.numberAddDate - 1, 'day').format('DD/MM/YYYY')}
                                                </span>
                                            </span>
                                        </div>

                                        {this.props.TripForm.totalDate.map((PerDay, key) => {

                                            return (
                                                <div>

                                                    {this.props.TripForm.activeEvent !== key ?
                                                        <div class="alert event-box-disabled">
                                                            <span className="text-white">{PerDay.eventDate}</span>
                                                            <span className="float-right">
                                                                <i class="fas fa-caret-down" onClick={() => this.props.handleSetActiveEvent(key)} />
                                                            </span>
                                                        </div>
                                                        :
                                                        <div class="alert event-box-active border-bottom" >
                                                            <span style={{ color: "rgb(241, 82, 19)", fontSize: "24px" }}>{PerDay.eventDate}</span>
                                                            <span className="float-right">
                                                                <i class="fas fa-caret-up" onClick={() => this.props.handleSetNotActiveEvent(key)} />
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
                                                                                        class="event-deleted-btn p-0 ml-1 btn float-right"
                                                                                        onClick={() => this.props.handleRemoveEvent(eventDetail, key)}>
                                                                                        <span class="shadow fas fa-trash-alt"></span></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <p className="text-center">
                                                                <button type="button" className="add-details-btn btn p-0 pt-1"
                                                                    onClick={() => this.setState({ keyModal: key, addModalShow: true })}>
                                                                    <span className="far fa-plus-square fa-lg">
                                                                    </span>
                                                                </button>
                                                                <CreateTripModal
                                                                    show={this.state.addModalShow}
                                                                    onConfirm={() => this.addModalConfirm(this.state.keyModal)}
                                                                    onHide={() => this.addModalClose(this.state.keyModal)} //use for closeButton
                                                                    EventForm={this.state.Event}
                                                                    handleEventForm={this.onhandleEventForm}
                                                                    onSelectTypeEat={this.onSelectTypeEat}
                                                                    onSelectTypeTravel={this.onSelectTypeTravel}
                                                                    onSelectTypeSleep={this.onSelectTypeSleep}
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
                                                        onClick={this.props.handlePreviousStep}>ย้อนกลับ</button>
                                                </div>
                                                <div className=" col-2 float-right mr-4">
                                                    <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                        onClick={this.props.handleStep}>เสร็จสิ้น</button>
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
}

export default withRouter(CreateTripStep2);

