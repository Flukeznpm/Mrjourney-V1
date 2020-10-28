import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import {
    Card,
    Skeleton,
    Col, Row,
} from 'antd';
import momentjs from 'moment'

const ImgCover = styled.img`
    height: 100px;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 2px;
  padding: 5px;
  .ant-card-body {
      padding: 5px;
  }
`;


function HistoryCard(props) {

    const [hisTrip, setHistoryTrip] = useState([{}])
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getUserID = params.get('userID');
        axios.get(`https://mrjourney-senior.herokuapp.com/accountProfile/tripHistory?lineID=${getUserID}`)
            .then(res => {
                setHistoryTrip(res.data)
            })
    }, [])
    if (props.loading) {
        return (
            <Row justify="center">
                <AntCard>
                    <Skeleton.Image style={{ width: "200px", height: "90px" }} />
                    <Skeleton paragraph={{ rows: 2 }} />
                </AntCard>
            </Row>
        )
    } else {
        return (
            <Row gutter={18, 18}>
                {hisTrip.map((history) => {
                    return (
                        <>
                            {
                                history.tripStatus === false ?
                                    <Col lg={12} md={12} sm={24} xs={24} className="container py-2 d-flex justify-content-center">
                                        <div class="card" style={{ width: "95%" }}>
                                            <ImgCover class="card-img-top" src='/img/pr-01.png' alt="Card image cap" />
                                            <div class="card-body">
                                                <h5 class="card-title" style={{ fontWeight: "bold" }}>
                                                    {history.tripName}
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
                                    :
                                    null
                            }
                        </>
                    )
                })}
            </Row>
        )
    }
}
export default HistoryCard;