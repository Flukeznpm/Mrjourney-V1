import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Rate,
    Form as AntForm,
    Button as AntButton,
    Descriptions
} from 'antd';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 30px 30px 30px 30px;
    font-size: 24px;
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

const ImgCover = styled.img`
    height: 175px;
    width: 100%;
    object-fit: cover;
    border-radius: 14px;
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

const RateComponent = styled(Rate)`
    .ant-rate-star {
        color: ${props => (props.theme.color.primary)};
        font-size: 25px;
        /* padding: 5px; */
    }
`;

const TripNameText = styled.div`
    padding-top: 20px; 
    padding-bottom: 20px;
`;

function Rating(props) {

    const [rating, setRating] = useState(0)
    const [loading, isLoading] = useState(true)
    const [tripList, setTripList] = useState([{}])

    useEffect(async () => {
        isLoading(true)
        await axios.get(`http://localhost:5000/trip?lineGroupID=Cbdab6c9dbd52c75350407118ed11983a`)
            .then(res => {
                setTripList(res.data)
                isLoading(false)
            });

    }, [])

    const onFinish = values => {
        setRating(values.ratingOne + values.ratingTwo + values.ratingThree)
    };

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
                <ImgCover src="/img/pr-01.png" />
                {tripList.map((trip) => {
                    return (
                        <TripNameText>
                            {trip.tripName}
                        </TripNameText>
                    )
                })}
                <Row justify="center">
                    <Col span={24} className="text-center">
                        <AntForm onFinish={onFinish}>
                            <AntForm.Item name="ratingOne" label="ความเพรียบพร้อม" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntForm.Item>
                            <AntForm.Item name="ratingTwo" label="ความคุ้มค่า" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntForm.Item>
                            <AntForm.Item name="ratingThree" label="ความสนุก" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntForm.Item>
                            <AntFormItem>
                                <PrimaryButton type="primary" size={"large"} block htmlType="เสร็จสิ้น">ถัดไป</PrimaryButton>
                            </AntFormItem>
                        </AntForm>
                    </Col>
                    <p>
                        Result : {rating}
                    </p>
                </Row>
            </Wrapper>
        )
    }
}
export default withRouter(Rating);