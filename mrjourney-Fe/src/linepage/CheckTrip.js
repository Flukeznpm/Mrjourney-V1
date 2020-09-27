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

    useEffect(() => {
        liff.init({ liffId: '1653975470-4Webv3MY' }).then(async () => {
            if (liff.isLoggedIn()) {
                let profile = await liff.getProfile();
                setLineID(profile.userId);
                setLineName(profile.displayName);
                setLinePicture(profile.pictureUrl);
                const context = await liff.getContext();
                setLineGroup(context.groupId)
            } else {
                props.history.push('/Home');
            }
            await axios.get(`https://mrjourney-senior.herokuapp.com/trip?lineGroupID=${LineGroup}&lineID=${LineID}`)
                .then(res => {
                    setTripList(res.data)
                });
        });
    }, [])


    return (
        <div className="text-center">
            CheckTrip
            {tripList.map((tripList) => {
                return (
                    <div>
                        {tripList.Date}
                    </div>
                )
            })}

        </div>
    )
}
export default withRouter(CheckTrip);