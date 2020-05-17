import React from 'react';
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

class CreateTripStep3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trip: [],
            lineID: '',
            linename: '',
            linepicture: '',
            lineGroupID: ''
        }
    }

    componentDidMount() {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT == undefined) {
            this.props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            this.setState({
                linename: user.displayName,
                linepicture: user.pictureURL
            })
        }
    }

    checkTripList = async () => {
        let dataCheckTrip = {
            lineGroupID: this.state.lineGroupID,
            lineID: this.state.lineID,
        }
        await axios.get(`http://localhost:5000/trip?lineGroupID=${this.state.lineGroupID}&lineID=${this.state.lineID}`)
            .then(async checkTrip => {
                console.log('Data from API : ' + checkTrip.data)
                this.setState({
                    trip: checkTrip.data
                });
            });
        console.log('Data from State : ' + this.state.trip);
    }

    render() {
        return (
            <div>

                <div className="top-page">
                    <div className="step-progress step-3 mt-3 pt-2">
                        <ul>
                            <li>
                                <img src={LogoStep1} style={{ opacity: "20%" }} /><br />
                                <i class="fas fa-check"></i>
                                <p>สร้างแผน</p>
                            </li>
                            <li>
                                <img src={LogoStep2} style={{ opacity: '20%' }} /><br />
                                <i class="fas fa-check"></i>
                                <p>ระบุรายละเอียด</p>
                            </li>
                            <li>
                                <img src={LogoStep3} style={{ opacity: '80%' }} /><br />
                                <i class="fas fa-check"></i>
                                <p>เสร็จสิ้น</p>
                            </li>
                        </ul>
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
                                                            <Link to="/CheckTrip">
                                                                <button type="button" class="btn btn-warning btn-lg btn-block text-white"
                                                                    onClick={this.checkTripList.bind(this)}>ดูแผนการเดินทางทั้งหมด</button>
                                                            </Link>
                                                        </div>
                                                        <div className="col-3"></div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 my-2">
                                                            <Link to="/Home">
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
                {this.state.trip.map((trip, key) => {
                    return (
                        <div id={key}>

                            <br />

                            {/* TRIP ALL PER DAY  */}

                        </div>
                    )
                })}





            </div>
        )
    }
}

export default withRouter(CreateTripStep3);

