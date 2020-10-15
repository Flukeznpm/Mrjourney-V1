import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import {
    Button as AntButton,
    Tooltip,
    Col, Row,
    Input as AntInput,
    Select as AntSelect,
    Progress, Typography
} from 'antd';
import { Link } from 'react-router-dom';
import momentjs from 'moment'

const ImgCover = styled.img`
    height: 100px;
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

const HisRoomCard = styled.div`
    cursor: pointer;
    a {
        color: #2b2b2b;
    }
`

function HistoryCard(props) {

    const [hisRoom, setHistoryRoom] = useState([{}])
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getUserID = params.get('userID');
        axios.get(`http://localhost:5000/accountProfile/RoomHistory?lineID=${getUserID}`)
            .then(res => {
                setHistoryRoom(res.data)
            })
    }, [])

    return (
        <Row gutter={18, 18}>
            {hisRoom.map((history) => {
                return (
                    <HisRoomCard>
                        <Link to={`/RoomHistoryJoin?roomID=${history.roomID}`}>
                            <Col lg={12} md={12} sm={24} xs={24} className="container py-2 d-flex justify-content-center">
                                <div class="card" style={{ width: "95%" }}>
                                    <ImgCover class="card-img-top" src={history.roomCover} alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title" style={{ fontWeight: "bold" }}>
                                            {history.roomName}
                                        </h5>
                                        <div class="card-text">
                                            จ. {history.province}
                                        </div>
                                        <div class="card-text py-2">
                                            <button
                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                {momentjs(history.startDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                                                &nbsp;-&nbsp;
                                                                <button
                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                {momentjs(history.endDate).format('ll')}                                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Link>
                    </HisRoomCard>
                )
            })}
        </Row>
    )
}
export default HistoryCard;