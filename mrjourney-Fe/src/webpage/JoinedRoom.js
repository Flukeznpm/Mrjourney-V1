import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import ShowMembers from '../components/JoinedRoom/ShowMembers';
import RoomDetails from '../components/JoinedRoom/RoomDetails';
import BgSlide1 from '../static/img/pr-01.png';

import FooterWebPage from '../components/Footer/FooterWebPage';



class JoinedRoom extends React.Component {
    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <div className="Nav-header">
                        <NavWebPage></NavWebPage>
                    </div>
                    <div className="content-page">
                        <div>
                            <img class="d-block w-100" src={BgSlide1} alt="First slide" />
                        </div>
                        <div className="Details-JoinedRoom">
                            <div className="container">
                                <div className="col-12">
                                    <div className="row">
                                        <RoomDetails></RoomDetails>
                                        <ShowMembers></ShowMembers>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttom-page">
                    <FooterWebPage></FooterWebPage>
                </div>
            </div>
        )
    }
}

export default JoinedRoom;


