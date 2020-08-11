import React, { useContext, useEffect, useState } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import ProfileImg from '../static/img/bg-slide-test-1.jpg';
import '../static/css/App.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { Tabs, Tab } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import momentjs from 'moment'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function Profile(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        axios.get(`http://localhost:5000/accountProfile?lineID=${user.lineID}`)
            .then(res => {
                console.log('axios data:' + res.data)
                setShowAcc(res.data)
                console.log('acc', acc)
            })
    }, [])


    const ProfileMoreDetail = () => {
        const [key, setKey] = useState('Bio');
        return (
            <div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}>
                    <Tab eventKey="Bio" title="Bio">Welcome to MyProfile</Tab>
                    <Tab eventKey="HisRoom" title="History Room">ShowRoom</Tab>
                    <Tab eventKey="HisTrip" title="History Trip">ShowTrip</Tab>
                </Tabs>
            </div>
        )
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />

                <div className="content-page">
                    <div className="pt-5">
                        <div className="Profile-Details text-center">
                            <img src={pictureURL} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                            <div className="line-name pt-2" style={{ fontSize: "28px" }}>คุณ : {displayName}</div>
                            <div className="detail-web pt-2">
                                {acc.map((acc) => {
                                    return (
                                        <>
                                            < span > ชื่อ : {acc.fName} </span>
                                            < span > นามสกุล : {acc.lName} </span>
                                            <p /><span>เพศ : {acc.gender}</span>
                                            <p /><span>วันเกิด : {momentjs(acc.birthday).format('ll')}</span>
                                            <p /><span>เบอร์โทรศัพท์ : {acc.tel}</span>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="container">
                            <div className="Profile-show-box mt-2" >
                                <ProfileMoreDetail></ProfileMoreDetail>
                            </div>
                            <div className="Profile-score py-2 mt-5">
                                <div className="container">
                                    <div className="text-left pl-3">คะแนน</div><p />
                                    <div className="row text-center">
                                        <div className="col-4">
                                            <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                            <div className="pt-2">ความสนุก</div>
                                        </div>
                                        <div className="col-4">
                                            <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                            <div className="pt-2">ความคุ้มค่า</div>
                                        </div>
                                        <div className="col-4">
                                            <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img" />
                                            <div className="pt-2">การจัดการแผน</div>
                                        </div>
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
        </div >
    )
}
export default withRouter(Profile);