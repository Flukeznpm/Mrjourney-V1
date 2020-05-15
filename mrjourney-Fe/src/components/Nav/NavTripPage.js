import React from 'react';
import Logo from '../../static/img/create-logo.png';

const NavTripPage = (props) => {

    return (
        <div className='Header'>
            <nav className="navbar navbar-light p-0 pt-3 pb-3 bg-warning text-white">
                <div className="container">
                    <div>
                        <p className='m-0'>{props.firsttitle}</p>
                        <h4>{props.secondtitle}</h4>
                    </div>
                    <img src={Logo} height="80px" className="d-inline-block align-top" />
                </div>
            </nav>

        </div>
    )
}
export default NavTripPage;
