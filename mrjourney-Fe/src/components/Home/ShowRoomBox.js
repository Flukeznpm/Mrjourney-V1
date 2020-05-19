import React from 'react';
import "../../static/css/Show-Room.css";
import "../../static/css/Nav.css";
import "../../static/css/App.css";
import BgSlide1 from '../../static/img/pr-01.png';
import Logo from '../../static/img/logojourney.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import momentjs from 'moment'
import MoreRoomDetailModal from '../Modal/MoreRoomDetailModal';
class ShowRoomBox extends React.Component {

    constructor() {
        super()
        this.state = {
            addModalShow: false,
            room: [
                {
                    // roomID: '',
                    // roomName: '',
                    // // picRoom: datas.picRoom,
                    // province: '',
                    // startDate: '',
                    // endDate: '',
                    // tripDetails: '',
                    // // QRcode: datas.QRcode,
                    // maxMember: '',
                    // genderCondition: '',
                    // ageCondition: '',
                    // status: ''
                }
            ],

        }
    }

    componentDidMount = async () => {
        await axios.get('http://localhost:5000/room')
            .then(async res => {
                // console.log('Data from /api/room : ' + res.data)
                this.setState({
                    room: res.data
                });
            });
        // console.log('Data from state.room : ' + this.state.room);
    }

    AlertJoinWrongCondition = () => {

        Swal.fire({
            icon: 'error',
            title: 'ขออภัย!',
            text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
            showCancelButton: false,
            confirmButtonColor: '#D33',
            confirmButtonText: 'กลับสู่หน้าหลัก'
        })

    }

    AlertJoinRoom = () => {
        if (this.state.myacc === 'guest') {
            Swal.fire({
                icon: 'success',
                title: 'เข้าร่วมสำเร็จ!',
                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                showCancelButton: true,
                confirmButtonText: 'เข้าสู่ห้อง',
                confirmButtonColor: '#31CC71',
                cancelButtonText: 'กลับสู่หน้าหลัก',
            })
        }
    }

