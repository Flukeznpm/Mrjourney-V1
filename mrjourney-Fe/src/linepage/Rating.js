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
import Swal from 'sweetalert2';
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

    const [loading, isLoading] = useState(true)
    const [tripList, setTripList] = useState([{}])
    const [owner, setOwner] = useState('')
    const [ratingOne, setRatingOne] = useState(0)
    const [ratingTwo, setRatingTwo] = useState(0)
    const [ratingThree, setRatingThree] = useState(0)

    useEffect(async () => {
        isLoading(true)
        await axios.get(`${process.env.REACT_APP_FE_PATH}/trip?lineGroupID=Cbdab6c9dbd52c75350407118ed11983a`)
            .then(res => {
                setTripList(res.data)
                isLoading(false)
            });
    }, [])

    const onChangeRatingOne = e => {
        setRatingOne(e)
    }

    const onChangeRatingTwo = e => {
        setRatingTwo(e)
    }

    const onChangeRatingThree = e => {
        setRatingThree(e)
    }

    const onFinish = async (e) => {
        let dataRating = {
            lineID: owner,
            preparation: ratingOne,
            value: ratingTwo,
            entertainment: ratingThree
        }
        await axios.post(`http://localhost:5000/trip/score`, dataRating)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'สร้างห้องสำเร็จ!',
                    text: 'ขอให้คุณสนุกกับการท่องเที่ยว',
                    showCancelButton: true,
                    confirmButtonText: `เข้าสู่ห้อง`,
                    confirmButtonColor: '#31CC71',
                    cancelButtonText: 'กลับสู่หน้าหลัก',
                })
            });
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
                        <>
                            <TripNameText>
                                {trip.tripName}
                            </TripNameText>
                            <Row justify="center">
                                <Col span={24} className="text-center">
                                    <AntForm onFinish={onFinish}>
                                        <AntForm.Item name="ratingOne" label="ความเพรียบพร้อม" labelCol={{ span: 24 }}>
                                            <RateComponent allowHalf onChange={onChangeRatingOne} />
                                        </AntForm.Item>
                                        <AntForm.Item name="ratingTwo" label="ความคุ้มค่า" labelCol={{ span: 24 }}>
                                            <RateComponent allowHalf onChange={onChangeRatingTwo} />
                                        </AntForm.Item>
                                        <AntForm.Item name="ratingThree" label="ความสนุก" labelCol={{ span: 24 }}>
                                            <RateComponent allowHalf onChange={onChangeRatingThree} />
                                        </AntForm.Item>
                                        <AntFormItem>
                                            <PrimaryButton onClick={() => setOwner(trip.ownerTrip)} type="primary" size={"large"} block htmlType="เสร็จสิ้น">ถัดไป</PrimaryButton>
                                        </AntFormItem>
                                    </AntForm>
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </Wrapper>
        )
    }
}
export default withRouter(Rating);