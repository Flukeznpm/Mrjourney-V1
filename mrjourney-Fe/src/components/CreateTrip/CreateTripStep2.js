import React from 'react';
import '../../static/css/App.css';
import "../../static/css/Event-Trip.css";
import Swal from 'sweetalert2';
import CreateTripModal from '../Modal/CreateTripModal'
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import momentjs from 'moment'

class CreateTripStep2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addModalShow: false,
            Event: {
                eventName: '',
                startEvent: '',
                endEvent: '',
                eventType: ''
            },
            keyModal: 0
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
            addModalShow: false
        })
    }


    addModalConfirm = (key) => {
        let Event = this.state.Event
        // let Trip = this.props.
        console.log('key', key);
        this.props.handleSetEvent(Event, key)

        this.setState(prevState => ({
            addModalShow: false,
        }))
    }

    render() {


        return (
            <div>
                <div className="top-page mb-3">
                    <div className="container content-page py-2">
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
                        <div className="header-trip">
                            <h3>ชื่อทริป : {this.props.TripForm.demoTripName}</h3>
                            <h4>จังหวัด : {this.props.TripForm.demoProvince}</h4>
                        </div>
                        <div className="trip-perday-box py-3">

                            <div className="text-center py-2">
                                <span className="show-date-to-end">
                                    <span className="p-1"> {momentjs(this.props.TripForm.demoDate).format('DD/MM/YYYY')}
                                    </span>
                                    <span className="p-1">{momentjs(this.props.TripForm.demoDate).add(this.props.TripForm.numberAddDate - 1, 'day').format('DD/MM/YYYY')}
                                    </span>
                                </span>
                            </div>


                            {/* {this.props.TripForm.totalDate.map((PerDay, key) => { //original pattern
                                return (
                                    <div>{PerDay.eventDate}{key}
                                        {PerDay.event.map((eventDetail, key) => {
                                            return (
                                                <div>
                                                    {eventDetail.eventName}
                                                    <br />{eventDetail.eventTime}
                                                    <br />{eventDetail.eventType}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })} */}

                            {this.props.TripForm.totalDate.map((PerDay, key) => {
                                console.log(key);

                                return (
                                    <div class="alert event-box-active border-bottom" >
                                        <span style={{ color: "rgb(241, 82, 19)", fontSize: "24px" }}>{PerDay.eventDate}</span>
                                        <span className="float-right"><i class="fas fa-caret-up"></i></span>
                                        {PerDay.event.map((eventDetail, key) => {

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
                                                            {/* <button type="button" class="event-type-btn btn p-0 ml-1 float-right">
                                                                <span class="shadow fas fa-car"></span></button> */}
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="m-2">
                                                                <button type="button" class="event-deleted-btn p-0 ml-1 btn float-right">
                                                                    <span class="shadow fas fa-trash-alt"></span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <p className="text-center"><div className="add-details-button">
                                            <i class="far fa-plus-square fa-2x pt-3" style={{ color: "rgb(241, 82, 19)" }}
                                                onClick={() => this.setState({ keyModal: key, addModalShow: true })}></i>
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
                                        </div>
                                        </p>
                                    </div>
                                )
                            })}

                            <div class="alert event-box-disabled">

                                <span> 15 สิงหาคม 2563</span>
                                <span className="float-right"><i class="fas fa-caret-down"></i></span>
                            </div>


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
                    </div>
                </div>

            </div>
        )
    }
}

export default CreateTripStep2;

