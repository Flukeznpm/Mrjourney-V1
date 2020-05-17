import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import CarouselHeader from '../components/Home/CarouselHeader';
import ShowMembers from '../components/JoinedRoom/ShowMembers';
import RoomDetails from '../components/JoinedRoom/RoomDetails';

class JoinedRoom extends React.Component {
    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <div className="Nav-header">
                        <NavWebPage></NavWebPage>
                    </div>
                    <div className="content-page">
                        <div className="Carousel-Header">
                            <CarouselHeader></CarouselHeader>
                        </div>
                        <div className="Details-JoinedRoom">
                            <div className="col-12">
                                <div className="row">
                                    <RoomDetails></RoomDetails>
                                    <ShowMembers></ShowMembers>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttom-page">
                </div>
            </div>
        )
    }
}

export default JoinedRoom;


