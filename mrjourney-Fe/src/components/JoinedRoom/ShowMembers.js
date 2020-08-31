import React from 'react';
import '../../static/css/Joined-Room.css';
import "../../static/css/App.css";
import Logo from '../../static/img/logojourney.png';

function ShowMembers(props) {
    return (
        <div className="col-3 bg-showmember pt-3">
            <div className="Members-in-Room">
                <div className="container">
                    <h1>Members</h1>
                    <div className="showmembers-list">
                        <div class="showmember" >
                            <div class="row">
                                <div class="col-3">
                                <img src={Logo} class="image_outer_container" />
                                    {/* <img src={props.ownerMembers.pictureURL} class="image_outer_container" /> */}
                                </div>
                                <div class="col-9 mt-2">
                                    {/* {props.ownerMembers.fName} */}
                                    <i class="fas fa-crown text-warning float-right"></i>
                                </div>
                            </div>
                        </div>
                        <div class="showmember">
                            <div class="row">
                                <div class="col-3">
                                    <img src={props.members.pictureURL} class="image_outer_container" />
                                </div>
                                <div class="col-9 mt-2">
                                    {props.members.fName}
                                </div>
                            </div>
                        </div>
                        {/* <div class="showmember">
                            <div class="row">
                                <div class="col-3">
                                    <img src={Logo} class="image_outer_container" />
                                </div>
                                <div class="col-9 mt-2">
                                    nattapong
                            </div>
                            </div>
                        </div> */}
                    </div>


                </div>
            </div>
        </div>
    )
}
export default ShowMembers;