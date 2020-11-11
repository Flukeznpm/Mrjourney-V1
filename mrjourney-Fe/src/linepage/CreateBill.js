import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Form as AntForm,
    Button as AntButton,
    Typography
} from 'antd';
import { withRouter } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import MoneyModal from '../components/components/MoneyModal';

const { Paragraph } = Typography;
const AntParagraph = styled(Paragraph)`
    border-radius: 8px;
    padding: 5px;
    .ant-typography-expand, .ant-typography-edit, .ant-typography-copy {
         color: ${props => (props.theme.color.primary)};
    }
`;

const Wrapper = styled.div`
    font-size: 18px;
`;

const WrapperLoading = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

const RowLoading = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`

const LoadingGif = styled.img`
    height: 250px;
    width: 250px;
   
`;

const WrapperContent = styled.div`
    padding: 20px;
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

const HeaderStep = styled.div`
    background-color: ${props => (props.theme.color.primary)};
    width: 100%;
    height: 100px;
`;

const HeaderStepText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #f9f9f9;
`;

const PrevButton = styled(AntButton)`
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    color: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        color: ${props => (props.theme.color.primaryPress)};
        background: #F7F7F7;
    }
`;

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    height: 50px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const AddEventButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 16px;
    box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    border: none;
    margin: 10px 0px;
    .anticon {
      display: flex;
      justify-content: center;
      align-items: center;
  }
    &:hover , &:active , &:focus {
        color: ${props => (props.theme.color.primary)};
        border: none;
        background: #F5F5F5;
    }
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

function CreateBill(props) {

    const [loading, isLoading] = useState(true)
    const [totalBill, setTotalBill] = useState(0)
    const [isVisibleMoney, setVisibleMoney] = useState(false)
    const [membersM, setMemberM] = useState(['rom', 'gun', 'fluke'])

    useEffect(async () => {
        isLoading(false)
    }, [])

    const handleBill = (value) => {
        setTotalBill(value)
    }

    const onFinish = values => {

    };

    const onVisibleMoneyModal = () => {
        setVisibleMoney(true)
    }

    if (loading) {
        return (
            <WrapperLoading>
                <RowLoading justify="center">
                    <LoadingGif src="/gif/loading.gif" alt="loading..." />
                </RowLoading>
            </WrapperLoading>
        )
    } else {
        return (
            <Wrapper>
                <HeaderStep>
                    <Row className="container h-100">
                        <ColStepText span={16}>
                            <HeaderStepText>สร้างบิลเรียกเก็บเงิน</HeaderStepText>
                        </ColStepText>
                        <ColStepImg span={8}>
                            <img src={'/img/menu-02.png'} width={150} />
                        </ColStepImg>
                    </Row>
                </HeaderStep>
                <WrapperContent>
                    <Row>
                        ยอดรวมบิล
                    </Row>
                    <Row>
                        <Col span={24} className="text-right">
                            <AntParagraph
                                editable={{
                                    onChange: (handleBill),
                                    maxLength: 5,
                                }}
                            >
                                {totalBill}
                            </AntParagraph>
                        </Col>
                    </Row>
                    <Row>
                        ยอดแต่ละคน
                    </Row>
                    <Row>
                        {membersM.map((members) => {
                            return (
                                <Col span={24}>
                                    <Row justify="space-between">
                                        <Col span={12}>
                                            {members}
                                        </Col>
                                        <Col span={12} className="text-right">
                                            {(totalBill / membersM.length).toFixed(2)}
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        <AddEventButton block
                            size={"large"} htmlType="submit"
                            onClick={() => onVisibleMoneyModal()}
                        >
                            <PlusOutlined />
                        </AddEventButton>
                        <MoneyModal
                            isVisible={isVisibleMoney}
                            setVisible={setVisibleMoney}
                        />
                    </Row>
                    <Row>
                        บัญชีเงินรับ
                    </Row>
                </WrapperContent>
                <Row justify="center" className="bg-white fixed-bottom">
                    <AntForm className="container">
                        <AntFormItem>
                            <Row>
                                <Col span={8}>
                                    <PrevButton
                                        type="link"
                                        size={"large"}
                                        block htmlType="button"
                                    >ยกเลิก</PrevButton>
                                </Col>
                                <Col span={16}>
                                    <PrimaryButton
                                        type="primary"
                                        size={"large"}
                                        block htmlType="submit"
                                    >สร้างบิล</PrimaryButton>
                                </Col>
                            </Row>
                        </AntFormItem>
                    </AntForm>
                </Row>
            </Wrapper>
        )
    }
}
export default withRouter(CreateBill);