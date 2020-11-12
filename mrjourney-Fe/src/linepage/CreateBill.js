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
import BankPayment from '../components/components/Modal/BankPayment';

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
    const [isVisiblePayment, setVisiblePayment] = useState(false)
    const [membersM, setMemberM] = useState([])
    const [ownerName, setOwnerName] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentBank, setPaymentBank] = useState("");
    const [weather, setWeather] = useState([{}]);

    useEffect(async () => {
        // isLoading(false)
        let header = {
            Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlYjI0N2Y5YmJjMDRlNjk0ZDAyNjMyMDIyZmEwYWY0ZjNlYjU1MTZiNjVmZjllNTg5YTkzZGUyNjFlZmM5NzMwMTdjMzc2OTQxMmI2YjljIn0.eyJhdWQiOiIyIiwianRpIjoiY2ViMjQ3ZjliYmMwNGU2OTRkMDI2MzIwMjJmYTBhZjRmM2ViNTUxNmI2NWZmOWU1ODlhOTNkZTI2MWVmYzk3MzAxN2MzNzY5NDEyYjZiOWMiLCJpYXQiOjE2MDUxMjQyMzAsIm5iZiI6MTYwNTEyNDIzMCwiZXhwIjoxNjM2NjYwMjMwLCJzdWIiOiI5NzkiLCJzY29wZXMiOltdfQ.bUEK9H2ZEG7JzOKJ1YPKEHnxGLUVrD1InK-B6vqvpt-Ug6CvTtVcqY0Ppb4YQmJ_5-5vNwruB-LRfQj563lLjlqCbBmkudKoLE6ogA2xZGPmZoxeAQ2lhweWlwSJrxfXAI9A8KExwavFXQUPHDgkY4hx5Dqyakxbr_AHtQYNOY0wJugDiw9Zoty-SCbz9inWBZ69aSY590VF0Znf8UyFhIAUkj8ku5q44Kn0oB1YafHaJi4WFWoJBTEsp4ZOFkKI8auxH88hVqxr7oZzEDjoX0W7xagMb5hECFA9MSl5UO_-3TE2AS5WXdtnU2e8s9W22Zo_VpPwSdcVrCplF90JXXH3LC0MenlSpIgO4wpL2cg7DEfzyQPdaW7ZIoONea_FuMAq9-kcoU0QLOn9c-Wgv3ikTOzYisGCLSxXv2Zz1t0FgM86vKsdPd_3pvw4YR3qOvKPtlvHPv4uAXm0SXtAiABlibmXeAHZTkQ8tGn3bN-GFouUrbfYVeUIdrTdFAPIMyefbgdVjSK2ZHbWOx1UwXZM4FivwPKYaEhXf_2wOTfF424XcVZtcxX8HCPnCXVXSIVtMn9LXe6SZDLCEERYbRJ38AP8Pv2XlkUfCkJBIewfs5ttuj-kU2adHgzbtAx571ihsb1-Rh4W_mMr3NxUFrx3mls79qrW5EA7gLS7hhM"
        }
        axios.get(`https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=กรุงเทพมหานคร&amphoe=ทุ่งครุ&fields=tc_max,rh&date=2020-11-12&duration=1`, { headers: header })
            .then(res => {
                setWeather(res.data)
                isLoading(false)
            })
    }, [])

    const handleBill = (value) => {
        setTotalBill(value)
    }

    const onFinish = values => {

    };

    const onVisibleMoneyModal = () => {
        setVisibleMoney(true)
    }

    const onVisiblePaymentModal = () => {
        setVisiblePayment(true)
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
                        {membersM.map((members) => {
                            return (
                                <Col span={24}>
                                    <Row justify="space-between">
                                        <Col span={18}>
                                            {members}
                                        </Col>
                                        <Col span={6}>
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
                            setMemberM={setMemberM}
                            membersM={membersM}
                        />
                    </Row>
                    <Row>
                        บัญชีเงินรับ
                    </Row>
                    <Row className="p-5">
                        {weather.WeatherForecasts.map((weather) => {
                            return (
                                <>
                                {weather.location.province}
                                {weather.forecasts.map((forecasts) => {
                                    return (
                                        <>
                                    {forecasts.time}
                                        </>
                                    )
                                })}
                                </>
                            )
                        })}
                    </Row>
                    {ownerName ?
                        <>
                            <Row>
                                {ownerName}
                            </Row>
                            <Row>
                                {paymentBank} {paymentNumber}
                            </Row>
                        </>
                        :
                        ""
                    }
                    <Row>
                        <AddEventButton block
                            size={"large"} htmlType="submit"
                            onClick={() => onVisiblePaymentModal()}
                        >
                            <PlusOutlined />
                        </AddEventButton>
                        <BankPayment
                            isVisible={isVisiblePayment}
                            setVisible={setVisiblePayment}
                            setOwnerName={setOwnerName}
                            setPaymentNumber={setPaymentNumber}
                            setPaymentBank={setPaymentBank}
                        />
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