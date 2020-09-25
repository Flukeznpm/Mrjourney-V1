import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import {
    Modal as AntModal,
    Row, Col,
    Button as AntButton
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


function DeleteModal(props) {

    const onDeleteRoom = async (roomID, lineID) => {
        await axios.delete(`http://localhost:5000/room/deleteRoom?roomID=${roomID}&lineID=${lineID}`)
            .then(res => {
                console.log(res)
            })
        props.setVisible(false)
    }

    const onCancel = () => {
        props.setVisible(false)
        console.log(props.roomID)
        console.log(props.lineID)
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
            <Col span={24}>
                <Row justify="center" gutter={8}>
                    <ColButton span={10}>
                        <OutlineButton
                            size={"large"}
                            block htmlType="button"
                            onClick={onCancel}
                        >ย้อนกลับ</OutlineButton>
                    </ColButton>
                    <ColButton span={10}>
                        <PrimaryButton
                            type="primary"
                            size={"large"}
                            block htmlType="submit"
                            onClick={() => onDeleteRoom(props.roomID, props.lineID)}
                        >ยืนยัน</PrimaryButton>
                    </ColButton>
                </Row>
            </Col>
        </DeleteModalComponent>
    )
}


export default DeleteModal;