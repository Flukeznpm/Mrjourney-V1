import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/Show-Room.css';
import "../static/css/Nav.css";
import "../static/css/App.css";
import momentjs from 'moment'
import BgSlide1 from '../static/img/pr-01.png';
import FooterWebPage from '../components/Footer/FooterWebPage';

class AllMyJoinedRoom extends React.Component {

    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <NavWebPage />
                    <div className="content-page container py-4">
                        <h1 className="font-weight-bold">ห้องที่คุณเข้าร่วม</h1>
                        <div className="show-owner-room">
                            <div className="row">
                                <div className="col-md-4 col-sm-12 d-flex justify-content-center py-2">
                                    <div class="card" style={{ width: "18rem" }}>
                                        <img class="card-img-top" src={BgSlide1} alt="Card image cap" />
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                (ใส่roomName) &nbsp;
                                            <button
                                                    type="button" class="float-right maxMember-btn btn p-0 "
                                                    style={{ fontSize: "10px" }} >
                                                    0/
                                                    (ใส่maxMember)
                                                </button>
                                            </h4>
                                            <div class="card-text">จ. (ใส่province)</div>
                                            <div class="card-text py-2">
                                                <button
                                                    type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                    {momentjs(new Date()).format('ll')}
                                                    <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                </button>
                                                    &nbsp;-&nbsp;
                                                <button
                                                    type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                    {momentjs(new Date()).format('ll')}
                                                    <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                </button>
                                            </div>
                                            <div className="card-text py-2">
                                                <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                </span>
                                                <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                                    อายุ (ใส่ageCondition)
                                                </span>
                                            </div>
                                            <div className="owner-trip-profile py-2">
                                                <span className="pl-1 pr-2"><img src="../static/img/logojourney.png" class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>
                                                <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง : (ใส่ownerRoomName)</span>
                                            </div>
                                            <button type="button" class="col-5 mx-2 btn btn-outline-danger round">
                                                ออกห้อง
                                            </button>
                                            <button type="button" className="btn mx-2 col-5 btn-join-color round text-white">
                                                ข้อมูลห้อง
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-page">
                    <FooterWebPage></FooterWebPage>
                </div>
            </div>
        )
    }
}

export default AllMyJoinedRoom;