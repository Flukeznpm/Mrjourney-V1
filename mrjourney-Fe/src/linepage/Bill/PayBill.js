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
import PayBillModal from '../../components/components/Modal/PayBillModal';
import { Link } from 'react-router-dom';

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

    const [loading, isLoading] = useState(true)
    const [totalBill, setTotalBill] = useState(500)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [whoPay, setWhoPay] = useState(['รอม', 'กัน', 'ฟลุ้ค'])
    const [selectedPay, setSelectedPay] = useState(true)
    const [ownerName, setOwnerName] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentBank, setPaymentBank] = useState("");
    const [value, setValue] = useState("");
    const [billList, setBillList] = useState([{}]);

    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')

    useEffect(() => {
        liff.init({ liffId: '1653975470-JyVQ0Xr9' }).then(async () => {
            if (liff.isLoggedIn()) {
                if (!LineGroup || LineGroup === '') {
                    let profile = await liff.getProfile();
                    setLineID(profile.userId);
                    setLineName(profile.displayName);
                    setLinePicture(profile.pictureUrl);
                    const context = await liff.getContext();
                    setLineGroup(context.groupId)
                } else {
                    await axios.get(`https://mrjourney-senior.herokuapp.com/bill/allBill?lineGroupID=${LineGroup}`)
                        .then(res => {
                            if (res.status === 202) {
                                isLoading(false)
                            } else {
                                setBillList(res.data)
                                isLoading(false)
                            }
                        });
                }
            } else {
                props.history.push('/Home');
            }
        })
    }, [LineGroup]);

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
                    <LoadingGif src="/gif/loading-v2.gif" alt="loading..." />
                </RowLoading>
            </WrapperLoading>
        )
    } else {
        return (
            <Wrapper>
                {billList.map((bill) => {
                    return (
                        <>
                            {bill.billNo ?

                                <>
                                    <HeaderStep>
                                        <Row className="container h-100">
                                            <ColStepText span={16}>
                                                <Row>
                                                    <HeaderStepText>{bill.billName}</HeaderStepText>
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
                                            {bill.user.map((user) => {
                                                return (
                                                    <>
                                                        {
                                                            user.waitAcceptStatus === false && user.payStatus === false ?
                                                                <Col span={24}>
                                                                    <Row justify="space-between">
                                                                        <Col span={3}>
                                                                            <Radio.Group onChange={onChangeSelecteWhoPay} value={value}>
                                                                                <RadioComponent value={user.userID}>
                                                                                </RadioComponent>
                                                                            </Radio.Group>
                                                                        </Col>
                                                                        <Col span={14}>
                                                                            {user.fName}
                                                                        </Col>
                                                                        <Col span={7} className="text-right">
                                                                            {(bill.totalCost / bill.user.length).toFixed(2)} ฿
                                                                </Col>
                                                                    </Row>
                                                                </Col>
                                                                :
                                                                null
                                                        }
                                                    </>
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
                                                        {bill.receivingAccount}
                                                    </Row>
                                                    <Row>
                                                        {bill.bankName} {bill.payMentNumber}
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
                                                        bill={bill}
                                                        lineGroupID={LineGroup}
                                                        userSelected={value}
                                                    />
                                                </Row>
                                            </AntFormItem>
                                        </AntForm>
                                    </Row>
                                </>
                                :
                                <WrapperLoading>
                                    <RowLoading justify="center">
                                        <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                            ขณะนี้ยังไม่มีบิลเรียกเก็บเงินที่ถูกสร้าง
                                        </h2>
                                        <AntForm className="container">
                                            <AntFormItem>
                                                <Col span={24}>
                                                    <Link to={`/CreateBill`}>
                                                        <PrimaryButton type="primary" size={"large"}
                                                            block htmlType="button"
                                                        >สร้างบิล</PrimaryButton>
                                                    </Link>
                                                </Col>
                                            </AntFormItem>
                                        </AntForm>
                                    </RowLoading>
                                </WrapperLoading>
                            }
                        </>
                    )
                })}
            </Wrapper >
        )
    }
}
export default withRouter(PayBill);