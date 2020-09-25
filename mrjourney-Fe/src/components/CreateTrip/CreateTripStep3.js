import React, { useContext, useEffect, useState } from 'react';
import '../../static/css/App.css';
import { Link } from 'react-router-dom';
import Logo from '../../static/img/success.png';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../../store/HookProvider'
import Stepper from '../components/Stepper';

function CreateTripStep3() {

    const [lineID, setLineID] = useState("")
    const [lineGroupID, setLineGroupID] = useState("Line_Group_001")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [dateOfTrip, setDateOfTrip] = useState("2020-09-29")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            this.props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
        }
    }, [])

    const getTripList = async () => {
        await axios.get(`http://localhost:5000/trip?lineGroupID=${lineGroupID}&lineID=${lineID}`)
            .then(res => {
                console.log('getTripList: ', res.data)
            });
    }

    const getTripPerDay = async () => {
        await axios.get(`http://localhost:5000/trip/tripperday?lineGroupID=${lineGroupID}&lineID=${lineID}&dateOfTrip=${dateOfTrip}`)
            .then(res => {
                console.log('getTripPerDay: ', res.data)
            });
    }

    return (
        <div className="top-page">
             <div className="container py-2 mt-3">
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

                                <div className="buttom-page py-3 mt-4">
                                    <div className="container py-3 text-center">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6 my-2">
                                                    {/* <Link to="/CheckTrip" style={{ textDecoration: "none" }}> */}
                                                    <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                        onClick={getTripList} >ดูแผนการเดินทางทั้งหมด</button>
                                                    <br />
                                                    <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                        onClick={getTripPerDay} >ดูแผนการเดินทางรายวัน</button>
                                                    {/* </Link> */}
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
                                        </div>

                                    </div>
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

