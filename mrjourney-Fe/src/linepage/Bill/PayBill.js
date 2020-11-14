import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Form as AntForm,
    Button as AntButton,
    Radio,
    Card
} from 'antd';
import { withRouter } from 'react-router-dom';
import CreateBillModal from '../../components/components/Modal/CreateBillModal'
import PayBillModal from '../../components/components/Modal/PayBillModal';

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

const AntCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  padding: 5px;
  width: 100%;
  .ant-card-body {
      padding: 5px;
  }
`;

const WrapperContent = styled.div`
    padding: 20px 35px 20px 35px;
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

const RowHeader = styled.div`
    padding: 15px 0px;
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

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

const RadioComponent = styled(Radio)`
`;


function PayBill(props) {

    const [loading, isLoading] = useState(false)
    const [totalBill, setTotalBill] = useState(500)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [whoPay, setWhoPay] = useState(['รอม', 'กัน', 'ฟลุ้ค'])
    const [selectedPay, setSelectedPay] = useState(true)
    const [ownerName, setOwnerName] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentBank, setPaymentBank] = useState("");
    const [value, setValue] = useState("");

    // useEffect(async () => {
    //     isLoading(false)
    // }, [])

    const onFinish = values => {

    };

    const onVisibleConfirmModal = () => {
        setVisibleConfirm(true)
    }

    const onChangeSelecteWhoPay = e => {
        setValue(e.target.value)
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
                            <Row>
                                <HeaderStepText>ชื่อบิลเก็บเงิน</HeaderStepText>
                            </Row>
                        </ColStepText>
                        <ColStepImg span={8}>
                            <img src={'/img/menu-02.png'} width={150} />
                        </ColStepImg>
                    </Row>
                </HeaderStep>
                <WrapperContent>
                    <RowHeader>
                        ยอดแต่ละคน
                    </RowHeader>
                    <Row>
                        {whoPay.map((who, key) => {
                            return (
                                <Col span={24}>
                                    <Row justify="space-between">
                                        <Col span={3}>
                                            <Radio.Group onChange={onChangeSelecteWhoPay} value={value}>
                                                <RadioComponent value={who}>
                                                </RadioComponent>
                                            </Radio.Group>
                                        </Col>
                                        <Col span={15}>
                                            {who}
                                        </Col>
                                        <Col span={6} className="text-right">
                                            {(totalBill / whoPay.length).toFixed(2)}
                                        </Col>

                                    </Row>
                                </Col>
                            )
                        })}

                    </Row>
                    <RowHeader>
                        บัญชีเงินรับ
                    </RowHeader>
                    <AntCard>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    &nbsp;
                                    </Row>
                                <Row>
                                    &nbsp;
                                    </Row>
                            </Col>
                        </Row>
                    </AntCard>
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
                                {selectedPay === true ?
                                    <Col span={16}>
                                        <PrimaryButton
                                            type="primary"
                                            size={"large"}
                                            block htmlType="submit"
                                            onClick={() => onVisibleConfirmModal()}
                                        >จ่ายเงิน</PrimaryButton>
                                    </Col>
                                    :
                                    <Col span={16}>
                                        <PrimaryButton
                                            type="primary"
                                            size={"large"}
                                            block htmlType="submit"
                                            disabled
                                        >จ่ายเงิน</PrimaryButton>
                                    </Col>
                                }
                                <PayBillModal
                                    isVisible={isVisibleConfirm}
                                    setVisible={setVisibleConfirm}
                                />
                            </Row>
                        </AntFormItem>
                    </AntForm>
                </Row>
            </Wrapper >
        )
    }
}
export default withRouter(PayBill);