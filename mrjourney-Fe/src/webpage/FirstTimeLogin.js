import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import Swal from 'sweetalert2';
import {
    Card,
    Form as AntForm,
    Input as AntInput,
    Button as AntButton,
    Select as AntSelect,
    DatePicker,
    Row,
    Col
} from 'antd';

const RowLogin = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 15px 0px 15px 0px;
 
`;

const AntFormLogin = styled(AntForm)`
 display: flex;
flex-direction: column;
justify-content: space-between;
`

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
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

const DatePickerComponent = styled(DatePicker)`
    height: 40px;
    border-radius: 4px;
    &:hover , &:active {
        border-color: rgb(230, 111, 15);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgb(255, 233, 208);
`;

function FirstTimeLogin(props) {

    const [gender, selectGender] = useState(["ชาย", "หญิง"])
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [bio, setBio] = useState(" ")
    const { Option } = AntSelect;
    const dateFormat = 'DD-MM-YYYY';

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            // props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
        }
    }, [])

    const onFinish = async (value) => {
        let dataProfile = {
            lineID: lineID,
            displayName: displayName,
            pictureURL: pictureURL,
            fName: value.fName,
            lName: value.lName,
            gender: value.gender,
            birthday: value.birthday,
            bio: bio
        }

        await axios.post('https://mrjourney-senior.herokuapp.com/accountProfile/createAccountDetail', dataProfile)
            .then(async (res) => {
                console.log(res)
            })
        Swal.fire({
            icon: 'success',
            title: 'ลงทะเบียนสำเร็จ!',
            text: 'ขอให้คุณสนุกกับการท่องเที่ยว',
            confirmButtonColor: '#31CC71',
            confirmButtonText: '<a href="/Home" id="alert-confirm-button">กลับสู่หน้าหลัก</a>',
        })
    };

    return (
        <Wrapper>
            <RowLogin justify="center">
                <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 20 }} xs={{ span: 22 }} style={{ width: 400 }}>
                    <AntCard>
                        <AntFormLogin onFinish={onFinish}>
                            <div className="input-login">
                                <h3 className="text-center">กรอกข้อมูลเพิ่มเติม</h3>
                                <AntForm.Item name="fName" label="ชื่อจริง" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <InputComponent placeholder="กรอกชื่อของคุณ" />
                                </AntForm.Item>
                                <AntForm.Item name="lName" label="นามสกุล" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <InputComponent placeholder="กรอกนามสกุลของคุณ" />
                                </AntForm.Item>
                                <AntForm.Item name="gender" label="เพศ" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <AntSelect
                                        placeholder="เพศของคุณ"
                                    >
                                        {gender.map((ShowGender) => {
                                            return (
                                                <Option value={ShowGender}>{ShowGender}</Option>
                                            )
                                        })}
                                    </AntSelect>
                                </AntForm.Item>
                                <AntForm.Item name="birthday" label="วันเกิด" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <DatePickerComponent style={{ width: "100%" }}
                                        format={dateFormat} />
                                </AntForm.Item>
                            </div>
                            <div className="button-login">
                                <AntForm.Item style={{ margin: "0px" }}>
                                    <PrimaryButton type="primary" size={"large"} block htmlType="submit">ยืนยัน</PrimaryButton>
                                </AntForm.Item>
                            </div>
                        </AntFormLogin>
                    </AntCard>
                </Col>
            </RowLogin>
        </Wrapper>
    )
}

export default FirstTimeLogin;