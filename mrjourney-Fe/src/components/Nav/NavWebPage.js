import React, { useState, useEffect } from 'react';
import Logo from '../../static/img/MrJ-Logo.png';
import DropDownArrow from '../../static/img/dropdown.svg';
import IconProfile from '../../static/img/Guest-Logo.svg';
import "../../static/css/App.css";
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import '../../static/css/Nav.css'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function NavWebPage(props) {
    const [login, setLogin] = useState(false)
    const [showSearch, setSearch] = useState(false);
    const [displayName, setLineName] = useState("")
    const [pictureURL, setLinePicture] = useState("")
    const [email, setLineEmail] = useState("")

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            setLineName("")
            setLinePicture("")
            setLineEmail("")
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineName(user.displayName)
            setLinePicture(user.pictureURL)
            setLineEmail(user.email)
        }
    }, [login])

    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let code = params.get('code');
        let data = {
            code: code
        }
        if (code != null) {
            axios.post('http://localhost:5000/getToken', data).then((res) => {
                if (res.status === 202) {
                    cookie.save('jwt', res.data);
                    var decoded = jwt.verify(res.data, 'secreatKey');
                    Swal.fire({
                        title: 'คุณยังไม่เคยลงทะเบียน!',
                        text: 'กรุณาลงทะเบียนเพื่อเข้าใช้เว็บไซต์',
                        confirmButtonText: '<a href="/FirstTimeLogin" id="alert-confirm-button">ลงทะเบียน</a>',
                        confirmButtonColor: '#F37945',
                    })
                } else {
                    cookie.save('jwt', res.data);
                    var decoded = jwt.verify(res.data, 'secreatKey');
                    // console.log('decode', decoded);
                    setLogin(true)
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [])

    const AlertRoom = () => {

        Swal.fire({
            title: 'อยากสร้างห้องงั้นหรอ?',
            text: 'Login ก่อนสิ!',
            showCancelButton: false,
            confirmButtonColor: '#F37945',
            confirmButtonText: '<a href ="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=http://localhost:3000/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ" id="alert-confirm-button">Login</a>'
        })
    }

    const AlertTrip = () => {

        Swal.fire({
            title: 'อยากสร้างทริปงั้นหรอ?',
            text: 'Login ก่อนสิ!',
            showCancelButton: false,
            confirmButtonColor: '#F37945',
            confirmButtonText: '<a href ="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=http://localhost:3000/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ" id="alert-confirm-button">Login</a>'
        })
    }

    const Alert = () => {
        Swal.fire({
            icon: "success",
            title: 'สร้างห้องสำเร็จ',
            text: 'ขอให้คุณสนุกกับการท่องเที่ยวนะ',
            showCancelButton: true,
            confirmButtonColor: '#31CC71',
            confirmButtonText: 'เข้าสู่ห้อง',
            cancelButtonText: 'กลับสู่หน้าหลัก',
        })
    }

    const onLogout = () => {
        cookie.remove('jwt');
        setLogin(false)
        props.history.push('/Home');
    }

    return (
        <div className="navbar-webpage">
            <nav className="navbar nav-color navbar-expand-lg navbar-dark" style={{ color: "white" }}>
                <a href="/Home">
                    <img src={Logo} className="WebLogo" height="45" alt="MrJourney" />
                </a>
                <button type="button" className="navbar-toggler " data-toggle="collapse" data-target="#navbarCollapse" style={{ color: "#2b2b2b", borderColor: "lightgrey" }}>
                    <i class="fas fa-hamburger" ></i>
                </button>

                {
                    displayName === "" ? // state ? true : false
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item pt-1 mr-1">
                                    <a href="/Home">
                                        <button type="button" className="btn nav-text-btn ml-2 mr-2" style={{ height: "40px" }}>
                                            Home
                                    </button>
                                    </a>
                                </li>
                                <li className="nav-item pt-1 mr-1">
                                    <button type="button" className="btn nav-text-btn ml-2 mr-2" style={{ height: "40px" }}>
                                        About Us
                                    </button>
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <button type="button" className="btn create-btn round ml-2 mr-2 text-white" style={{ height: "40px" }}
                                        onClick={AlertTrip}>
                                        Create Trip
                                            <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </li>

                                <li className="nav-item mt-1 pt-1">
                                    <button type="button" className="btn create-btn round ml-2 mr-2 text-white" style={{ height: "40px" }}
                                        onClick={AlertRoom}>
                                        Create Room
                                            <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </li>
                                <li className="nav-item dropdown ml-3 px-2 ">
                                    <button className="btn nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">

                                        <i> <img src={IconProfile} class="login-profile" height="40px" width="30px" alt="owner-img" /> </i>
                                        <img src={DropDownArrow} className="DropDownArrow pt-1 ml-2" height="13" alt="MrJourney" />

                                    </button>

                                    <div className="dropdown-menu dropdown-menu-right dropdown-info">
                                        <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=http://localhost:3000/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ"
                                            className="dropdown-item a-dropdown">Sign in</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item pt-1 mr-1">
                                    <a href="/Home">
                                        <button type="button" className="btn nav-text-btn ml-2 mr-2" style={{ height: "40px" }}>
                                            Home
                                    </button>
                                    </a>
                                </li>
                                <li className="nav-item pt-1 mr-1">
                                    <button type="button" className="btn nav-text-btn ml-2 mr-2" style={{ height: "40px" }}>
                                        About Us
                                    </button>
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <Link to="/CreateTrip">
                                        <button type="button" className="btn create-btn round ml-2 mr-2 text-white" style={{ height: "40px" }}>Create Trip
                                                 <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                        </button>
                                    </Link>
                                </li>

                                <li className="nav-item mt-1 pt-1">
                                    <Link to="/CreateJoinRoom">
                                        <button type="button" className="btn create-btn round ml-2 mr-2 text-white" style={{ height: "40px" }}>Create Room
                                                 <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown ml-3 px-2 ">
                                    <button className="btn nav-link dropdown-toggle profile-session" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i> <img src={pictureURL} class="login-profile" height="40px" width="40px" alt="owner-img" /> </i>
                                        <img src={DropDownArrow} className="DropDownArrow pt-1 ml-2" height="13" alt="MrJourney" />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-info"
                                    >
                                        <div className=" dropdown-show-profile px-2">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-3 p-0 m-0"><img src={pictureURL} class="login-profile" height="50px" width="50px" alt="owner-img" /></div>
                                                    <div className="col-9 p-0 m-0 btn dropdown-profile-label">
                                                        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Hi! {displayName}</div>
                                                        <a href="/Profile" className="dropdown-see-profile">ดูโปรไฟล์ของฉัน</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="/AllMyOwnerRoom" className="my-2 dropdown-item a-dropdown">
                                            <i class="fas fa-house-user pr-1 fa-lg" /> Owner Room
                                            </a>
                                        <a href="/AllMyJoinedRoom" className="my-2 dropdown-item a-dropdown">
                                            <i class="fas fa-door-open pr-1 fa-lg" /> Join Room
                                            </a>
                                        <div className="my-2 dropdown-item signout-btn a-dropdown" style={{ color: "#C25738" }}>
                                            <a onClick={onLogout}>
                                                <i class="fas fa-sign-out-alt pr-1 fa-lg" /> Sign Out
                                                </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                }
            </nav>
        </div >
    )
}
export default withRouter(NavWebPage);
