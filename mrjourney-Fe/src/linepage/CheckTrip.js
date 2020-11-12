import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row
} from 'antd';
import { withRouter } from 'react-router-dom';

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

function CheckTrip(props) {

    const [tripList, setTripList] = useState([{}])
    const [tripEvent, setTripEvent] = useState([{}])
    const [loading, isLoading] = useState(true)

    useEffect(async () => {
        isLoading(true)
        await axios.get(`http://localhost:5000/trip?lineGroupID=Cbdab6c9dbd52c75350407118ed11983a`)
            .then(res => {
                setTripList(res.data)
                isLoading(false)
            });

    }, [])
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
                CheckTrip {console.log(tripList)}
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
                        </>
                    )
                })}
            </div>
        )
    }
}
export default withRouter(CheckTrip);