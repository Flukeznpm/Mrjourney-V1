import React from 'react';
import ProfileImg from '../../static/img/bg-slide-test-1.jpg';

const RoomDetails = () =>{
    return(
        <div className="col-9">
        <div className="Room-details py-3">
            <div className="container">
                <h1>NameTrip</h1>
                <h3>จังหวัด : dasdsda</h3>
                <h1>NameTrip sdasdadasds</h1>
                <h3>จังหวัด</h3>
                <h3>วันที่เดินทาง</h3>
                <h3>เงื่อนไข : อายุ 18 ปี ขึ้นไป</h3>
                <div class="pt-4">
                    <label for="exampleInputEmail1">รายละเอียด<span className="p-1" style={{ color: "red" }}>*</span></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <h3>QrCode</h3>
                <div className="text-center">
                    <img src={ProfileImg} height="200px" width="200px" alt="QrCodeLineGroup" />
                </div>
            </div>
        </div>
    </div>
    )
}
export default RoomDetails;