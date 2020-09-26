import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import NavWebPage from '../components/Nav/NavWebPage';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import {
    Card,
    Row,
    Col,
    Tooltip,
    Button as AntButton,
} from 'antd';
import ProfileDetails from '../components/Profile/ProfileDetails';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;

function Profile(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])
    const [isEditProfile, setEditProfile] = useState(false)
    const [isEditBio, setEditBio] = useState(true);

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
        let getUserID = params.get('userID');

        axios.get(`https://mrjourney-senior.herokuapp.com/accountProfile?userID=${getUserID}`)
            .then(res => {
                setShowAcc(res.data)
            })
    }, [isEditProfile, isEditBio])

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />
                <div className="Profile-page py-4">
                    {acc.map((acc) => {
                        return (
                            <Row justify="center">
                                <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                                    <ProfileDetails acc={acc} lineID={lineID}
                                        isEditProfile={isEditProfile} setEditProfile={setEditProfile}
                                        isEditBio={isEditBio} setEditBio={setEditBio}
                                    ></ProfileDetails>
                                </Col>
                            </Row>
                        )
                    })}
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div >
    )
}
export default withRouter(Profile);