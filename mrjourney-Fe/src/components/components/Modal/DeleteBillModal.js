import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
    Modal as AntModal,
    Row, Col,
    Button as AntButton,
    Form as AntForm,
    Input as AntInput
} from 'antd';
import liff from '@line/liff';

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

function DeleteBillModal(props) {


    const onCancel = () => {
        props.setVisible(false)
    };

    const onConfirm = async (lineGroupID, billNo) => {
        await axios.delete(`https://mrjourney-senior.herokuapp.com/bill/deleteBill?lineGroupID=${lineGroupID}&billNo=${billNo}`)
            .then(res => {
                console.log(res)
            });
        props.setVisible(false)
        liff.closeWindow()
        if (liff.getContext().type !== "none") {
            liff.sendMessages([
                {
                    "type": "text",
                    "text": "ลบบิลเสร็จสิ้น"
                }
            ])
        }
    }

    return (
        <DeleteModalComponent
            title="ต้องการลบบิลหรือไม่?"
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
                                onClick={() => onConfirm(props.lineGroupID, props.bill.billNo)}
                            >ยืนยัน</PrimaryButton>
                        </AntForm.Item>
                    </ColButton>
                </Row>
            </Col>

        </DeleteModalComponent>
    )
}


export default DeleteBillModal;