import React, { useContext, useEffect, useState } from 'react';
import { HookContext } from '../../store/HookProvider';
import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies'
import { Tabs, Tab } from 'react-bootstrap'
import '../../static/css/App.css';
import '../../static/css/Profile.css';

function ProfileMoreDetails(props) {
    const [lineID, setLineID] = useState("")
    const [BioDetails, setBioDetails] = useState("");
    const [isEditBio, setEditBio] = useState(false);
    const { handleSubmit, errors } = useForm();

    useEffect(() => {
        let loadJWT = cookie.load('jwt');
        if (loadJWT === undefined) {
            props.history.push('/Home');
        } else {
            var user = jwt.verify(loadJWT, 'secreatKey');
            setLineID(user.lineID)
        }
    }, [])

    const handleBio = (e) => {
        setBioDetails(e)
    }

    const onEditBio = (bio) => {
        setEditBio(true)
        setBioDetails(bio)
    }

    const onCancel = (e) => {
        setEditBio(false)
    }

    const onSubmit = () => {
        let dataUpdateBio = {
            lineID: lineID,
            bio: BioDetails
        }
        axios.put('http://localhost:5000/accountProfile/editBio', dataUpdateBio)
            .then(async (res) => {
                console.log(res)
            })
        setEditBio(false)
    };

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                defaultActiveKey="Bio">
                <Tab eventKey="Bio" title="Bio">
                    <div className="py-3">
                        {isEditBio === false ?
                            <>
                                {props.accBio.bio !== "" ?
                                    <>{props.accBio.bio}</>
                                    : `กรุณาเพิ่มข้อมูลของคุณ`}
                                <button type="submit" className="mt-3 btn btn-warning btn-block text-white"
                                    onClick={() => onEditBio(props.accBio.bio)}>แก้ไขข้อมูล</button>
                            </>
                            :
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <textarea class="form-control"
                                    name="BioDetails"
                                    placeholder="กรอกคำอธิบายความเป็นตัวคุณ"
                                    value={BioDetails}
                                    onChange={(e) => handleBio(e.target.value, e.target.name)}
                                />
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <button type="button" className="btn-block btn btn-danger text-white"
                                            onClick={() => onCancel()}>ยกเลิกแก้ไข</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" className="btn-block btn btn-success text-white"
                                            onClick={() => onSubmit()}>ยืนยันข้อมูล</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </Tab>
                <Tab eventKey="HisRoom" title="History Room">ShowRoom</Tab>
                <Tab eventKey="HisTrip" title="History Trip">ShowTrip</Tab>
            </Tabs>
        </div>
    )
}

export default ProfileMoreDetails;