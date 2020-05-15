import React from 'react';

import '../../static/css/Joined-Room.css';
import "../../static/css/App.css";
import Logo from '../../static/img/logojourney.png';

const ShowMembers = () =>{
    return(
        <div className="col-3 bg-showmember pt-3">
        <div className="Members-in-Room"> 
            <div className="container">
                <h1>Member</h1>
                <p><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></p>
                <p><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></p>
                <p><img src={Logo} class="image_outer_container" height="30px" width="30px" alt="owner-img" /></p>
            </div>
        </div>
    </div>
    )
}
export default ShowMembers;