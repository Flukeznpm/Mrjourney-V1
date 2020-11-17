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

function EditTrip(props) {

    const [tripEvent, setTripEvent] = useState([{}])
    const [loading, isLoading] = useState(true)
    const [user, setUser] = useState({ eventName: "นอนน", startEvent: "08:00", eventType: "travel", endEvent: "20:00" })

    useEffect(async () => {
        // setTripEvent(props.trip)
        isLoading(false)
    }, [])

    // const onAddEvent = (events) => {

    //     console.log(events);
    //     // setTripEvent(events.concat(user))
    // };

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
                {/* Edit<p></p> 
                TripName: {props.trip.tripName} <p></p>
                {props.trip.totalDate.map((totalDate) => {
                    return (
                        <>
                            TripDate: {totalDate.eventDate}<p></p>
                            {totalDate.events.map((events) => {
                                return (
                                    <>
                                        EventName: {events.eventName} &nbsp; {events.startEvent}-{events.endEvent}<p></p>
                                    </>
                                )
                            })}
                            <button type="button">addEvent</button> <p></p>
                        </>
                    )
                })} */}
            </div>
        )
    }
}
export default withRouter(EditTrip);