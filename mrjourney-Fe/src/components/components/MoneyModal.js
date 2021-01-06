import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import {
    Modal as AntModal,
    Row, Col,
    Button as AntButton,
    Form as AntForm,
    Input as AntInput
} from 'antd';

const DeleteModalComponent = styled(AntModal)`
    .ant-modal-content {
        border-radius: 10px;
    }
    .ant-modal-header {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: none;
        text-align: center;
        padding-top: 18px;
    }
    .ant-modal-body {
        padding-top: 0px;
    }
    .ant-modal-footer {
        border-top: none;
    }
    border-radius: 8px;
`;

const ColButton = styled(Col)`
     text-align: center;
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const OutlineButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid ${props => (props.theme.color.primary)};
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        border: 1px solid ${props => (props.theme.color.primaryPress)};
        color: ${props => (props.theme.color.primary)};
        background: #F7F7F7;
    }
`;

const InputComponent = styled(AntInput)`
    border-radius: 4px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    align-items: center;
    &:hover , &:active, &:focus {
        border-color: ${props => (props.theme.color.primary)};
    }
`;


function MoneyModal(props) {

    const [form] = AntForm.useForm();
    const [user, setUser] = useState({ fName: '' })

    const onCancel = () => {
        props.setVisible(false)
    };

    const onChange = e => {
        const { value } = e.target;
        setUser(prevState => ({
            ...prevState,
            ['fName']: value
        }));
    };

    const onFinish = values => {
        // props.setWhoPay(props.whoPay.concat(values.monName))
        props.setWhoPay(props.whoPay.concat(user))
        form.setFieldsValue({
            monName: null,
        })
        props.setVisible(false)
    };

    return (
        <DeleteModalComponent
            title="แน่ใจหรือไม่ว่าต้องการลบห้อง?"
            visible={props.isVisible}
            // onOk={handleOK}
            onCancel={onCancel}
            closable={false}
            footer={null}
            centered
            width={400}
        >
            <AntForm form={form} onFinish={onFinish}>
                <Row justify="center" >
                    <ColButton span={20}>
                        <AntForm.Item name="monName" label="ชือผู้จ่ายเงิน" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                            <InputComponent placeholder="ใส่ชื่อผู้คนที่ต้องเก็บเงิน" onChange={onChange} />
                        </AntForm.Item>
                    </ColButton>
                </Row>
                {console.log(user)}
                <Col span={24}>
                    <Row justify="center" gutter={8}>
                        <ColButton span={10}>
                            <OutlineButton
                                size={"large"}
                                block htmlType="button"
                                onClick={onCancel}
                            >ยกเลิก</OutlineButton>
                        </ColButton>
                        <ColButton span={10}>
                            <AntForm.Item>
                                <PrimaryButton
                                    type="primary"
                                    size={"large"}
                                    block htmlType="submit"
                                >ยืนยัน</PrimaryButton>
                            </AntForm.Item>
                        </ColButton>
                    </Row>
                </Col>
            </AntForm>
        </DeleteModalComponent>
    )
}


export default MoneyModal;