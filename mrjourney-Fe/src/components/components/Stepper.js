import React from "react"
import { Steps } from 'antd';
import styled from "styled-components";
import {
    Col, Row,
} from 'antd';
import { LoadingOutlined, SmileOutlined, ControlTwoTone, CheckCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

const AntSteps = styled(Steps)`
    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
        color: ${props => (props.theme.color.primary)};
        font-size: 28px;
    }
    .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon{
        font-size: 28px;
    }
    .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
        font-size: 28px;
        color: ${props => (props.theme.color.primary)};
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
        background-color: ${props => (props.theme.color.primary)};
    }
`;

const HeaderStep = styled.div`
    background-color: ${props => (props.theme.color.primary)};
    width: 100%;
    height: 100px;
`;

const ColStepText = styled(Col)`
    display: flex;
    align-items: center;
    height: 100%;
`;

const ColStepImg = styled(Col)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
`;

const HeaderStepText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #f9f9f9;
`

function Stepper(props) {
    const { Step } = Steps;
    return (
        <>
            {props.typeStep === "room" ?
                <>
                    {props.step === 1 ?
                        <AntSteps current={0}>
                            <Step icon={<LoadingOutlined />} description="สร้างห้อง" />
                            <Step title="กำหนดเงื่อนไข" icon={<ControlTwoTone twoToneColor="#cccccc" />} />
                            <Step title="ตรวจสอบข้อมูล" icon={<CheckCircleTwoTone twoToneColor="#cccccc" />} />
                        </AntSteps>
                        : null}
                    {props.step === 2 ?
                        <AntSteps current={1}>
                            <Step title="สร้างห้อง" icon={<PlusCircleTwoTone twoToneColor="#e66f0f" />} />
                            <Step title="กำหนดเงื่อนไข" icon={<LoadingOutlined />} />
                            <Step title="ตรวจสอบข้อมูล" icon={<CheckCircleTwoTone twoToneColor="#cccccc" />} />
                        </AntSteps>
                        : null}
                    {props.step === 3 ?
                        <AntSteps current={2}>
                            <Step title="สร้างห้อง" icon={<PlusCircleTwoTone twoToneColor="#e66f0f" />} />
                            <Step title="กำหนดเงื่อนไข" icon={<ControlTwoTone twoToneColor="#e66f0f" />} />
                            <Step title="ตรวจสอบข้อมูล" icon={<LoadingOutlined />} />
                        </AntSteps>
                        : null}
                </>
                :
                <>
                    {props.step === 1 ?
                        <HeaderStep>
                        <Row className="container h-100">
                            <ColStepText span={16}>
                                <HeaderStepText>สร้างแผนการท่องเที่ยว</HeaderStepText>
                            </ColStepText>
                            <ColStepImg span={8}>
                                <img src={'/img/menu-03.png'} width={150} />
                            </ColStepImg>
                        </Row>
                    </HeaderStep>
                        : null}
                    {props.step === 2 ?
                        <HeaderStep>
                        <Row className="container h-100">
                            <ColStepText span={16}>
                                <HeaderStepText>ระบุรายละเอียดแต่ละวัน</HeaderStepText>
                            </ColStepText>
                            <ColStepImg span={8}>
                                <img src={'/img/menu-02.png'} width={150} />
                            </ColStepImg>
                        </Row>
                    </HeaderStep>
                        : null}
                    {props.step === 3 ?
                        <HeaderStep>
                            <Row className="container h-100">
                                <ColStepText span={17}>
                                    <HeaderStepText>เสร็จสิ้นการสร้างแผน</HeaderStepText>
                                </ColStepText>
                                <ColStepImg span={7}>
                                    <img src={'/img/menu-03.png'} width={150} />
                                </ColStepImg>
                            </Row>
                        </HeaderStep>
                        : null}
                </>
            }
        </>
    )
}

export default Stepper;