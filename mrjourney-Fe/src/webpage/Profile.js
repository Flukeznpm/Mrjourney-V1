import React, {useState} from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import ProfileImg from '../static/img/bg-slide-test-1.jpg';
import '../static/css/App.css';
import FooterWebPage from '../components/Footer/FooterWebPage';

import { Button, ButtonToolbar, Tabs, Tab } from 'react-bootstrap'
// import { Redirect, withRouter } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
// import cookie from 'react-cookies'

const ProfileMoreDetail = () => {
    const [key, setKey] = useState('home');
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Home">
                    sadass
        </Tab>
                <Tab eventKey="profile" title="Profile">
                    sfsafs
        </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    sfsaf
        </Tab>
            </Tabs>
        </div>
    )
}


class Profile extends React.Component {
  
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Linename: '',
    //         Linepicture: ''
    //     }
    // }

    // componentDidMount() {
    //     let loadJWT = cookie.load('jwt');
    //     console.log(loadJWT)
    //     if (loadJWT == undefined) {
    //         this.props.history.push('/Home');
    //     } else {
    //         var user = jwt.verify(loadJWT, 'secreatKey');
    //         this.setState({
    //             displayName: user.displayName,
    //             pictureURL: user.pictureURL,
    //             email: user.email,
    //         })
    //     }
    // }
    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <NavWebPage />
               
                <div className="content-page">
                    <div className="pt-5">
                        <div className="Profile-Details text-center">
                            <img src={ProfileImg} class="image_outer_container" height="200px" width="200px" alt="mrjourney-img"/>
                            <div className="line-name pt-2" style={{ fontSize: "32px" }}>คุณ : </div>
                            <div className="detail-web pt-2">
                                <span>ชื่อจริง : </span>
                                <p /><span>เพศ : </span>
                            </div>
                        </div>
                        <div className="container">
                            <div className="Profile-show-box mt-2" >
                                <ProfileMoreDetail></ProfileMoreDetail>
                                {/* <div className="bg-warning" style={{ width: "100%", height: "200px" }}> */}
                                {/* <div className="navbar">
                                        <div className="Bio-box">
                                            Bio
                                        </div>
                                        <div className="Bio-box">
                                            History Join Room
                                        </div>
                                        <div className="Bio-box">
                                            History Trip
                                        </div>
                                    </div>
                                    <div className="display-show-box">

                                    </div> */}
                                
                                {/* </div> */}

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
            </div>
        )
    }
}
export default Profile;