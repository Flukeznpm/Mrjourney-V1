import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Form as AntForm,
    Button as AntButton,
    Typography,
    Card
} from 'antd';
import { withRouter } from 'react-router-dom';
import { PlusOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import MoneyModal from '../components/components/MoneyModal';
import BankPayment from '../components/components/Modal/BankPayment';
import CreateBillModal from '../components/components/Modal/CreateBillModal';

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

const AddMemberButton = styled(AntButton)`
    box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    color: #F7F7F7;
    border: none;
    background: ${props => (props.theme.color.primary)};
    margin: 10px 0px;
    padding: 20px;
    .anticon {
      display: flex;
      font-size: 22px;
      justify-content: center;
      align-items: center;
  }
    &:hover , &:active , &:focus {
        color: #F7F7F7;
        border: none;
        background: ${props => (props.theme.color.primaryPress)};
    }
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

const ColButton = styled(Col)`
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: center; 
    font-size: 24px;
    color: #E6E6E6;   
`;

const DeleteMemberButton = styled(AntButton)`
    box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
    color: #F7F7F7;
    border: none;
    background: #FF4647;
    .anticon {
      display: flex;
      font-size: 8px;
      justify-content: center;
      align-items: center;
    }
    &:hover , &:active , &:focus {
        color: #F7F7F7;
        border: none;
        background: #FF4647;
    }
`;

function CreateBill(props) {

    const [loading, isLoading] = useState(false)
    const [totalBill, setTotalBill] = useState(0)
    const [isVisibleMoney, setVisibleMoney] = useState(false)
    const [isVisiblePayment, setVisiblePayment] = useState(false)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [membersM, setMemberM] = useState([])
    const [ownerName, setOwnerName] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentBank, setPaymentBank] = useState("");

    // useEffect(async () => {
    //     isLoading(false)
    // }, [])

    const handleBill = (value) => {
        setTotalBill(value)
    }

    const onVisibleMoneyModal = () => {
        setVisibleMoney(true)
    }

    const onVisiblePaymentModal = () => {
        setVisiblePayment(true)
    }
    const onVisibleConfirmModal = () => {
        setVisibleConfirm(true)
    }
    const onDeleteMember = async (key) => {
        membersM.splice(key, 1);
        setMemberM(membersM)
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
                        <AntParagraph
                            editable={{
                                onChange: (handleBill),
                                maxLength: 5,
                            }}
                        >
                            {totalBill}
                        </AntParagraph>
                    </Row>
                    <Row>
                        ยอดแต่ละคน
                    </Row>
                    <Row>
                        {membersM.map((members, key) => {
                            return (
                                <Col span={24}>
                                    <Row justify="space-between">
                                        <Col span={16}>
                                            {members}
                                        </Col>
                                        <Col span={6} className="text-right">
                                            {(totalBill / membersM.length).toFixed(2)}
                                        </Col>
                                        <Col span={2}>
                                            <DeleteMemberButton type="primary"
                                                shape="circle"
                                                size="small"
                                                icon={<CloseOutlined />}
                                                onClick={() => onDeleteMember(key)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        <AddMemberButton type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => onVisibleMoneyModal()}
                        />
                        <MoneyModal
                            isVisible={isVisibleMoney}
                            setVisible={setVisibleMoney}
                            setMemberM={setMemberM}
                            membersM={membersM}
                        />
                    </Row>
                    <Row>
                        บัญชีเงินรับ
                    </Row>

                    {ownerName ?
                        <AntCard onClick={() => onVisiblePaymentModal()}>
                            <Row>
                                <Col span={21}>
                                    <Row>
                                        {ownerName}
                                    </Row>
                                    <Row>
                                        {paymentBank} {paymentNumber}
                                    </Row>
                                </Col>
                                <ColButton span={3}>
                                    <EditOutlined />
                                </ColButton>
                            </Row>
                        </AntCard>
                        :
                        <AntCard onClick={() => onVisiblePaymentModal()}>
                            <Row>
                                <Col span={22}>
                                    <Row>
                                        &nbsp;
                                    </Row>
                                    <Row>
                                        &nbsp;
                                    </Row>
                                </Col>
                                <ColButton span={2}>
                                    <EditOutlined />
                                </ColButton>
                            </Row>
                        </AntCard>
                    }
                    <BankPayment
                        isVisible={isVisiblePayment}
                        setVisible={setVisiblePayment}
                        setOwnerName={setOwnerName}
                        setPaymentNumber={setPaymentNumber}
                        setPaymentBank={setPaymentBank}
                    />
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
                                {ownerName && paymentBank && paymentNumber && membersM && totalBill ?
                                    <Col span={16}>
                                        <PrimaryButton
                                            type="primary"
                                            size={"large"}
                                            block htmlType="submit"
                                            onClick={() => onVisibleConfirmModal()}
                                        >สร้างบิล</PrimaryButton>
                                    </Col>
                                    :
                                    <Col span={16}>
                                        <PrimaryButton
                                            type="primary"
                                            size={"large"}
                                            block htmlType="submit"
                                            disabled
                                        >สร้างบิล</PrimaryButton>
                                    </Col>
                                }
                                <CreateBillModal
                                    isVisible={isVisibleConfirm}
                                    setVisible={setVisibleConfirm}
                                    ownerName={ownerName}
                                    paymentBank={paymentBank}
                                    paymentNumber={paymentNumber}
                                    membersM={membersM}
                                    totalBill={totalBill}
                                />
                            </Row>
                        </AntFormItem>
                    </AntForm>
                </Row>
            </Wrapper>
        )
    }
}
export default withRouter(CreateBill);