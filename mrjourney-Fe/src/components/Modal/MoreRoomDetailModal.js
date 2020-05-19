import React from 'react';
import { Modal, Col, Row, ModalDialog, ModalHeader, ModalTitle, ModalFooter, ModalBody, Button, Container } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import BgSlide1 from '../../static/img/pr-01.png';
import momentjs from 'moment'
import Logo from '../../static/img/logojourney.png';

class MoreRoomDetailModal extends React.Component {

    render(props) {
        return (
            <div>
                <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                            <div className="pt-3" style={{ fontSize: "20px", fontWeight: 'bold' }}>
                                Trip MockUp 02 &nbsp;
                                <button
                                    type="button" class="maxMember-btn btn p-0 ml-1 "
                                    style={{ fontSize: "12px" }} >
                                    0/5
                                </button>
                            </div>
                            <div className="details py-1">
                                <span className="row">
                                    <span className="col-8">
                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                            จังหวัด : กรุงเทพมหานคร
                                    </span>
                                        <br /><span className="py-1" style={{ fontSize: "14px" }}>
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
                                    </span>
                                    <span className="col-4">
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
                                    </span>
                                </span>
                            </div>
                            <div className="Creator mt-2">
                                <span className="pl-1 pr-1"><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                <span style={{ fontSize: "13px" }}>ผู้สร้าง : mrjourney</span>
                            </div>
                            <div className="trip-detail-modal py-1">
                                รายละเอียดแผนการท่องเที่ยว
                                {/* <div class="alert" style={{width:"100%",height:"200px",borderColor:"orange"}}>
                                    แผนการเดินทางวันที่ 8
                                    <p/>แผนการเดินทางวันที่ 9
                                    <p/>แผนการเดินทางวันที่ 10
                                </div> */}
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"

                                >
                                </textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ color: "white", backgroundColor: "orange", borderColor: "orange" }}
                            onClick={this.props.onHide}>Join</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default MoreRoomDetailModal;