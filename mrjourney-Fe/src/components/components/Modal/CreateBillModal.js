import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import liff from '@line/liff';
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

function CreateBillModal(props) {


    const onCancel = () => {
        props.setVisible(false)
    };

    const onConfirm = async values => {
        let dataBill = {
            lineGroupID: props.LineGroup,
            ownerBillID: props.LineID,
            ownerName: props.LineName,
            billName: props.billName,
            totalCost: props.totalBill,
            receivingAccount: props.receivingAcc,
            payMentNumber: props.paymentNumber,
            bankName: props.bankName,
            user: props.whoPay
        }
        await axios.post('https://mrjourney-senior.herokuapp.com/bill/createBill', dataBill)
            .then(res => {
                console.log(res)
            });
        props.setVisible(false)
        liff.closeWindow()
        if (liff.getContext().type !== "none") {
            liff.sendMessages([
                {
                    "type": "text",
                    "text": "สร้างบิลเสร็จสิ้น"
                }
            ])
        }
    };

    return (
        <DeleteModalComponent
            title="ยืนยันการสร้างบิล?"
            visible={props.isVisible}
            // onOk={handleOK}
            onCancel={onCancel}
            closable={false}
            footer={null}
            centered
            width={400}
        >

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
                                onClick={() => onConfirm()}
                            >ยืนยัน</PrimaryButton>
                        </AntForm.Item>
                    </ColButton>
                </Row>
            </Col>

        </DeleteModalComponent>
    )
}


export default CreateBillModal;