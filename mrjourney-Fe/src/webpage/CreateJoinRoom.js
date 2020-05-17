import React from 'react';
import NavWebPage from '../components/Nav/NavWebPage';
import '../static/css/App.css';
import CreateRoomStep1 from '../components/CreateRoom/CreateRoomStep1';
import CreateRoomStep2 from '../components/CreateRoom/CreateRoomStep2';
import CreateRoomStep3 from '../components/CreateRoom/CreateRoomStep3';
import FooterWebPage from '../components/Footer/FooterWebPage';

class CreateJoinRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            StepComponent: 1,
            Room: {
                roomName: '',
                roomCover: '',
                province: '',
                startDate: '',
                endDate: '',
                tripDetails: '',
                qrCode: '',
                maxMember: 0,
                genderCondition: '',
                ageCondition: '',
            }
        }
    }

    onhandleFormText = async (e) => {
        let value = e.target.value
        let name = e.target.name
        await this.setState(prevState => ({
            Room: {                   // object that we want to update
                ...prevState.Room,   // keep all other key-value pairs
                [name]: value,  // update the value of specific key
            }
        }))
    }

    handleMemberMinus = () => {
        this.setState(prevState => ({
            Room: {
                ...prevState.Room,
                maxMember: this.state.Room.maxMember - 1
            }
        }))
    }

    handleMemberPlus = () => {
        this.setState(prevState => ({
            Room: {
                ...prevState.Room,
                maxMember: this.state.Room.maxMember + 1
            }
        }))
    }

    handleRoomComponent = () => {
        if (this.state.StepComponent === 1) {
            return <CreateRoomStep1
                handleStep={this.handleNextComponent}
                RoomForm={this.state.Room}
                handleForm={this.onhandleFormText}
            >
            </CreateRoomStep1>
        } if (this.state.StepComponent === 2) {
            return <CreateRoomStep2
                handleStep={this.handleNextComponent}
                RoomForm={this.state.Room}
                handleForm={this.onhandleFormText}
                handleMemberFormMinus={this.handleMemberMinus}
                handleMemberFormPlus={this.handleMemberPlus}
                handlePreviousStep={this.handlePreviousComponent}
            >
            </CreateRoomStep2>
        } if (this.state.StepComponent === 3) {
            return <CreateRoomStep3
                RoomForm={this.state.Room}
                handlePreviousStep={this.handlePreviousComponent}
            >
            </CreateRoomStep3>
        }
    }

    handleNextComponent = async () => {
        if (this.state.StepComponent !== 3) {
            await this.setState({ StepComponent: this.state.StepComponent + 1 })
        }
    }

    handlePreviousComponent = async () => {
        if (this.state.StepComponent !== 1) {
            await this.setState({ StepComponent: this.state.StepComponent - 1 })
        }
    }

    render() {
        return (
            <div className="flex-wrapper">
                <div className="top-page">
                    <NavWebPage></NavWebPage>
                </div>
                <div className="Content-Component">
                    {this.handleRoomComponent()}
                </div>
                <div className="footer-page">
                    <FooterWebPage></FooterWebPage>
                </div>
            </div >
        )
    }
}

export default CreateJoinRoom;


