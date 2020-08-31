import React, { useEffect, useState } from 'react';
import '../../static/css/Joined-Room.css';
import "../../static/css/App.css";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'

function ShowMembers(props) {
    const [lineID, setLineID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [members, setMember] = useState([{}])

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setDisplayName(user.displayName)
            setPictureURL(user.pictureURL)
            setLineID(user.lineID)
        }
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let getRoomID = params.get('roomID');

        axios.get(`http://localhost:5000/room/members?roomID=${getRoomID}`)
            .then(res => {
                setMember(res.data)
            })
    }, [])

    return (
        <div className="col-3 bg-showmember pt-3">
            <div className="Members-in-Room">
                <div className="container">
                    <h1>Members</h1>
                    <div className="showmembers-list">
                        <div class="showmember" >
                            {members.map((members, key) => {
                                return (
                                    <>
                                        <div class="row py-2">
                                            <div class="col-3">
                                                <img src={members.pictureURL} class="image_outer_container" />
                                            </div>
                                            <div class="col-9 mt-2">
                                                {members.fName}
                                                {key === 0 ? <i class="fas fa-crown text-warning float-right" /> : null}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ShowMembers;