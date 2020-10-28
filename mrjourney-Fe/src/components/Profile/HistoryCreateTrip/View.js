import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { EditOutlined } from '@ant-design/icons';
import {
    Card,
    Row,
    Col,
    Tooltip,
    Typography,
    Button as AntButton,
} from 'antd';
import HistoryCard from './HistoryCard';

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
    }, [])

    return (
        <AntCard style={{ padding: 0 }}>
            <Row>
                <h4 style={{ fontWeight: "bold" }}>ทริปที่คุณเคยสร้าง</h4>
            </Row>
            {acc.map((acc) => {
                return (
                    <HistoryCard acc={props.acc} loading={props.loading} />
                )
            })}
        </AntCard>
    )
}
export default View;