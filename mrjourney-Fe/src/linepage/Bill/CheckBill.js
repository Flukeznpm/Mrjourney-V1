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
import DeleteBillModal from '../../components/components/Modal/DeleteBillModal';
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

const PrimaryButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 12px;
    background: ${props => (props.theme.color.primary)};
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const DeleteButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 12px;
    background: #FF4647;
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background: ${props => (props.theme.color.primaryPress)};
        border: ${props => (props.theme.color.primaryPress)};
    }
`;

const ConfirmButton = styled(AntButton)`
    border-radius: 4px;
    font-size: 12px;
    background: #31CC71;
    border: ${props => (props.theme.color.primary)};
    &:hover , &:active, &:focus {
        background:  #31CC71;
        border:  #31CC71;
    }
`;

const AntFormItem = styled(AntForm.Item)`
    margin-bottom: 0px;
    padding: 10px;
`;

const RadioComponent = styled(Radio)`
`;


function CheckBill(props) {

    const [loading, isLoading] = useState(true)
    const [totalBill, setTotalBill] = useState(500)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)
    const [billList, setBillList] = useState([{}]);
    const [updateBill, setUpdateBill] = useState('');

    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')

    const [isUpdate, setUpdate] = useState(0)

    useEffect(() => {
        liff.init({ liffId: '1653975470-DEq4WP1a' }).then(async () => {
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
    }, [LineGroup, isUpdate]);

    const onFinish = values => {

    };

    const onVisibleConfirmModal = () => {
        setVisibleConfirm(true)
    }

    const onCancelAcceptBill = async (bill, user) => {
        let dataBill = {
            lineGroupID: LineGroup,
            billNo: bill.billNo,
            userID: user.userID
        }
        await axios.post(`https://mrjourney-senior.herokuapp.com/bill/cancleAcceptBill`, dataBill)
            .then(res => {
                console.log(res)
            });
        setUpdate(isUpdate - 1)
    }

    const onAcceptBill = async (bill, user) => {
        let dataBill = {
            lineGroupID: LineGroup,
            billNo: bill.billNo,
            userID: user.userID
        }
        await axios.post(`https://mrjourney-senior.herokuapp.com/bill/acceptBill`, dataBill)
            .then(res => {
                console.log(res)
                setUpdateBill(bill.billNo)
            });
        setUpdate(isUpdate + 1)
    }

    const closedLiff = () => {
        liff.closeWindow()
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

                                        {/* Can see only OwnerBill */}
                                        {LineID === bill.ownerBillID ?
                                            <AntCard className="my-3">
                                                <Row>
                                                    <Col span={24}>
                                                        <Row>
                                                            รอการยืนยัน
                                                        </Row>
                                                        {bill.user.map((user) => {
                                                            return (
                                                                <Row className="px-2 my-2">
                                                                    {user.waitAcceptStatus && user.payStatus === false ?
                                                                        <>
                                                                            <Col span={10}>
                                                                                {user.fName}
                                                                            </Col>
                                                                            <Col span={14} className="text-right">
                                                                                <Row justify="space-between">
                                                                                    <Col span={11}>
                                                                                        <ConfirmButton
                                                                                            type="primary"
                                                                                            size={"small"}
                                                                                            htmlType="submit"
                                                                                            onClick={() => alert('ยอมรับ')}
                                                                                            className="w-100"
                                                                                            onClick={() => onAcceptBill(bill, user)}
                                                                                        >ยอมรับ</ConfirmButton>
                                                                                    </Col>
                                                                                    <Col span={11}>
                                                                                        <PrimaryButton
                                                                                            type="primary"
                                                                                            size={"small"}
                                                                                            htmlType="submit"
                                                                                            onClick={() => alert('ยกเลิก')}
                                                                                            className="w-100"
                                                                                            onClick={() => onCancelAcceptBill(bill, user)}
                                                                                        >ยกเลิก</PrimaryButton>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </>
                                                                        :
                                                                        null
                                                                    }
                                                                </Row>
                                                            )
                                                        })}
                                                    </Col>
                                                </Row>
                                            </AntCard>
                                            :
                                            null
                                        }

                                        <AntCard className="my-3">
                                            <Row>
                                                <Col span={24}>
                                                    <Row>
                                                        คนที่จ่ายแล้ว
                                            </Row>
                                                    {bill.user.map((user) => {
                                                        return (
                                                            <Row className="px-2">
                                                                {user.payStatus === true ?
                                                                    <>
                                                                        <Col span={10}>
                                                                            {user.fName}
                                                                        </Col>
                                                                        <Col span={14} className="text-right">
                                                                            {(bill.totalCost / bill.user.length).toFixed(2)} ฿
                                                                </Col>
                                                                    </>
                                                                    :
                                                                    null
                                                                }
                                                            </Row>
                                                        )
                                                    })}
                                                </Col>
                                            </Row>
                                        </AntCard>

                                        <AntCard className="my-3">
                                            <Row>
                                                <Col span={24}>
                                                    <Row>
                                                        คนที่ยังไม่จ่าย
                                            </Row>
                                                    <Row>
                                                        {bill.user.map((user) => {
                                                            return (
                                                                <Col span={24} className="px-2">
                                                                    {user.payStatus === false ?
                                                                        <Row justify="space-between">
                                                                            <Col span={18}>
                                                                                {user.fName}
                                                                            </Col>
                                                                            <Col span={6} className="text-right">
                                                                                {(bill.totalCost / bill.user.length).toFixed(2)} ฿
                                                                </Col>
                                                                        </Row>
                                                                        :
                                                                        null
                                                                    }
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </AntCard>

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
                                    {LineID === bill.ownerBillID ?
                                        <Row justify="center" className="bg-white fixed-bottom">
                                            <AntForm className="container">
                                                <AntFormItem>
                                                    <Row>
                                                        <Col span={24}>
                                                            <DeleteButton
                                                                type="primary"
                                                                size={"large"}
                                                                block htmlType="submit"
                                                                onClick={() => onVisibleConfirmModal()}
                                                            >ลบบิล</DeleteButton>
                                                        </Col>
                                                        <DeleteBillModal
                                                            isVisible={isVisibleConfirm}
                                                            setVisible={setVisibleConfirm}
                                                            bill={bill}
                                                            lineGroupID={LineGroup}
                                                        />
                                                    </Row>
                                                </AntFormItem>
                                            </AntForm>
                                        </Row>
                                        :
                                        null
                                    }
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
                                                    <PrimaryButton type="primary" size={"large"}
                                                        block htmlType="button"
                                                        onClick={() => closedLiff()}
                                                    >กลับส่ห้องแชท</PrimaryButton>
                                                </Col>
                                            </AntFormItem>
                                        </AntForm>
                                    </RowLoading>
                                </WrapperLoading>
                            }
                        </>
                    )
                })}

            </Wrapper>
        )
    }
}
export default withRouter(CheckBill);