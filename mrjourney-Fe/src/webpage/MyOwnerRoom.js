import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import CarouselHeader from '../components/Home/CarouselHeader';
import ShowRoomBox from '../components/Home/ShowRoomBox';
import '../static/css/Show-Room.css';
import "../static/css/Nav.css";
import "../static/css/App.css";
import BgSlide1 from '../static/img/pr-01.png';
import Logo from '../static/img/logojourney.png';
import FooterWebPage from '../components/Footer/FooterWebPage';



class Home extends React.Component {
    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <NavWebPage />

                    <div className="content-page">
                        <div className="Carousel-Header">
                            <CarouselHeader></CarouselHeader>
                        </div>
                        <div className="show-owner-room">
                            <div className="col-4">
                                <div className="col">
                                    {/* <img src={Logo} height="45" alt="MrJourney" /> */}
                                    <div class="alert box-room show-box">
                                        <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                                        <div class="box-room-details show-box mt-2">
                                            <div className="mt-3 mr-3 ml-3 mb-0">
                                                <h3 className="py-1">Let'Go Chonburi !</h3>
                                                <span className="py-1" style={{ fontSize: "14px" }}>จ. เชียงใหม่ </span>
                                                <br /><span className="py-1" style={{ fontSize: "14px" }}>วันที่ 14/02/2563-15/02/2563 </span>
                                                <p />
                                                <div className="text-left">
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                    <br /><span className="mt-0 ml-2" style={{ fontSize: "8px" }}>อายุ 20 ปีขึ้นไป</span>
                                                </div>
                                            </div>
                                            <div className="text-center pt-2 pb-2">
                                                <span className="pr-1">
                                                    <button type="button" class="btn nav-color-owner round2" >ลบ</button>
                                                </span>
                                                <span className="pl-1">
                                                    <button type="button" class="btn nav-color text-white round2" >แก้ไข</button>
                                                </span>
                                                
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

export default Home;