import React from 'react';
// import '../css/App.css';

const FooterTripPage = (props) => {

    return (
        <div className="container py-3">
            <button type="button" class="btn btn-warning btn-lg btn-block text-white">{props.footertext}</button>
        </div>
    )

}
export default FooterTripPage;