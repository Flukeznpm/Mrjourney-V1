import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
        return <div>loading</div>
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
                                        {totalDate.event.map((events) => {
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