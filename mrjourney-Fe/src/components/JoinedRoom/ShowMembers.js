import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import '../../static/css/Joined-Room.css';
import "../../static/css/App.css";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import {
    Card,
    Row,
    Col
} from 'antd';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  /* margin: 10px 0px 10px 0px; */
  padding: 15px 0px 15px 0px;
  height: 100%;
`;

function ShowMembers(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [members, setMember] = useState([{}])

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
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getRoomID = params.get('roomID');

        axios.get(`http://localhost:5000/room/members?roomID=${getRoomID}`)
            .then(res => {
                setMember(res.data)
            })
    }, [])

    return (
        <div className="col-lg-3 col-sm-12 my-3">
            <AntCard style={{ padding: 0, fontSize: "18px", fontWeight: "bold" }}>
                สมาชิก
                    <div className="showmembers-list">
                    <div class="showmember" >
                        {members.map((members, key) => {
                            return (
                                <Row className="d-flex h-100 align-items-center py-3">
                                    <Col span={8}>
                                        <img src={members.pictureURL} class="image_outer_container" />
                                    </Col>
                                    <Col span={16}>
                                        <Row justify="space-between">
                                            {members.fName}
                                            {key === 0 ? <i class="fas fa-crown text-warning" /> : null}
                                        </Row>
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </div>
            </AntCard>
        </div >
    )
}
export default ShowMembers;