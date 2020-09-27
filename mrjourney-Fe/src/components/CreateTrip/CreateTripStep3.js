import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import '../../static/css/App.css';
import { Link } from 'react-router-dom';
import Logo from '../../static/img/success.png';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';
import {
    Button as AntButton,
    Card, Col, Row,
    Tooltip,
    Input as AntInput,
    Select as AntSelect
} from 'antd';


const PrimaryButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 18px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const SecondaryButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 18px;
    background: #D37C49;
    border: #D37C49;
    &:hover , &:active, &:focus {
        background: #D37C49;
        border: #D37C49;
    }
`;

const ThirdButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 18px;
    background: #C25738;
    border: #C25738;
    &:hover , &:active, &:focus {
        background: #C25738;
        border: #C25738;
    }
`;

function CreateTripStep3() {

    // const [lineID, setLineID] = useState("")
    // const [lineGroupID, setLineGroupID] = useState("Line_Group_001")
    // const [displayName, setDisplayName] = useState("")
    // const [pictureURL, setPictureURL] = useState("")
    // const [dateOfTrip, setDateOfTrip] = useState("2020-09-29")

    // useEffect(() => {
    //     let loadJWT = cookie.load('jwt');
    //     if (loadJWT === undefined) {
    //         // this.props.history.push('/Home');
    //     } else {
    //         var user = jwt.verify(loadJWT, 'secreatKey');
    //         setLineID(user.lineID)
    //         setDisplayName(user.displayName)
    //         setPictureURL(user.pictureURL)
    //     }
    // }, [])

    // const getTripList = async () => {
    //     await axios.get(`https://mrjourney-senior.herokuapp.com/trip?lineGroupID=${lineGroupID}&lineID=${lineID}`)
    //         .then(res => {
    //             console.log('getTripList: ', res.data)
    //         });
    // }

    // const getTripPerDay = async () => {
    //     await axios.get(`https://mrjourney-senior.herokuapp.com/trip/tripperday?lineGroupID=${lineGroupID}&lineID=${lineID}&dateOfTrip=${dateOfTrip}`)
    //         .then(res => {
    //             console.log('getTripPerDay: ', res.data)
    //         });
    // }

    return (
        <div className="top-page">
            <div className="pb-2">
                <Stepper typeStep="trip" step={3} />
            </div>

            <div className="content-page py-2">
                <div className="col-12">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="py-3">
                                <div className="text-center">
                                    <img src={Logo} height="75" width="75" alt="Success"></img>
                                    <h1 className="pt-2">เสร็จสิ้น!</h1>
                                    <h2>ขอให้คุณสนุกกับการเดินทาง</h2>
                                </div>

                                <div className="button-page py-3 mt-4">
                                    <Row className="py-2">
                                        <Col span={24}>
                                            <PrimaryButton
                                                type="primary"
                                                size={"large"}
                                                block htmlType="submit"
                                            >ดูแผนทั้งหมด</PrimaryButton>
                                        </Col>
                                    </Row>

                                    <Row className="py-2">
                                        <Col span={24}>
                                            <SecondaryButton
                                                type="primary"
                                                size={"large"}
                                                block htmlType="submit"
                                            >ดูแผนรายวัน</SecondaryButton>
                                        </Col>
                                    </Row>

                                    <Row className="py-2">
                                        <Col span={24}>
                                            <ThirdButton
                                                type="primary"
                                                size={"large"}
                                                block htmlType="submit"
                                            >กลับสู่ห้องแชท</ThirdButton>
                                        </Col>
                                    </Row>
                                    {/* <div className="col-12">
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6 my-2">
                                                    <Link to="/CheckTrip" style={{ textDecoration: "none" }}>
                                                    <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                        // onClick={getTripList} >ดูแผนการเดินทางทั้งหมด</button>
                                                        >ดูแผนการเดินทางทั้งหมด</button>
                                                    <br />
                                                    <button type="button" class="btn btn-warning btn-lg btn-block text-white"
<<<<<<< HEAD
                                                        // onClick={getTripPerDay} >ดูแผนการเดินทางรายวัน</button>
                                                        >ดูแผนการเดินทางรายวัน</button>
                                                    {/* </Link> */}
=======
                                                        onClick={getTripPerDay} >ดูแผนการเดินทางรายวัน</button>
                                                    </Link>
>>>>>>> develop
                                                </div>
                                                <div className="col-3"></div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6 my-2">
                                                    <Link to="/Home" style={{ textDecoration: "none" }}>
                                                        <button type="button" class="btn btn-warning btn-lg btn-block text-white">กลับสู่หน้าหลัก</button>
                                                    </Link>
                                                </div>
                                                <div className="col-3"></div>
                                            </div>
                                        </div> */}

                                </div>

                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>



            {/* <div className="buttom-page">
                    <Link to="/CreateTripPerDay" >
                        <FooterTripPage footertext={"ดูแผนการเดินทางทั้งหมด"}></FooterTripPage>
                    </Link>
                    <Link to="/CreateTripPerDay">
                        <div className="container py-3">
                            <button type="button" class="btn btn-outline-warning btn-lg btn-block">กลับสู่ห้องแชท</button>
                        </div>
                    </Link>

                </div> */}


            {/* SHOW ALL TRIP   */}
            {/* {this.state.trip.map((trip, key) => {
                    return (
                        <div id={key}>

                            <br />

                            TRIP ALL PER DAY 

                        </div>
                    )
                })} */}


        </div>
    )
}

export default withRouter(CreateTripStep3);

