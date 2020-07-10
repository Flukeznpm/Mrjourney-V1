import React, { useState, useEffect } from 'react';
import Logo from '../../static/img/navlogo.png';
import IconProfile from '../../static/img/logojourney.png';
import "../../static/css/App.css";
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import '../../static/css/Nav.css'
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function NavWebPage(props) {

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
    })

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
        props.history.push('/Home');
    }
    return (
        <div className="navbar-webpage">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "white" }}>
                <a href="/Home" className="navbar-brand">
                    <img src={Logo} height="45" alt="MrJourney" />
                </a>
                <button type="button" className="navbar-toggler " data-toggle="collapse" data-target="#navbarCollapse" style={{ color: "#2b2b2b", borderColor: "lightgrey" }}>
                    <i class="fas fa-hamburger" ></i>
                </button>

                {
                    displayName === "" ? // state ? true : false
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <button className="btn search-btn my-2 my-sm-0" onClick={() => setSearch(!showSearch)} style={{ height: "40px" }}>Search</button>
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1" >
                                    {
                                        showSearch ? // state ? true : false
                                            <form className="form-inline">
                                                <input className="form-control mr-sm-2"
                                                    type="search" placeholder="Search" aria-label="Search" style={{ height: "40px" }} />
                                            </form>
                                            : null
                                    }
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <button type="button" className="btn create-btn ml-2 mr-2 text-white" style={{ height: "40px" }}
                                        onClick={AlertTrip}>
                                        Create Trip
                                            <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </li>

                                <li className="nav-item mt-1 pt-1">
                                    <button type="button" className="btn create-btn ml-2 mr-2 text-white" style={{ height: "40px" }}
                                        onClick={AlertRoom}>
                                        Create Room
                                            <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </li>
                                <li className="nav-item dropdown ">
                                    <button className="btn nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">

                                        <i> <img src={IconProfile} class="login-profile" height="40px" width="40px" alt="owner-img" /> </i>
                                        <i class="fas fa-chevron-down fa-sm mt-1" style={{ color: "#585858" }}></i>

                                    </button>

                                    <div className="dropdown-menu dropdown-menu-right dropdown-info">
                                        <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=http://localhost:3000/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ"
                                            className="dropdown-item  a-dropdown">Sign in</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <button className="btn search-btn my-2 my-sm-0" onClick={() => setSearch(!showSearch)} style={{ height: "40px" }}>Search</button>
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1" >
                                    {
                                        showSearch ? // state ? true : false
                                            <form className="form-inline">
                                                <input className="form-control mr-sm-2"
                                                    type="search" placeholder="Search" aria-label="Search" style={{ height: "40px" }} />
                                            </form>
                                            : null
                                    }
                                </li>
                                <li className="nav-item mr-1 mt-1 pt-1">
                                    <Link to="/CreateTrip">
                                        <button type="button" className="btn create-btn ml-2 mr-2 text-white" style={{ height: "40px" }}>Create Trip
                                                 <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                        </button>
                                    </Link>
                                </li>

                                <li className="nav-item mt-1 pt-1">
                                    <Link to="/CreateJoinRoom">
                                        <button type="button" className="btn create-btn ml-2 mr-2 text-white" style={{ height: "40px" }}>Create Room
                                                 <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown ">
                                    <button className="btn nav-link dropdown-toggle profile-session" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i> <img src={pictureURL} class="login-profile" height="40px" width="40px" alt="owner-img" /> </i>
                                        <i class="fas fa-chevron-down fa-sm mt-1" style={{ color: "#585858" }}></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-info"
                                    >
                                        <div className="ml-1 mr-1 dropdown-show-profile px-2">
                                            <img src={pictureURL} class="login-profile" height="45px" width="45px" alt="owner-img" />
                                            <span className="btn ml-3 dropdown-profile-label">{displayName}</span>
                                        </div>
                                        <a href="/Profile" className="my-2 dropdown-item a-dropdown">
                                            <i class="fas fa-user-circle pr-1 fa-lg" /> My Profile
                                            </a>
                                        <a href="/Profile" className="my-2 dropdown-item a-dropdown">
                                            <i class="fas fa-door-open pr-1 fa-lg" /> Join Room
                                            </a>
                                        <a href="/Profile" className="my-2 dropdown-item a-dropdown">
                                            <i class="fas fa-house-user pr-1 fa-lg" /> Owner Room
                                            </a>
                                        <div className="my-2 dropdown-item signout-btn a-dropdown">
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
