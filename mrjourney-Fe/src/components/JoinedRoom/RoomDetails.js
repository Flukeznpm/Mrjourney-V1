import React, { useEffect, useState } from 'react';
import TestQrCode from '../../static/img/Mrjourney-QrCode.png';
import momentjs from 'moment'
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function RoomDetails(props) {

    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [roomDetail, setShowRoomDetail] = useState([{}])

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        console.log(loadJWT)
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        axios.get(`http://localhost:5000/room/roomDetail?roomID=${props.roomID}`)
            .then(res => {
                setShowRoomDetail(res.data)
            })
    }, [])

    const onSubmit = async () => {
        let dataUpdateRoom = {
            // roomID: roomID,
            // ownerRoom: ownerRoom,
            // lineID: lineID,
            // roomName: roomName,
            // province: province,
            // startDate: startDate,
            // endDate: endDate,
            // maxMember: maxMember,
            // genderCondition: genderCondition,
            // ageCondition: ageCondition,
            // roomStatus: roomStatus
        }
        await axios.put('http://localhost:5000/room/editRoom', dataUpdateRoom)
            .then(async (res) => {
                console.log(res)
            })
    }

    const AlertCloseRoom = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่ที่จะต้องการปิดห้อง?',
            text: 'เมื่อทำการปิดห้อง จะทำให้ไม่สามารถรับสมาชิกเพิ่มได้',
            showCancelButton: true,
            confirmButtonText: 'ปิดห้อง',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่ห้อง',
        })
    }

    return (
        <div className="col-9">
            <div className="Room-details py-3">
                <div className="container">
                    <div className="ShowRoom-TripName py-1" style={{ fontSize: "30px" }}>
                        ชื่อทริป : เชียงใหม่ GoGoGo
                    </div>
                    <div style={{ fontSize: "18px" }}>
                        <div className="ShowRoom-TripProvince py-1">
                            <span className="pr-2"> จังหวัด </span>
                            <button
                                type="button" class="show-details-btn btn p-1 ">
                                เชียงใหม่
                                 </button>
                        </div>
                        <div className="ShowRoom-Date py-1 ">
                            วันเริ่ม - จบทริป
                                                <div className="py-2">
                                <span className="Show-Date pl-3 pr-3 ">
                                    <button
                                        type="button" class="show-details-btn btn p-1 ">
                                        {momentjs('2020-05-05').format('DD/MM/YYYY')}
                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                    </button>
                                    <span className="pl-2 p-2">-</span>
                                    <button
                                        type="button" class="show-details-btn btn p-1">
                                        {momentjs('2020-05-08').format('DD/MM/YYYY')}
                                        <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="ShowRoom-Condition py-1">
                            เงื่อนไข
                         <div className="py-2">
                                <span className="Show-genderCondition pl-2 pr-2">
                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                </span>
                                <span className="Show-ageCondition pl-2">
                                    <span className="pr-2"> อายุ </span>
                                    <button
                                        type="button" class="show-details-btn btn p-1 ">
                                        ไม่จำกัดช่วงอายุ
                                        </button>
                                </span>
                            </div>
                        </div>
                        <div class="pt-4">
                            <label for="exampleInputEmail1">รายละเอียด</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            />
                        </div>
                        <div className="ShowRoom-QrCode py-1">
                            QrCode
                                <div className=" text-center">
                                <img src={TestQrCode} alt="QrCode" width="150" height="150" />
                            </div>
                        </div>
                    </div>
                    <div className="container text-center py-3">
                        <button type="button" className="btn btn-warning mr-3 text-white">แก้ไขห้อง</button>
                        <button type="button" className="btn btn-warning ml-3 text-white" onClick={AlertCloseRoom}>ปิดห้อง</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;