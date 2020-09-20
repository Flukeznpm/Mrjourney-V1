import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import "../../static/css/Show-Room.css";
import "../../static/css/Nav.css";
import "../../static/css/App.css";
import BgSlide1 from '../../static/img/pr-01.png';
import Logo from '../../static/img/logojourney.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import momentjs from 'moment'
import { HookContext } from '../../store/HookProvider'
import MoreRoomDetailModal from '../Modal/MoreRoomDetailModal';
import { Progress, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    Button as AntButton,
    Card, Col, Row,
    Tooltip,
    Input as AntInput,
    Select as AntSelect
} from 'antd';

const { Paragraph } = Typography;
const AntParagraph = styled(Paragraph)`
    font-size: 10px;
    .ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
        color: gray;
    }
    .ant-typography-copy-success, .ant-typography-copy-success:hover, .ant-typography-copy-success:focus {
        color: ${props => (props.theme.color.primary)};
    }
`
const PrimaryButton = styled(AntButton)`
    border-radius: 8px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const SeeButton = styled(AntButton)`
    font-size: 16px;
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primary)};
        color: ${props => (props.theme.color.primary)};
    }
`;

const { Search } = AntInput;
const SearchComponent = styled(Search)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active {
            border-color: rgb(230, 111, 15);
    }
    .ant-input {
        font-size: 16px;
    }
`;

