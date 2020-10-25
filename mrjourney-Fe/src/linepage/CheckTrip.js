import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function CheckTrip(props) {
    const [LineID, setLineID] = useState('')
    const [LineName, setLineName] = useState('')
    const [LinePicture, setLinePicture] = useState('')
    const [LineGroup, setLineGroup] = useState('')
    const [tripList, setTripList] = useState([{}])
    const [loading, isLoading] = useState(true)

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
        });

    }, [LineGroup])
    if (loading) {
        return <div>loading {LineGroup}</div>
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
                        </>
                    )
                })}
            </div>
        )
    }
}
export default withRouter(CheckTrip);