import React from 'react';
import styled from "styled-components";
import { Modal, Button } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";
import BgSlide1 from '../../static/img/pr-01.png';
import momentjs from 'moment'
import Logo from '../../static/img/logojourney.png';
import {
    Button as AntButton,
    Tooltip,
    Card
} from 'antd';

const AntCard = styled(Card)`
  border-radius: 8px;
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;

const ImgCover = styled.img`
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
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

function MoreRoomDetailModal(props) {
    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton style={{ border: "none", paddingBottom: "0px" }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton style={{ paddingBottom: "0px" }}>
                    <div className="container">
                        <ImgCover class="d-block w-100" src={props.room.roomCover} alt="First slide" />
                        <AntCard style={{ padding: 0 }}>
                            <div className="pt-3" style={{ fontSize: "20px", fontWeight: 'bold' }}>
                                {props.room.roomName} &nbsp;
                                <button
                                    type="button" class="maxMember-btn btn p-0 ml-1 "
                                    style={{ fontSize: "12px" }} >
                                    0/{props.room.maxMember}
                                </button>
                            </div>
                            <div className="details py-1">
                                <span className="row">
                                    <span className="col-8">
                                        <span className="py-1" style={{ fontSize: "14px" }}>
                                            จังหวัด : {props.room.province}
                                        </span>
                                        <br /><span className="py-1" style={{ fontSize: "14px" }}>
                                            วันที่ : &nbsp;
                                                            <button
                                                type="button" class="show-details-btn btn p-1 " style={{ fontSize: "10px" }}>
                                                {momentjs(props.room.startDate).format('ll')}

                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                                            &nbsp; - &nbsp;
                                                            <button
                                                type="button" class="show-details-btn btn p-1" style={{ fontSize: "10px" }}>
                                                {momentjs(props.room.endDate).format('ll')}

                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                        </span>
                                    </span>
                                    <span className="col-4">
                                        {props.room.genderCondition === 'ชาย' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.room.genderCondition === 'หญิง' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                            </span>
                                            :
                                            ""}
                                        {props.room.genderCondition === 'ไม่จำกัดเพศ' ?
                                            <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
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
                                                {props.room.ageCondition}
                                            </button>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div className="Creator mt-2">
                                <span className="pl-1 pr-1"><img src={props.room.ownerPicRoom} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></span>
                                <span style={{ fontSize: "13px" }}>ผู้สร้าง : {props.room.ownerRoomName}</span>

                            </div>
                            <div className="trip-detail-modal py-1">
                                รายละเอียดแผนการท่องเที่ยว
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" disabled
                                >
                                    {props.room.tripDetails}

                                </textarea>
                            </div>
                        </AntCard>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ border: "none" }}>
                    <PrimaryButton className="mr-3" type="primary" htmlType="button" onClick={props.onHide}>ถัดไป</PrimaryButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MoreRoomDetailModal;