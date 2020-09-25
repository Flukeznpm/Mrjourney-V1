import React from "react"
import { Steps } from 'antd';
import styled from "styled-components";
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
                        // <TripSteps current={0}>
                        //     <Step title="สร้างทริป" icon={<LoadingOutlined />} />
                        //     <Step title="ระบุรายละเอียด" icon={<ControlTwoTone twoToneColor="#cccccc" />} />
                        //     <Step title="ตรวจสอบข้อมูล" icon={<CheckCircleTwoTone twoToneColor="#cccccc" />} />
                        // </TripSteps>
                        <HeaderStep>

                        </HeaderStep>
                        : null}
                    {props.step === 2 ?
                        // <TripSteps current={1}>
                        //     <Step title="สร้างทริป" icon={<PlusCircleTwoTone twoToneColor="#e66f0f" />} />
                        //     <Step title="ระบุรายละเอียด" icon={<LoadingOutlined />} />
                        //     <Step title="ตรวจสอบข้อมูล" icon={<CheckCircleTwoTone twoToneColor="#cccccc" />} />
                        // </TripSteps>
                        <HeaderStep>

                        </HeaderStep>
                        : null}
                    {props.step === 3 ?
                        // <TripSteps current={2}>
                        //     <Step title="สร้างทริป" icon={<PlusCircleTwoTone twoToneColor="#e66f0f" />} />
                        //     <Step title="ระบุรายละเอียด" icon={<ControlTwoTone twoToneColor="#e66f0f" />} />
                        //     <Step title="ตรวจสอบข้อมูล" icon={<CheckCircleTwoTone twoToneColor="#e66f0f" />} />
                        // </TripSteps>
                        <HeaderStep>

                        </HeaderStep>
                        : null}
                </>
            }
        </>
    )
}

export default Stepper;