    AlertJoinRoomDontAcc = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณยังไม่ได้ Login!',
            text: 'กรุณาทำการ Login ก่อนทำรายการ',
            showCancelButton: true,
            confirmButtonText: 'Login',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่หน้าหลัก',
        })
    }

    AlertRoomDetails = () => {
        Swal.fire({
            imageUrl: "//static/img/logojourney.png",
            position: 'center',
            type: 'info',
            title: `Class Information`,
            input: 'date',
            html: `<div>
            <h1> HelloWorld </h1>
            <p> TestAlert </p>
            <p className="float-right">hahaha</p>
            <img src=${Logo} height="45" alt="MrJourney" />ผู้สร้าง 
            </div>`,
        })
    }

    addModalClose = () => {
        this.setState({
            addModalShow: false,
        })
    }

    render() {
        return (
            <section className="py-5">
                <div className="Show-Join-Room">
                    <div className="container">
                        <div className="row">

                            {this.state.room.map((room, key) => {
                                return (
                                    // <span id={key}>
                                    <div className="col-4">
                                        <div className="col">

                                            <div class="alert box-room show-box">
                                                <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                                                <div class="box-room-details show-box mt-2">
                                                    <div className="mt-3 mr-3 ml-3 mb-0">
                                                        <h3 className="py-1">
                                                            {room.roomName} &nbsp;
                                                             <button
                                                                type="button" class="maxMember-btn btn p-0 ml-1 "
                                                                style={{ fontSize: "12px" }} >
                                                                0/
                                                                {room.maxMember}
                                                            </button>
                                                        </h3>
                                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                                            Room ID : {room.roomID}
                                                        </span>
                                                        <br />
                                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                                            จังหวัด : {room.province}
                                                        </span>
                                                        <br />
                                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                                            วันที่ : &nbsp;
                                                            <button
                                                                type="button" class="show-details-btn btn p-1 " style={{ fontSize: "10px" }}>
                                                                {momentjs(room.startDate).format('DD/MM/YYYY')}
                                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                            </button>
                                                            &nbsp; - &nbsp;
                                                            <button
                                                                type="button" class="show-details-btn btn p-1" style={{ fontSize: "10px" }}>
                                                                {momentjs(room.endDate).format('DD/MM/YYYY')}
                                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                            </button>
                                                        </span>
                                                        <p />
                                                        <div className="text-right">
                                                            {room.genderCondition == 'ชาย' ?
                                                                <span className="Show-genderCondition pl-2 pr-2">
                                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                                </span>
                                                                :
                                                                ""}
                                                            {room.genderCondition == 'หญิง' ?
                                                                <span className="Show-genderCondition pl-2 pr-2">
                                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                                </span>
                                                                :
                                                                ""}
                                                            {room.genderCondition == 'ไม่จำกัดเพศ' ?
                                                                <span className="Show-genderCondition pl-2 pr-2">
                                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                                </span>
                                                                :
                                                                ""}
                                                            <br /><span className="mt-0 ml-2" style={{ fontSize: "10px" }}>
                                                                อายุ
                                                                &nbsp;
                                                            <button
                                                                    type="button" class="show-details-btn btn p-1 " style={{ fontSize: "8px" }}>
                                                                    {room.ageCondition}
                                                                </button>
                                                            </span>
                                                        </div>
                                                        <span className="pl-1 pr-1"><img src={room.ownerPicRoom} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                                        <span style={{ fontSize: "13px" }}>ผู้สร้าง : {room.ownerRoom}</span>
                                                    </div>
                                                    <div className="navbar pt-2">
                                                        <div>
                                                            <button type="button" class="btn nav-color round text-white" onClick={this.AlertJoinRoom}>เข้าร่วม</button>
                                                        </div>
                                                        <div className="button-search">
                                                            <button type="button" className="btn"
                                                                onClick={() => this.setState({ addModalShow: true })}>
                                                                <i class="fas fa-search fa-2x" style={{ color: "#F37945" }}></i>
                                                            </button>
                                                            <MoreRoomDetailModal
                                                                show={this.state.addModalShow}
                                                                onHide={this.addModalClose} //use for closeButton
                                                            ></MoreRoomDetailModal>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // </span>
                                )
                            })}


                            {/* Mockup 01 */}
                            <div className="col-4">
                                <div className="col">

                                    <div class="alert box-room show-box">
                                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                                        <div class="box-room-details show-box mt-2">
                                            <div className="mt-3 mr-3 ml-3 mb-0">
                                                <h3 className="py-1">
                                                    Mockup 01 &nbsp;
                                                             <button
                                                        type="button" class="maxMember-btn btn p-0 ml-1 "
                                                        style={{ fontSize: "12px" }} >
                                                        0/5
                                                    </button>
                                                </h3>
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    Room ID : R_000002
                                                </span>
                                                <br />
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    จังหวัด : กรุงเทพมหานคร
                                                </span>
                                                <br />
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    วันที่ : &nbsp;
                                                            <button
                                                        type="button" class="show-details-btn btn p-1 " style={{ fontSize: "10px" }}>
                                                        {momentjs('2020-05-04').format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>
                                                            &nbsp; - &nbsp;
                                                            <button
                                                        type="button" class="show-details-btn btn p-1" style={{ fontSize: "10px" }}>
                                                        {momentjs('2020-05-05').format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>
                                                </span>
                                                <p />
                                                <div className="text-right">
                                                    <span className="Show-genderCondition pl-2 pr-2">
                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                    </span>
                                                    <br /><span className="mt-0 ml-2" style={{ fontSize: "10px" }}>
                                                        อายุ
                                                        &nbsp;
                                                            <button
                                                            type="button" class="show-details-btn btn p-1 " style={{ fontSize: "8px" }}>
                                                            20 ปีขึ้นไป
                                                        </button>
                                                    </span>
                                                </div>
                                                <span className="pl-1 pr-1"><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                                <span style={{ fontSize: "13px" }}>ผู้สร้าง : mrjourney</span>
                                            </div>
                                            <div className="navbar pt-2">
                                                <div>
                                                    <button type="button" class="btn nav-color round text-white" onClick={this.AlertJoinWrongCondition}>เข้าร่วม</button>
                                                </div>
                                                <div className="button-search">
                                                    <button type="button" className="btn"
                                                        onClick={() => this.setState({ addModalShow: true })}>
                                                        <i class="fas fa-search fa-2x" style={{ color: "#F37945" }}></i>
                                                    </button>
                                                    <MoreRoomDetailModal
                                                        show={this.state.addModalShow}
                                                        onHide={this.addModalClose} //use for closeButton
                                                    ></MoreRoomDetailModal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mockup 02 */}
                            <div className="col-4">
                                <div className="col">

                                    <div class="alert box-room show-box">
                                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                                        <div class="box-room-details show-box mt-2">
                                            <div className="mt-3 mr-3 ml-3 mb-0">
                                                <h3 className="py-1">
                                                    Mockup 02 &nbsp;
                                                             <button
                                                        type="button" class="maxMember-btn btn p-0 ml-1 "
                                                        style={{ fontSize: "12px" }} >
                                                        0/3
                                                    </button>
                                                </h3>
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    Room ID : R_000003
                                                </span>
                                                <br />
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    จังหวัด : กรุงเทพมหานคร
                                                </span>
                                                <br />
                                                <span className="py-1" style={{ fontSize: "14px" }}>
                                                    วันที่ : &nbsp;
                                                            <button
                                                        type="button" class="show-details-btn btn p-1 " style={{ fontSize: "10px" }}>
                                                        {momentjs('2020-06-08').format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>
                                                            &nbsp; - &nbsp;
                                                            <button
                                                        type="button" class="show-details-btn btn p-1" style={{ fontSize: "10px" }}>
                                                        {momentjs('2020-06-10').format('DD/MM/YYYY')}
                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                    </button>
                                                </span>
                                                <p />
                                                <div className="text-right">
                                                    <span className="Show-genderCondition pl-2 pr-2">
                                                        <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                        <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                    </span>
                                                    <br /><span className="mt-0 ml-2" style={{ fontSize: "10px" }}>
                                                        อายุ
                                                        &nbsp;
                                                            <button
                                                            type="button" class="show-details-btn btn p-1 " style={{ fontSize: "8px" }}>
                                                            ไม่จำกัดช่วงอายุ
                                                        </button>
                                                    </span>
                                                </div>
                                                <span className="pl-1 pr-1"><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                                <span style={{ fontSize: "13px" }}>ผู้สร้าง : mrjourney</span>
                                            </div>
                                            <div className="navbar pt-2">
                                                <div>
                                                    <button type="button" class="btn nav-color round text-white" onClick={this.AlertJoinRoomDontAcc}>เข้าร่วม</button>
                                                </div>
                                                <div className="button-search">
                                                    <button type="button" className="btn"
                                                        onClick={() => this.setState({ addModalShow: true })}>
                                                        <i class="fas fa-search fa-2x" style={{ color: "#F37945" }}></i>
                                                    </button>
                                                    <MoreRoomDetailModal
                                                        show={this.state.addModalShow}
                                                        onHide={this.addModalClose} //use for closeButton
                                                    ></MoreRoomDetailModal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        )
    }
}
export default ShowRoomBox;