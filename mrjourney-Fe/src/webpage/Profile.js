import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import NavWebPage from '../components/Nav/NavWebPage';
import ProfileImg from '../static/img/bg-slide-test-1.jpg';
import '../static/css/App.css';
import '../static/css/Profile.css';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { withRouter } from 'react-router-dom';
import { HookContext } from '../store/HookProvider';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import momentjs from 'moment'
import ProfileMoreDetails from '../components/Profile/ProfileMoreDetails';
import { EditOutlined } from '@ant-design/icons';
import {
    Card,
    Row,
    Col,
    Tooltip,
    Typography,
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Switch
} from 'antd';

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
const InputComponent = styled(AntInput)`
    border-radius: 4px;
    align-items: center;
    &:hover , &:active {
        border-color: ${props => (props.theme.color.primary)};
    }
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

const EditProfileButton = styled(AntButton)`
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active {
        color: ${props => (props.theme.color.primary)};
    }
`

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
`;

const LineNameText = styled.text`
    color: ${props => (props.theme.color.primary)};
`;

function Profile(props) {
    const { AccProfile, handleAccProfileForm } = useContext(HookContext)
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])
    const [gender, selectGender] = useState(["ชาย", "หญิง"])
    const [isEditProfile, setEditProfile] = useState(false)
    const [isEditBio, setEditBio] = useState(false);
    const [defaultBio, setDefaultBio] = useState("")
    const { Option } = AntSelect;
    const dateFormat = 'DD-MM-YYYY';

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getUserID = params.get('userID');

        axios.get(`http://localhost:5000/accountProfile?userID=${getUserID}`)
            .then(res => {
                setShowAcc(res.data)
            })
    }, [])

    const handleBio = (value) => {
        let dataUpdateBio = {
            lineID: lineID,
            bio: value
        }
        axios.put('http://localhost:5000/accountProfile/editBio', dataUpdateBio)
            .then(async (res) => {
                console.log(res)
            })
        setEditBio(false)
    }

    const onEditProfile = () => {
        setEditProfile(!isEditProfile)
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

    const onFinish = async (value) => {
        let dataUpdateProfile = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            fName: value.fName,
            lName: value.lName,
            gender: value.gender,
            birthday: value.birthday,
        }
        await axios.put('http://localhost:5000/accountProfile/editAccountDetail', dataUpdateProfile)
            .then(async (res) => {
                console.log(res)
            })
        setEditProfile(false)
    };
    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage />
                <div className="Profile-page py-4">
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard style={{ padding: 0 }}>
                                <Row style={{ height: 150 }}>
                                    <Col span={12} className="text-center pt-3">
                                        {acc.map((acc) => {
                                            return (
                                                <>
                                                    <img src={acc.pictureURL}
                                                        class="image_outer_container"
                                                        height="125px" width="125px"
                                                        alt="mrjourney-img" />
                                                    <div className="line-name" style={{ fontSize: "24px" }}>
                                                        คุณ <LineNameText>{acc.displayName}</LineNameText>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </Col>
                                    <Col span={12}>
                                        <div className="personal-profile-details" >
                                            {isEditProfile === false ?
                                                <EditProfileButton type="link" icon={<EditOutlined />}
                                                    style={{ marginLeft: "auto", marginRight: "0px" }}
                                                    onClick={onEditProfile}
                                                />
                                                :
                                                null
                                            }
                                            {acc.map((acc) => {
                                                return (
                                                    <>
                                                        {isEditProfile === false ?
                                                            <div style={{ fontSize: "16px" }}>
                                                                <div className="detail">ชื่อ {acc.fName}</div>
                                                                <div className="detail">นามสกุล {acc.lName}</div>
                                                                <div className="detail">เพศ {acc.gender}</div>
                                                                <div className="detail">อายุ {calculateDate(acc.birthday)} ปี</div>
                                                            </div>
                                                            :
                                                            <div className="pt-4">
                                                                <AntForm onFinish={onFinish}>
                                                                    <AntFormItem name="fName">
                                                                        <InputComponent size="small" placeholder="กรอกชื่อของคุณ" />
                                                                    </AntFormItem>
                                                                    <AntFormItem name="lName">
                                                                        <InputComponent size="small" placeholder="กรอกนามสกุลของคุณ" />
                                                                    </AntFormItem>
                                                                    <AntFormItem name="gender" className="edit-profile">
                                                                        <AntSelect
                                                                            placeholder="เพศของคุณ"
                                                                            size="small"
                                                                        >
                                                                            {gender.map((ShowGender) => {
                                                                                return (
                                                                                    <Option value={ShowGender}>{ShowGender}</Option>
                                                                                )
                                                                            })}
                                                                        </AntSelect>
                                                                    </AntFormItem>
                                                                    <AntFormItem name="birthday">
                                                                        <DatePicker size="small" style={{ width: "100%" }}
                                                                            format={dateFormat} />
                                                                    </AntFormItem>
                                                                    <AntForm.Item>
                                                                        <div className="col-12">
                                                                            <div className="row">
                                                                                <div className="col-6">
                                                                                    <OutlineButton size={"small"} block htmlType="submit"
                                                                                        onClick={() => setEditProfile(false)}>ยกเลิก</OutlineButton>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <PrimaryButton type="primary" size={"small"} block htmlType="submit">ยืนยัน</PrimaryButton>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </AntForm.Item>
                                                                </AntForm>
                                                            </div>
                                                        }
                                                    </>
                                                )
                                            }
                                            )}

                                        </div>
                                    </Col>
                                </Row>
                                <div className="Bio-page pt-4 mt-1 container">
                                    <Row>
                                        <Col span={24}>
                                            <Tooltip title="ใส่ข้อมูลเพื่อแนะนำตัวเองเพิ่มเติม">
                                                Bio
                                            </Tooltip>
                                            {acc.map((acc) => {
                                                return (
                                                    <>
                                                        <AntParagraph
                                                            editable={{
                                                                onChange: (handleBio),
                                                                maxLength: 60,
                                                                onStart: () => setEditBio(true)
                                                            }}
                                                        >
                                                            {acc.bio}
                                                        </AntParagraph>
                                                    </>
                                                )
                                            }
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </AntCard>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 24 }} style={{ width: 400 }}>
                            <AntCard>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </AntCard>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div >
    )
}
export default withRouter(Profile);