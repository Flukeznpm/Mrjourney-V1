import React from 'react';
import Logo from '../../static/img/navlogo.png';
import IconProfile from '../../static/img/logojourney.png';
import "../../static/css/App.css";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../../static/css/Nav.css'


// const NavWebPage = () => {
class NavWebPage extends React.Component {

    AlertRoom = () => {

        Swal.fire({
            title: 'อยากสร้างห้องงั้นหรอ?',
            text: 'Login ก่อนสิ!',
            showCancelButton: false,
            confirmButtonColor: '#F37945',
            confirmButtonText: 'Login'
        })
    }
    AlertTrip = () => {

        Swal.fire({
            title: 'อยากสร้างทริปงั้นหรอ?',
            text: 'Login ก่อนสิ!',
            showCancelButton: false,
            confirmButtonColor: '#F37945',
            confirmButtonText: 'Login'
        })
    }
    Alert = () => {
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



    constructor() {
        super();
        this.state = {
            showSearch: false,
            myacc: 'guest'
        }
    }
    OpenSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        })
    }
    AuthLine = async () => {
        if (this.state.myacc === 'guest') {
            await this.setState({ myacc: 'LineAcc' })
        } else {
            await this.setState({ myacc: 'guest' })
        }

    }
    ShowLoginButton = () => {
        if (this.state.myacc === 'guest') {
            return <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                <a className="dropdown-item" onClick={this.AuthLine}>Sign In</a></div>
        } else {
            return <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                <Link to="Profile">
                    <a className="dropdown-item ">My account</a>
                </Link>
                <Link to="JoinedRoom">
                    <a className="dropdown-item ">Joined Room</a>
                </Link>
                <Link to="MyOwnerRoom">
                    <a className="dropdown-item " href="#">My Owner Room</a>
                </Link>
                <div onClick={this.AuthLine}>
                    <a className="dropdown-item" >Sign Out</a>
                </div>
            </div>
        }
    }

    render() {

        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark nav-color" style={{ color: "white" }}>
                    <a href="/Home" className="navbar-brand">
                        <img src={Logo} height="45" alt="MrJourney" />
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Not acc */}
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mr-1">
                                <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => this.OpenSearch()}>Search</button>
                            </li>
                            <li className="nav-item mr-1">
                                {
                                    this.state.showSearch ? // state ? true : false
                                        <form className="form-inline">
                                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        </form>
                                        : null
                                }
                            </li>
                            <li className="nav-item mr-1">
                                
                                    <button type="button" className="btn btn-light ml-2 mr-2 text-dark round" onClick={this.AlertTrip}>Create Trip
                                <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                
                            </li>

                            <li className="nav-item ">
                                <button type="button" className="btn btn-light ml-2 mr-2 text-dark round" onClick={this.AlertRoom}>Create Room
                                <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                </button>
                            </li>

              
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user-circle fa-lg text-white"></i> <span className="text-white">Guest</span> </a>
                            
                            <this.ShowLoginButton></this.ShowLoginButton>
                            </li>

            


                        </ul>
                    </div>


                    {/* have acc */}
                    {/* <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mr-1 mt-1">
                                <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => this.OpenSearch()}>Search</button>
                            </li>
                            <li className="nav-item mr-1 mt-1">
                                {
                                    this.state.showSearch ? // state ? true : false
                                        <form className="form-inline">
                                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        </form>
                                        : null
                                }
                            </li>
                            <li className="nav-item mr-1 mt-1">
                                <Link to="/CreateTrip">
                                    <button type="button" className="btn btn-light ml-2 mr-2 text-dark round">Create Trip
                                <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </Link>
                            </li>

                            <li className="nav-item mt-1">
                                <Link to="/CreateJoinRoom">
                                    <button type="button" className="btn btn-light ml-2 mr-2 text-dark round">Create Room
                                <i className="fas fa-plus fa-sm ml-1" style={{ color: "dark" }}></i>
                                    </button>
                                </Link>
                            </li>



                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i> <img src={IconProfile} class="login-profile" height="32px" width="32px" alt="owner-img" /> </i>
                                    <span className="text-white mt-1">Name</span>
                                </a>
                                <this.ShowLoginButton></this.ShowLoginButton>

                            </li>


                        </ul>
                    </div> */}


                </nav>
            </div>






        )
    }
}
export default NavWebPage;
