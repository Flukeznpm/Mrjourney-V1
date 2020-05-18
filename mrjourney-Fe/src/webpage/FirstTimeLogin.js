import React from "react";
import '../static/css/Login.css'

class FirstTimeLogin extends React.Component {
    render() {
        return (
            <div className="LoginPage">
                <div className="d-flex justify-content-center">
                    <div className="Firstinfo-login ">
                        <form className="m-3" >
                           <h3 className="text-center">More information</h3>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter name" />
                            </div>

                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date" className="form-control" placeholder="Enter birthday" />


                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="female" value="female" checked />
                                    <label class="form-check-label" >
                                        หญิง
                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="male" value="male" checked />
                                    <label class="form-check-label">
                                        ชาย
                        </label>
                                </div>
                            </div>


                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" size="10" className="form-control" placeholder="Enter phone" />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input " id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">ยอมรับว่าข้อมูลข้างต้นเป็นจริงทุกประการ</label>
                                </div>
                            </div>

                            <button type="submit" className="btn firstLogin-btn btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default FirstTimeLogin;