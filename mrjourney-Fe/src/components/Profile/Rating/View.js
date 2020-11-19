import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { EditOutlined } from '@ant-design/icons';
import {
    Card,
    Row, Col,
    Button as AntButton,
} from 'antd';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;

function View(props) {
    const [acc, setShowAcc] = useState([{}])
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [rating, setRating] = useState([{}])

    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getUserID = params.get('userID');
        axios.get(`${process.env.REACT_APP_FE_PATH}/trip/score?lineID=${getUserID}`)
            .then(res => {
                setRating(res.data)
            })
    }, [])

    return (
        <>
            {rating.map((rating) => {
                return (
                    <Row justify="space-between">
                        <Col span={6} className="text-center">
                            ความเพรียบพร้อม
                            <AntCard style={{ padding: 0 }}>
                                {(rating.preparationScore/rating.countOfSubmit).toFixed(2)}/5
                            </AntCard>
                        </Col>
                        <Col span={6} className="text-center">
                            ความคุ้มค่า
                            <AntCard style={{ padding: 0 }}>
                                {(rating.entertainmentScore/rating.countOfSubmit).toFixed(2)}/5
                            </AntCard>
                        </Col>
                        <Col span={6} className="text-center">
                            ความสนุก
                            <AntCard style={{ padding: 0 }}>
                                {(rating.worthinessScore/rating.countOfSubmit).toFixed(2)} /5
                            </AntCard>
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}
export default View;