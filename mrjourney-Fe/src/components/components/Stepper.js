import React from "react"
import { Steps } from 'antd';
import styled from "styled-components";
import { SettingOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const AntSteps = styled(Steps)`
    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
        color: ${props => (props.theme.color.primary)};
        font-size: 28px;
    }
    .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
        font-size: 28px;
        color: ${props => (props.theme.color.primary)};
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
        background-color: ${props => (props.theme.color.primary)};
    }
`

function Stepper(props) {
    const { Step } = Steps;
    return (
        <>
            {props.typeStep === "room" ?
                <>
                    {props.step === 1 ?
                        <AntSteps current={0}>
                            <Step title="สร้างห้อง" icon={<LoadingOutlined />} />
                            <Step title="กำหนดเงื่อนไข" icon={<SettingOutlined />} />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} />
                        </AntSteps>
                        : null}
                    {props.step === 2 ?
                        <AntSteps current={1}>
                            <Step title="สร้างห้อง" icon={<SolutionOutlined />} description="This is a description." />
                            <Step title="กำหนดเงื่อนไข" icon={<LoadingOutlined />} description="This is a description." />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} description="This is a description." />
                        </AntSteps>
                        : null}
                    {props.step === 3 ?
                        <AntSteps current={2}>
                            <Step title="สร้างห้อง" icon={<SolutionOutlined />} description="This is a description." />
                            <Step title="กำหนดเงื่อนไข" icon={<SettingOutlined />} description="This is a description." />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} description="This is a description." />
                        </AntSteps>
                        : null}
                </>
                :
                <>
                    {props.step === 1 ?
                        <AntSteps current={0}>
                            <Step title="สร้างทริป" icon={<LoadingOutlined />} />
                            <Step title="ระบุรายละเอียด" icon={<SettingOutlined />} />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} />
                        </AntSteps>
                        : null}
                    {props.step === 2 ?
                        <AntSteps current={1}>
                            <Step title="สร้างทริป" icon={<SolutionOutlined />} />
                            <Step title="ระบุรายละเอียด" icon={<LoadingOutlined />} />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} />
                        </AntSteps>
                        : null}
                    {props.step === 3 ?
                        <AntSteps current={2}>
                            <Step title="สร้างทริป" icon={<SolutionOutlined />} />
                            <Step title="ระบุรายละเอียด" icon={<SettingOutlined />} />
                            <Step title="เสร็จสิ้น" icon={<SmileOutlined />} />
                        </AntSteps>
                        : null}
                </>
            }
        </>
    )
}

export default Stepper;