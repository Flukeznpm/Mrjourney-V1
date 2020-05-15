import React, { useState } from 'react';
import '../../static/css/App.css';
import '../../static/css/Stepper.css';
import LogoStep1 from '../../static/img/LogoStep1.png'
import LogoStep2 from '../../static/img/LogoStep2.png'
import LogoStep3 from '../../static/img/LogoStep3.png'

const InputAddDate = () => {
    const [dateNum, setDateNum] = useState(0);
    return (

        <div className="col pt-4">
            <label htmlFor="example-date-input">จำนวนวัน<span className="p-1" style={{ color: "red" }}>*</span></label>
            <div className="input-group">

                <span className="input-group-btn">
                    <button type="button" className="btn btn-default btn-number" data-type="minus" data-field="quant[1]"
                        onClick={() => { setDateNum(dateNum - 1) }}>
                        <span className="fas fa-minus"></span>
                    </button>
                </span>

                <input type="text" name="quant[1]" className="form-control input-number" value={dateNum} min="1" max="10" />

                <span className="input-group-btn">
                    <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1]"
                        onClick={() => { setDateNum(dateNum + 1) }}>
                        <span className="fas fa-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>
        </div>
    )
}

class CreateTripStep1 extends React.Component {

    constructor() {
        super()
        this.state = {
            thaiprovince: [
                'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
                'ขอบแก่น',
                'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
                'ตรัง', 'ตราด', 'ตาก',
                'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราข', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
                'บึงกาฬ', 'บุรีรัมย์',
                'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
                'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา',
                'ภูเก็ต',
                'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
                'ยะลา', 'ยโสธร',
                'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
                'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
                'ศรีสะเกษ',
                'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
                'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ']

        }
    }

    render() {

        return (
            <div >

                <div className="top-page">
                    {/* <NavTripPage firsttitle={"ยินดีต้อนรับ"} secondtitle={"เริ่มสร้างแผนการท่องเที่ยว"} ></NavTripPage> */}

                    <div className=" container content-page py-2">

                        <div className="step-progress step-1 mt-3 pt-2" >
                            <ul>
                                <li>
                                    <img src={LogoStep1} style={{ opacity: "80%" }} /><br />
                                    <i class="fas fa-sync-alt"></i>
                                    <p>สร้างแผน</p>
                                </li>
                                <li>
                                    <img src={LogoStep2} style={{ opacity: '20%' }} /><br />
                                    {/* <i class="fas fa-sync-alt"></i> */}
                                    <i class="fas fa-times"></i>
                                    <p>ระบุรายละเอียด</p>
                                </li>
                                <li>
                                    <img src={LogoStep3} style={{ opacity: '20%' }} /><br />
                                    <i class="fas fa-times"></i>
                                    <p>เสร็จสิ้น</p>
                                </li>
                            </ul>
                        </div>

                        <div className="py-3">

                            <form>
                                <div className="form-group">

                                    <div className="InputFrom">
                                        <div className="">
                                            <label htmlFor="exampleInputEmail1">ชื่อทริป<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <input type='text' className="form-control"
                                                name="demoTripName"
                                                value={this.props.TripForm.demoTripName}
                                                onChange={(e) => this.props.handleForm(e)}
                                                placeholder="ใส่ชื่อทริปท่องเที่ยว" />
                                        </div>
                                    </div>

                                    <div className="InputFrom">
                                        <div className="pt-4">
                                            <label htmlFor="exampleInputEmail1" >จังหวัด<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <div className="btn-group pl-5">
                                                <select className=" btn province-btn dropdown-toggle"
                                                    name="demoProvince"
                                                    value={this.props.TripForm.demoProvince}
                                                    onChange={(e) => this.props.handleForm(e)}
                                                    id="dropdownMenuButton">
                                                    {this.state.thaiprovince.map((ThaiProvinceShow) => {
                                                        return (
                                                            <option value={ThaiProvinceShow}>{ThaiProvinceShow}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="InputFrom">
                                        <div className="pt-4">
                                            <label htmlFor="exampleInputEmail1">เลือกวันเริ่มเดินทาง<span className="p-1" style={{ color: "red" }}>*</span></label>
                                            <input type='date' className="form-control"
                                                name="demoDate"
                                                value={this.props.TripForm.demoDate}
                                                onChange={(e) => this.props.handleForm(e)} />
                                        </div>
                                    </div>
                                    {/* <InputAddDate></InputAddDate> */}


                                    <div className="col pt-4">
                                        <label htmlFor="example-date-input">จำนวนวัน<span className="p-1" style={{ color: "red" }}>*</span></label>
                                        <div className="input-group">

                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-default btn-number" 
                                                    onClick={this.props.handleFormRemoveDate}>
                                                    <span className="fas fa-minus"></span>
                                                </button>
                                            </span>

                                            <input type="text" name="numberAddDate" className="form-control input-number" value={this.props.TripForm.numberAddDate} min="1" max="10" />

                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-default btn-number" 
                                                    onClick={this.props.handleFormAddDate}>
                                                    <span className="fas fa-plus" aria-hidden="true"></span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>



                                </div>


                                <div className="buttom-page py-3">
                                    <div className="py-3" style={{ marginBottom: "25px", marginTop: "20px" }}>
                                        {/* <div className=" col-2 float-right "> */}
                                        <div className="next-btn">
                                            <button type="button" className="btn btn-warning btn-lg btn-block text-white"
                                                onClick={this.props.handleStep}>{this.props.nextButton}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateTripStep1;


