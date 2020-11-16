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
import MoneyModal from '../../components/components/MoneyModal'
import BankPayment from '../../components/components/Modal/BankPayment';
import CreateBillModal from '../../components/components/Modal/CreateBillModal'
import { Link } from 'react-router-dom';

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

    const [loading, isLoading] = useState(true)

    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')

    const [totalBill, setTotalBill] = useState(0)
    const [billName, setBillName] = useState('')
    const [isVisibleMoney, setVisibleMoney] = useState(false)
    const [isVisiblePayment, setVisiblePayment] = useState(false)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [whoPay, setWhoPay] = useState([])
    const [receivingAcc, setReceivingAcc] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [bankName, setBankName] = useState("");

    const [billList, setBillList] = useState([{}]);

    useEffect(() => {
        liff.init({ liffId: '1653975470-6rJYy1Qm' }).then(async () => {
            if (liff.isLoggedIn()) {
                if (!LineGroup || LineGroup === '') {
                    let profile = await liff.getProfile();
                    setLineID(profile.userId);
                    setLineName(profile.displayName);
                    setLinePicture(profile.pictureUrl);
                    const context = await liff.getContext();
                    setLineGroup(context.groupId)
                    isLoading(true)
                } else {
                    await axios.get(`${process.env.REACT_APP_FE_PATH}/bill/allBill?lineGroupID=${LineGroup}`)
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

    const handleBill = (value) => {
        setTotalBill(value)
    }
    const handleBillName = (value) => {
        setBillName(value)
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
    const onDeleteMember = (key) => {
        let array = [...whoPay];
        array.splice(key, 1);
        setWhoPay(array)
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
                                <WrapperLoading>
                                    <RowLoading justify="center">
                                        <h2 className="col-12 font-weight-bold text-center color-default py-4">
                                            ขณะนี้มีบิลเรียกเก็บเงินเก่าที่ถูกสร้างอยู่แล้ว
                                        </h2>
                                        <AntForm className="container">
                                            <AntFormItem>
                                                <Col span={24}>
                                                    <Link to={`/CheckBill`}>
                                                        <PrimaryButton type="primary" size={"large"}
                                                            block htmlType="button"
                                                        >ดูบิล</PrimaryButton>
                                                    </Link>
                                                </Col>
                                            </AntFormItem>
                                        </AntForm>
                                    </RowLoading>
                                </WrapperLoading>
                                :
                                <>
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
                                            <Col span={24}>
                                                <AntParagraph
                                                    editable={{
                                                        onChange: (handleBillName),
                                                        maxLength: 20,
                                                    }}
                                                >
                                                    {billName}
                                                </AntParagraph>
                                            </Col>
                                        </Row>
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
                                            {whoPay.map((who, key) => {
                                                return (
                                                    <Col span={24}>
                                                        <Row justify="space-between">
                                                            <Col span={16}>
                                                                {who.fName}
                                                            </Col>
                                                            <Col span={6} className="text-right">
                                                                {(totalBill / whoPay.length).toFixed(2)}
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
                                                size="middle"
                                                icon={<PlusOutlined />}
                                                onClick={() => onVisibleMoneyModal()}
                                            />
                                            <MoneyModal
                                                isVisible={isVisibleMoney}
                                                setVisible={setVisibleMoney}
                                                setWhoPay={setWhoPay}
                                                whoPay={whoPay}
                                            />
                                        </Row>
                                        <Row>
                                            บัญชีเงินรับ
                    </Row>

                                        {receivingAcc ?
                                            <AntCard onClick={() => onVisiblePaymentModal()}>
                                                <Row>
                                                    <Col span={21}>
                                                        <Row>
                                                            {receivingAcc}
                                                        </Row>
                                                        <Row>
                                                            {bankName} {paymentNumber}
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
                                            setReceivingAcc={setReceivingAcc}
                                            setPaymentNumber={setPaymentNumber}
                                            setBankName={setBankName}>
                                        </BankPayment>
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
                                                    {receivingAcc && bankName && paymentNumber && whoPay && totalBill ?
                                                        <Col span={16}>
                                                            <PrimaryButton
                                                                type="primary"
                                                                size={"large"}
                                                                block htmlType="submit"
                                                                onClick={() => onVisibleConfirmModal()}
                                                            // onClick={() => onConfirmBill()}
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
                                                        LineName={LineName}
                                                        LineGroup={LineGroup}
                                                        LineID={LineID}
                                                        billName={billName}
                                                        receivingAcc={receivingAcc}
                                                        bankName={bankName}
                                                        paymentNumber={paymentNumber}
                                                        whoPay={whoPay}
                                                        totalBill={totalBill}
                                                    />
                                                </Row>
                                            </AntFormItem>
                                        </AntForm>
                                    </Row>
                                </>
                            }
                        </>
                    )
                })}
            </Wrapper>
        )
    }
}
export default withRouter(CreateBill);