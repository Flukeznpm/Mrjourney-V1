import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import NavWebPage from '../components/Nav/NavWebPage';
import momentjs from 'moment'
import FooterWebPage from '../components/Footer/FooterWebPage';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import {
    Button as AntButton,
    Tooltip,
    Col, Row,
    Input as AntInput,
    Select as AntSelect,
    Progress, Typography
} from 'antd';
import DeleteModal from '../components/components/DeleteModal';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

const ImgCover = styled.img`
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

const { Paragraph } = Typography;
const AntParagraph = styled(Paragraph)`
    font-size: 10px;
    .ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
        color: gray;
    }
    .ant-typography-copy-success, .ant-typography-copy-success:hover, .ant-typography-copy-success:focus {
        color: ${props => (props.theme.color.primary)};
    }
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 8px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const LeaveButton = styled(AntButton)`
    border-radius: 8px;
    font-size: 16px;
    color: #FF4647;
    border: 2px solid #FF4647;
    &:hover , &:active, &:focus {
        color:  #c5223d;
        border: 2px solid #c5223d;
    }
`;


const ColRoomId = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ColRoomStatus = styled(Col)`
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;


function MyOwnerRoom(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [ownerRoom, setShowOwnerRoom] = useState([{}])
    const [isVisible, setVisible] = useState(false)
    const [deleteRoomID, setDeleteRoomID] = useState("")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        axios.get(`http://localhost:5000/accountProfile/ownerRoom?lineID=${user.lineID}`)
            .then(res => {
                setShowOwnerRoom(res.data)
            })
    }, [isVisible])

    const onVisibleModal = (roomID) => {
        setDeleteRoomID(roomID)
        setVisible(true)
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />
                <div className="content-page container py-4">
                    <h1 className="font-weight-bold">ห้องที่คุณเป็นเจ้าของ</h1>
                    <div className="show-owner-room">
                        <div className="row">
                            {ownerRoom.length ?
                                <>
                                    {ownerRoom.map((ownerRoom) => {
                                        return (
                                            <div className="col-md-4 col-sm-12 d-flex justify-content-center py-2">
                                                <div class="card" style={{ width: "20rem" }}>
                                                    <ImgCover class="card-img-top" src={ownerRoom.roomCover} alt="Card image cap" />
                                                    <div class="card-body">
                                                        <div class="card-text">
                                                            <Row>
                                                                <ColRoomStatus span={12}>
                                                                    <div>{ownerRoom.roomStatus === true ?
                                                                        <div style={{ color: "#e66f0f" }}>เปิด</div>
                                                                        :
                                                                        <div style={{ color: "#FF4647" }}>ปิด</div>
                                                                    }
                                                                    </div>
                                                                </ColRoomStatus>
                                                                <ColRoomId span={12}>
                                                                    <AntParagraph copyable>{ownerRoom.roomID}</AntParagraph>
                                                                </ColRoomId>
                                                            </Row>
                                                        </div>
                                                        <h5 class="card-title" style={{ fontWeight: "bold" }}>
                                                            {ownerRoom.roomName}
                                                        </h5>
                                                        <div class="card-text">
                                                            จ. {ownerRoom.province}
                                                        </div>
                                                        <div className="col-12 p-0">
                                                            <div class="card-text row">
                                                                <div className="col-9">
                                                                    <Progress
                                                                        percent={(100 / ownerRoom.maxMember) * ownerRoom.joinedMember}
                                                                        showInfo={false} />
                                                                </div>
                                                                <div className="col-3" style={{ fontSize: "12px", textAlign: "center" }}>
                                                                    {ownerRoom.joinedMember}/{ownerRoom.maxMember}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-text py-2">
                                                            <button
                                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                                {momentjs(ownerRoom.startDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                            </button>
                                                                &nbsp;-&nbsp;
                                                                <button
                                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                                {momentjs(ownerRoom.endDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                                            </button>
                                                        </div>
                                                        <div className="card-text py-2">
                                                            {ownerRoom.genderCondition === 'ชาย' ?
                                                                <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                                                    <ManOutlined style={{ color: "dodgerblue" }} />
                                                                </span>
                                                                :
                                                                ""}
                                                            {ownerRoom.genderCondition === 'หญิง' ?
                                                                <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                                                    <WomanOutlined style={{ color: "hotpink" }} />
                                                                </span>
                                                                :
                                                                ""}
                                                            {ownerRoom.genderCondition === 'ไม่จำกัดเพศ' ?
                                                                <span className="pl-2 pr-2" style={{ fontSize: "0.95rem" }}>
                                                                    <WomanOutlined style={{ color: "hotpink" }} />
                                                                    <ManOutlined style={{ color: "dodgerblue" }} />
                                                                </span>
                                                                :
                                                                ""}
                                                            <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                                                อายุ {ownerRoom.ageCondition}
                                                            </span>
                                                        </div>
                                                        <div className="owner-trip-profile py-2">
                                                            <span className="pl-1 pr-2"><img src={ownerRoom.ownerPicRoom} class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>
                                                            <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง : {ownerRoom.ownerRoomName}</span>
                                                        </div>
                                                        <div className="col-12 p-0">
                                                            <div className="row">
                                                                <div className="col-7 pr-0">
                                                                    <Link to={`/JoinRoom?roomID=${ownerRoom.roomID}`}>
                                                                        <PrimaryButton type="primary" block>เข้าสู่ห้อง</PrimaryButton>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-5">
                                                                    <LeaveButton onClick={() => onVisibleModal(ownerRoom.roomID)} block>
                                                                        <span className="h-100 d-flex align-items-center justify-content-center">ลบห้อง</span>
                                                                    </LeaveButton>
                                                                </div>
                                                                <DeleteModal
                                                                    isVisible={isVisible}
                                                                    setVisible={setVisible}
                                                                    roomID={deleteRoomID}
                                                                    lineID={lineID}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                    ขณะนี้ยังไม่มีห้องที่ท่านเป็นเจ้าของ
                                </h2>
                            }
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


export default MyOwnerRoom;