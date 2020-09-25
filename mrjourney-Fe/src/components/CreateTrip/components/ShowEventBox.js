import React from 'react';
import styled from "styled-components";
import {
    Card,
    Row,
    Col,
    Tooltip,
    Button as AntButton,
} from 'antd';
import momentjs from 'moment';

const TypeButton = styled(AntButton)`
    font-size: 18px;
    border: 1px solid #F37945;
    background: #F37945;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    &:hover , &:active, &:focus {
        border: 1px solid #F37945;
        background: #F37945;
    }
`;

const TypeCol = styled(Col)`
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
        margin-right: 8px;
    }
`

function ShowEventBox(props) {
    return (
        <Col span={24}>
            <Row>
                <TypeCol span={5}>
                    {props.eventDetail.eventType === 'eating' ?
                        <TypeButton
                            shape="circle"
                            icon={<img src="/img/icons/eat.png" />}
                        />
                        : null}
                    {props.eventDetail.eventType === 'travel' ?
                        <TypeButton
                            shape="circle"
                            icon={<img src="/img/icons/travel.png" />}
                        />
                        : null}
                    {props.eventDetail.eventType === 'sleep' ?
                        <TypeButton
                            shape="circle"
                            icon={<img src="/img/icons/sleep.png" />}
                        />
                        : null}
                </TypeCol>
                <Col span={18}>
                    <Row>
                        {props.eventDetail.eventName}
                    </Row>
                    <Row>
                        {momentjs(props.eventDetail.startEvent).format('HH:mm')}- {momentjs(props.eventDetail.endEvent).format('h:mm')}
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default ShowEventBox;

