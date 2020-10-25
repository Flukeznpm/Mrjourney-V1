import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { HookContext } from '../../store/HookProvider'
import MoreRoomDetailModal from '../Modal/MoreRoomDetailModal';
import {
    Button as AntButton,
    Card, Col, Row,
    Tooltip,
    Input as AntInput,
    Select as AntSelect
} from 'antd';
import RoomBox from './RoomBox';

const { Search } = AntInput;
const SearchComponent = styled(Search)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active, &:focus {
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

function ShowRoomBox(props) {
    const { addModalShow, showRoomModalClose, showRoomModalShow, thaiprovince } = useContext(HookContext)
    const [data, setData] = useState([]);
    const [room, setShowRoom] = useState([{}])
    const [sortType, setSortType] = useState('recent');
    const [roomModal, setRoomModal] = useState({})
    const [accountJoinRoom, setAccountJoinRoom] = useState({})
    const [filterRoomID, setFilterRoomID] = useState(null)
    const [filterRoomProvince, setFilterRoomProvince] = useState(null)
    const { Option } = AntSelect;
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/room')
            .then(async res => {
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
                sortArray(sortType);
                isLoading(false)
            });
    }, [sortType])

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
                <Col lg={6} md={8} sm={18} xs={18} className="py-2">
                    <Row justify="center">
                        <SearchComponent
                            placeholder="ใส่รหัสประจำห้องเพื่อค้นหา"
                            onSearch={value => setFilterRoomID(value)}
                        />
                    </Row>
                </Col>
                <Col lg={6} md={8} sm={18} xs={18} className="py-2">
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
                <Col lg={6} md={8} sm={18} xs={18} className="py-2" >
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
                            <>
                                {room.roomID !== undefined ?
                                    <RoomBox room={room}
                                        setRoomModal={setRoomModal}
                                        showRoomModalShow={showRoomModalShow}
                                        setAccountJoinRoom={setAccountJoinRoom}
                                        acc={props.acc}
                                        loading={loading}
                                    />
                                    :
                                    null}
                            </>
                        )
                    })}
                <MoreRoomDetailModal
                    show={addModalShow}
                    onHide={() => showRoomModalClose()} //use for closeButton
                    room={roomModal}
                    acc={accountJoinRoom}
                ></MoreRoomDetailModal>
            </div>
        </div>

    )
}
export default ShowRoomBox;