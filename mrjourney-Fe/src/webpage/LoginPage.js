import React from "react";
import '../static/css/Login.css'
import Logo from '../static/img/navlogo.png';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="LoginPage">
                <div className="col-12">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="Alert-Login col-4" style={{ marginTop: "12%" }}>
                            <div className="alert text-center" style={{ height: "400px", backgroundColor: "white", borderRadius: "20px" }}>
                                <span className="m-2">
                                    <h3 className="text">ยินดีต้อนรับเข้าสู่</h3>
                                    <p></p>
                                    <img src={Logo} height="110" alt="MrJourney" style={{ marginTop: "10px" }} />
                                    <p></p>
                                    <p></p>
                                    <div className="col-12" style={{ marginTop: "80px" }}>
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <button type="button" className="btn btn-lg roundLogin col-6">
                                                <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653975470&redirect_uri=https://mr-journey.com/Home&scope=profile%20openid%20email&state=KZKEMsjQOZM3uvnZ">
                                                    เข้าสู่ระบบ
                                                </a>
                                            </button>
                                            <div className="col-3"></div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div >
            </div >
        )
    }
}
export default LoginPage;