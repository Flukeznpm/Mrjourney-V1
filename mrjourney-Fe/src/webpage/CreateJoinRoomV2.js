import React, { useContext } from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import CreateRoomStep1 from '../components/CreateRoom/CreateRoomStep1';
import CreateRoomStep2 from '../components/CreateRoom/CreateRoomStep2';
import CreateRoomStep3 from '../components/CreateRoom/CreateRoomStep3';
import FooterWebPage from '../components/Footer/FooterWebPage';
import { HookContext } from '../store/HookProvider'
import CreateRoomStep1V2 from '../components/CreateRoom/CreateRoomStep1V2';
import CreateRoomStep2V2 from '../components/CreateRoom/CreateRoomStep2V2';

function CreateJoinRoom() {
    const { step } = useContext(HookContext)


    const handleRoomComponent = () => {
        switch (step) {
            case 1:
                return <CreateRoomStep1V2
                >
                </CreateRoomStep1V2>
            case 2:
                return <CreateRoomStep2V2
                >
                </CreateRoomStep2V2>
            case 3:
                return <CreateRoomStep3
                >
                </CreateRoomStep3>
        }
    }
    
    const onhandleFormText = async (e) => {
        let value = e.target.value
        let name = e.target.name
        await this.setState(prevState => ({
            Room: {                   // object that we want to update
                ...prevState.Room,   // keep all other key-value pairs
                [name]: value,  // update the value of specific key
            }
        }))
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

export default CreateJoinRoom;


