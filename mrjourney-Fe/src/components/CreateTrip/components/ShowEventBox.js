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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const TypeButtonEat = styled(TypeButton)`
    border: 1px solid #C25738;
    background: #C25738;
`;

const TypeButtonTravel = styled(TypeButton)`
    border: 1px solid #F37945;
    background: #F37945;
`;

const TypeButtonSleep = styled(TypeButton)`
    border: 1px solid #D37C49;
    background: #D37C49;
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
                        <TypeButtonEat
                            shape="circle"
                            icon={<img src="/img/icons/eat.png" />}
                        />
                        : null}
                    {props.eventDetail.eventType === 'travel' ?
                        <TypeButtonTravel
                            shape="circle"
                            icon={<img src="/img/icons/travel.png" />}
                        />
                        : null}
                    {props.eventDetail.eventType === 'sleeping' ?
                        <TypeButtonSleep
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
                        {momentjs(props.eventDetail.startEvent).format('HH:mm')}- {momentjs(props.eventDetail.endEvent).format('HH:mm')}
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default ShowEventBox;