const ImgCover = styled.img`
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

function ShowRoomBox() {
    const { addModalShow, showRoomModalClose, showRoomModalShow, thaiprovince } = useContext(HookContext)
    const [data, setData] = useState([]);
    const [room, setShowRoom] = useState([{}])
    const [sortType, setSortType] = useState('recent');
    const [roomModal, setRoomModal] = useState({})
    const [filterRoomID, setFilterRoomID] = useState(null)
    const [filterRoomProvince, setFilterRoomProvince] = useState(null)
    const { Option } = AntSelect;
    useEffect(() => {
        axios.get('http://localhost:5000/room')
            .then(async res => {
                // console.log('Data from /api/room : ' + res.data)
                // setShowRoom(res.data)

                const sortArray = type => {
                    const types = {
                        recent: 'recent',
                        maxMembers: 'maxMembers',
                        province: 'province',
                    };
                    const sortProperty = types[type];
                    const sorted = [...res.data].sort((a, b) => {
                        if (sortProperty === 'recent') {
                            return a - b;
                        } else if (sortProperty === 'province') {
                            return a.province.localeCompare(b.province);
                        } else if (sortProperty === 'maxMembers') {
                            return b.maxMember - a.maxMember;
                        }
                    });
                    setShowRoom(sorted);
                };
                console.log(res.data);
                sortArray(sortType);
            });

    }, [sortType])

    const AlertJoinWrongCondition = () => {

        Swal.fire({
            icon: 'error',
            title: 'ขออภัย!',
            text: 'เงื่อนไขไม่ตรงกับทางทริปที่กำหนด',
            showCancelButton: false,
            confirmButtonColor: '#D33',
            confirmButtonText: 'กลับสู่หน้าหลัก'
        })

    }

    const AlertJoinRoom = () => {
        if (this.state.myacc === 'guest') {
            Swal.fire({
                icon: 'success',
                title: 'เข้าร่วมสำเร็จ!',
                text: 'ขณะนี้คุณสามารถเข้าสู่ห้องเพื่อตรวจสอบรายละเอียดได้แล้ว',
                showCancelButton: true,
                confirmButtonText: 'เข้าสู่ห้อง',
                confirmButtonColor: '#31CC71',
                cancelButtonText: 'กลับสู่หน้าหลัก',
            })
        }
    }

    const AlertJoinRoomDontAcc = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คุณยังไม่ได้ Login!',
            text: 'กรุณาทำการ Login ก่อนทำรายการ',
            showCancelButton: true,
            confirmButtonText: 'Login',
            confirmButtonColor: '#F37945',
            cancelButtonText: 'กลับสู่หน้าหลัก',
        })
    }

    const AlertRoomDetails = () => {
        Swal.fire({
            imageUrl: "//static/img/logojourney.png",
            position: 'center',
            type: 'info',
            title: `Class Information`,
            input: 'date',
            html: `<div>
            <h1> HelloWorld </h1>
            <p> TestAlert </p>
            <p className="float-right">hahaha</p>
            <img src=${Logo} height="45" alt="MrJourney" />ผู้สร้าง 
            </div>`,
        })
    }

    const onFilterRoomID = (roomID) => {
        if (!filterRoomID) {
            return roomID
        } else {
            return filterRoomID
        }

    }

    const onFilterRoomProvince = (roomProvince) => {
        if (!filterRoomProvince) {
            return roomProvince
        } else {
            return filterRoomProvince
        }

    }

    return (
        <div className="container py-3">

            <Row justify="center" gutter={18}>
                <Col lg={6} sm={24}>
                    <Row justify="center">
                        <SearchComponent
                            placeholder="input search text"
                            onSearch={value => setFilterRoomID(value)}
                        />
                    </Row>
                </Col>
                <Col lg={6} sm={24} >
                    <Row justify="center">
                        <AntSelect
                            placeholder="เลือกจังหวัดที่ต้องการ"
                            style={{ width: "100%" }}
                            onChange={e => setFilterRoomProvince(e)}
                        >
                            <Option value="">แสดงทุกจังหวัด</Option>
                            {thaiprovince.map((ThaiProvinceShow) => {
                                return (
                                    <Option value={ThaiProvinceShow}>{ThaiProvinceShow}</Option>
                                )
                            })}
                        </AntSelect>
                    </Row>
                </Col>
                <Col lg={6} sm={24} >
                    <Row justify="center">
                        <AntSelect
                            defaultValue="recent"
                            onChange={e => setSortType(e)}
                            style={{ width: "100%" }}
                        >
                            <Option value="recent">ล่าสุด</Option>
                            <Option value="maxMembers">จำนวนที่เปิดรับ</Option>
                            <Option value="province">ชือจังหวัด</Option>
                        </AntSelect>
                    </Row>
                </Col>
            </Row>

            <div className="row">
                {room
                    .filter(room => room.roomID === onFilterRoomID(room.roomID))
                    .filter(room => room.province === onFilterRoomProvince(room.province))
                    .map((room, key) => {
                        return (
                            <div className="col-md-4 col-sm-12 d-flex justify-content-center py-3">
                                <div class="card" style={{ width: "18rem" }}>
                                    <ImgCover src={room.roomCover} alt="Card image cap" />
                                    <div class="card-body">
                                        <div class="card-text text-right p-0">
                                            <AntParagraph copyable>{room.roomID}</AntParagraph>
                                        </div>
                                        <h4 class="card-title">
                                            {room.roomName} &nbsp;
                                    </h4>
                                        <div class="card-text">
                                            จ. {room.province}
                                        </div>
                                        <div className="col-12 p-0">
                                            <div class="card-text row">
                                                <div className="col-9"><Progress percent={30} showInfo={false} /></div>
                                                <div className="col-3" style={{ fontSize: "12px", paddingTop: "4px" }}>
                                                    0/{room.maxMember}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-text py-2">
                                            <button
                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                {momentjs(room.startDate).format('ll')}
                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                                    &nbsp;-&nbsp;
                                                <button
                                                type="button" class="date-room-btn btn p-1 " style={{ fontSize: "12px" }}>
                                                {momentjs(room.endDate).format('ll')}
                                                <i class="far fa-calendar-alt ml-2 mr-1"></i>
                                            </button>
                                        </div>
                                        <div className="card-text py-2">
                                            {room.genderCondition === 'ชาย' ?
                                                <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                </span>
                                                :
                                                ""}
                                            {room.genderCondition === 'หญิง' ?
                                                <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                </span>
                                                :
                                                ""}
                                            {room.genderCondition === 'ไม่จำกัดเพศ' ?
                                                <span className="Show-genderCondition pl-2 pr-2" style={{ fontSize: "0.75rem" }}>
                                                    <i class="fas fa-user fa-lg ml-2 mb-0" style={{ color: "hotpink" }}></i>
                                                    <i class="fas fa-user fa-lg ml-2" style={{ color: "dodgerblue" }}></i>
                                                </span>
                                                :
                                                ""}
                                            <span className="mt-0 ml-2" style={{ fontSize: "12px" }}>
                                                อายุ &nbsp;{room.ageCondition}
                                            </span>
                                        </div>
                                        <div className="owner-trip-profile py-2">
                                            <span className="pl-1 pr-2"><img src={room.ownerPicRoom} class="image_outer_container" height="35px" width="35px" alt="owner-img" /></span>
                                            
                                            <span className="pl-1" style={{ fontSize: "13px" }}>ผู้สร้าง : <Link to={`/Profile?userID=${room.ownerRoomID}`}>{room.ownerRoomName}</Link></span>
                                            
                                        </div>
                                        <div class="col-12 p-0">
                                            <div class="row">
                                                <div class="col-9">
                                                    <PrimaryButton type="primary" onClick={AlertJoinWrongCondition} block>เข้าร่วม</PrimaryButton>
                                                </div>
                                                <div class="col-3 text-center">
                                                    <Tooltip title="ดูข้อมูลเพิ่มเติม">
                                                        <SeeButton
                                                            shape="circle"
                                                            onClick={() => {
                                                                setRoomModal(room)
                                                                showRoomModalShow()
                                                            }}
                                                            icon={<SearchOutlined />}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                <MoreRoomDetailModal
                    show={addModalShow}
                    onHide={() => showRoomModalClose()} //use for closeButton
                    room={roomModal}
                ></MoreRoomDetailModal>
            </div>
        </div>

    )
}
export default ShowRoomBox;