import React, { useContext } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import CreateRoomStep1 from '../components/CreateRoom/CreateRoomStep1';
import CreateRoomStep2 from '../components/CreateRoom/CreateRoomStep2';
import CreateRoomStep3 from '../components/CreateRoom/CreateRoomStep3';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { HookContext } from '../store/HookProvider'

function CreateJoinRoomHook() {
    const { step } = useContext(HookContext)

    const handleRoomComponent = () => {
        if (step === 1) {
            return <CreateRoomStep1
            >
            </CreateRoomStep1>
        } if (step === 2) {
            return <CreateRoomStep2
            >
            </CreateRoomStep2>
        } if (step === 3) {
            return <CreateRoomStep3
            >
            </CreateRoomStep3>
        }
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                <NavWebPage></NavWebPage>
            </div>
            <div className="Content-Component">
                {handleRoomComponent()}
            </div>
            <div className="footer-page">
                <FooterWebPage></FooterWebPage>
            </div>
        </div >
    )
}

export default CreateJoinRoomHook;


