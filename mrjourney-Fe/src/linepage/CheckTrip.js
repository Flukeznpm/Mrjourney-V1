import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row,
    Button as AntButton,
} from 'antd';
import { withRouter } from 'react-router-dom';
import DeleteTripModal from '../components/components/DeleteTripModal';

const Wrapper = styled.div`
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

function CheckTrip(props) {
    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')
    const [tripList, setTripList] = useState([{}])
    const [loading, isLoading] = useState(true)
    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        liff.init({ liffId: '1653975470-4Webv3MY' }).then(async () => {
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

    const onVisibleModal = () => {
        setVisible(true)
    }

    if (loading) {
        return (
            <Wrapper>
                <RowLoading justify="center">
                    <LoadingGif src="/gif/loading.gif" alt="loading..." />
                </RowLoading>
            </Wrapper>
        )
    } else {
        return (
            <div className="text-center">
                CheckTrip
                {tripList.map((trip) => {
                    return (
                        <>
                            {trip.tripName}
                            {trip.totalDate.map((totalDate) => {
                                return (
                                    <>
                                        {totalDate.eventDate}
                                        {totalDate.events.map((events) => {
                                            return (
                                                <>
                                                    {events.eventName}
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                            <div className="container col-md-6 fixed-bottom">
                                <PrimaryButton type="primary" size={"large"} block onClick={() => onVisibleModal()}>ปิดทริป</PrimaryButton>
                                <DeleteTripModal
                                    isVisible={isVisible}
                                    setVisible={setVisible}
                                    lineGroupID={LineGroup}
                                    lineID={LineID}
                                    tripID={trip.tripID}
                                />
                            </div>
                        </>
                    )
                })}
            </div >
        )
    }
}
export default withRouter(CheckTrip);