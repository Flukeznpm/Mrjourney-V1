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
    Input as AntInput,
    Radio
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
        padding-bottom: 0px;
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

const RadioComponent = styled(Radio)`
    padding: 15px;
    display: flex;
    padding-left: 0px;
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 12px;
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


function BankPayment(props) {

    const [form] = AntForm.useForm();
    const [value, setValue] = useState("พร้อมเพย์");

    const onCancel = () => {
        props.setVisible(false)
    };

    const onFinish = values => {
        if (value === "พร้อมเพย์") {
            props.setPaymentBank(value)
        } else {
            props.setPaymentBank(values.bankName)
        }
        props.setOwnerName(values.ownerName)
        props.setPaymentNumber(values.paymentNumber)
        form.setFieldsValue({
            ownerName: null,
            bankName: null,
            paymentNumber: null
        })
        props.setVisible(false)
    };

    const onChangePaymentType = e => {
        setValue(e.target.value)
    }

    return (
        <DeleteModalComponent
            title="บัญชีรับเงิน"
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
                        <AntFormItem name="ownerName" label="ชือเจ้าของบัญชี" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                            <InputComponent placeholder="ใส่ชื่อเจ้าของบัญชี" />
                        </AntFormItem>
                        <Radio.Group onChange={onChangePaymentType} value={value}>
                            <RadioComponent value="พร้อมเพย์">
                                พร้อมเพย์
                            </RadioComponent>
                            {value === "พร้อมเพย์" ?
                                <AntFormItem name="paymentNumber" label="เลขบัญชี" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                    <InputComponent placeholder="ใส่ชื่อเจ้าของบัญชี" />
                                </AntFormItem>
                                :
                                null
                            }
                            <RadioComponent value="ธนาคาร">
                                ธนาคาร
                            </RadioComponent>
                            {value === "ธนาคาร" ?
                                <>
                                    <AntFormItem name="bankName" label="ชื่อธนาคาร" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                        <InputComponent placeholder="ใส่ชื่อธนาคาร" />
                                    </AntFormItem>
                                    <AntFormItem name="paymentNumber" label="เลขบัญชี" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                        <InputComponent placeholder="ใส่ชื่อเจ้าของบัญชี" />
                                    </AntFormItem>
                                </>
                                :
                                null
                            }
                        </Radio.Group>
                    </ColButton>
                </Row>
                <Row justify="center" gutter={8} className="mt-2">
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
                            >บันทึก</PrimaryButton>
                        </AntForm.Item>
                    </ColButton>
                </Row>
            </AntForm>
        </DeleteModalComponent>
    )
}


export default BankPayment;