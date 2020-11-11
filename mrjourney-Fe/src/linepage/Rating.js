import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Rate,
    Form as AntForm,
    Button as AntButton
} from 'antd';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 20px 30px 20px 30px;
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
    height: 155px;
    width: 100%;
    object-fit: cover;
    border-radius: 14px;
`;

const PrimaryButton = styled(AntButton)`
    margin-top: 20px;
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
    .ant-form-item {
        margin-bottom: 0px;
    }
    .ant-form-item-label {
        padding-bottom: 0px;
    }
`;

const RateComponent = styled(Rate)`
    padding: 10px;
    .ant-rate-star {
        color: ${props => (props.theme.color.primary)};
        font-size: 40px;
    }
`;

const TripNameText = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`;

function Rating(props) {

    const [rating, setRating] = useState(0)
    const [loading, isLoading] = useState(true)
    const [tripList, setTripList] = useState([{}])
    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')

    useEffect(() => {
        liff.init({ liffId: '1653975470-q8mJvPdV' }).then(async () => {
            if (liff.isLoggedIn()) {
                if (!LineGroup || LineGroup === '') {
                    let profile = await liff.getProfile();
                    setLineID(profile.userId);
                    setLineName(profile.displayName);
                    setLinePicture(profile.pictureUrl);
                    const context = await liff.getContext();
                    setLineGroup(context.groupId)
                } else {
                    await axios.get(`https://mrjourney-senior.herokuapp.com/trip?lineGroupID=${LineGroup}`)
                        .then(res => {
                            setTripList(res.data)
                            isLoading(false)
                        });
                }
            } else {
                props.history.push('/Home');
            }
        })
    }, [LineGroup]);

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
                            <AntFormItem name="ratingOne" label="ความเพรียบพร้อม" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntFormItem>
                            <AntFormItem name="ratingTwo" label="ความคุ้มค่า" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntFormItem>
                            <AntFormItem name="ratingThree" label="ความสนุก" labelCol={{ span: 24 }} rules={[{ required: true }]}>
                                <RateComponent allowHalf />
                            </AntFormItem>
                            <AntFormItem>
                                <PrimaryButton type="primary" size={"large"} block htmlType="เสร็จสิ้น">ถัดไป</PrimaryButton>
                            </AntFormItem>
                        </AntForm>
                    </Col>
                </Row>
            </Wrapper>
        )
    }
}
export default withRouter(Rating);