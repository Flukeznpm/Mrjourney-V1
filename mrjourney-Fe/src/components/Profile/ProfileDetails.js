import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {
    Card,
    Row,
    Col,
    Tooltip,
    Typography,
    Button as AntButton,
} from 'antd';
import EditProfile from './EditProfile';

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
`;
const { Paragraph } = Typography;
const AntParagraph = styled(Paragraph)`
    border: 2px solid  #f7f7f7;
    border-radius: 8px;
    padding: 5px;
    .ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
         color: ${props => (props.theme.color.primary)};
    }
`;

const EditProfileButton = styled(AntButton)`
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        color: ${props => (props.theme.color.primary)};
    }
`

const LineNameText = styled.text`
    color: ${props => (props.theme.color.primary)};
`;

function ProfileDetails(props) {

    const handleBio = (value) => {
        let dataUpdateBio = {
            lineID: props.lineID,
            bio: value
        }
        axios.put('http://localhost:5000/accountProfile/editBio', dataUpdateBio)
            .then(async (res) => {
                console.log(res)
            })
        props.setEditBio(false)
    }

    const onEditProfile = () => {
        props.setEditProfile(!props.isEditProfile)
    }

    const calculateDate = (dob) => {
        var today = new Date();
        var birthDate = new Date(dob);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        console.log(age_now);
        return age_now;
    }
    return (
        <AntCard style={{ padding: 0 }}>
            <Row style={{ height: 150 }}>
                <Col span={12} className="text-center pt-3">
                    <img src={props.acc.pictureURL}
                        class="image_outer_container"
                        height="125px" width="125px"
                        alt="mrjourney-img" />
                    <div className="line-name" style={{ fontSize: "24px" }}>
                        คุณ <LineNameText>{props.acc.displayName}</LineNameText>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="personal-profile-details" >
                        {props.lineID === props.acc.lineID ?
                            <>
                                {props.isEditProfile === false ?
                                    <EditProfileButton type="link" icon={<EditOutlined />}
                                        style={{ marginLeft: "auto", marginRight: "0px" }}
                                        onClick={onEditProfile}
                                    />
                                    :
                                    null
                                }
                            </>
                            :
                            null
                        }
                        {props.isEditProfile === false ?
                            <div style={{ fontSize: "16px" }}>
                                <div className="detail">ชื่อ {props.acc.fName}</div>
                                <div className="detail">นามสกุล {props.acc.lName}</div>
                                <div className="detail">เพศ {props.acc.gender}</div>
                                <div className="detail">อายุ {calculateDate(props.acc.birthday)} ปี</div>
                            </div>
                            :
                            <EditProfile setEditProfile={props.setEditProfile} acc={props.acc}></EditProfile>
                        }
                    </div>
                </Col>
            </Row>
            <div className="Bio-page pt-4 mt-1 container">
                <Row>
                    <Col span={24}>
                        {props.lineID === props.acc.lineID ?
                            <>
                                <Tooltip title="ใส่ข้อมูลเพื่อแนะนำตัวเองเพิ่มเติม">
                                    Bio
                                </Tooltip>
                                <AntParagraph
                                    editable={{
                                        onChange: (handleBio),
                                        maxLength: 60,
                                        onStart: () => props.setEditBio(true)
                                    }}
                                >
                                    {props.acc.bio}
                                </AntParagraph>

                            </>
                            :
                            <>
                                <Tooltip title="ข้อมูลแนะนำตัวเองเพิ่มเติม">
                                    Bio
                                </Tooltip>
                                <AntParagraph
                                    copyable
                                >
                                    {props.acc.bio}
                                </AntParagraph>
                            </>
                        }
                    </Col>
                </Row>
            </div>
        </AntCard>
    )
}
export default ProfileDetails;