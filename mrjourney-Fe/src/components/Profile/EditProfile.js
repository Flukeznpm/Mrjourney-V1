import React, { useEffect, useState } from 'react';
import styled from "styled-components";
// import '../static/css/App.css';
// import '../static/css/Profile.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import momentjs from 'moment'
import {
    Card,
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Switch
} from 'antd';

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

function EditProfile(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [acc, setShowAcc] = useState([{}])
    const [gender, selectGender] = useState(["ชาย", "หญิง"])
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
        props.setEditProfile(false)
    };
    return (
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
                                    onClick={() => props.setEditProfile(false)}>ยกเลิก</OutlineButton>
                            </div>
                            <div className="col-6">
                                <PrimaryButton type="primary" size={"small"} block htmlType="submit">ยืนยัน</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </AntForm.Item>
            </AntForm>
        </div>
    )
}
export default EditProfile;