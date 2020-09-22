import React, { useContext } from 'react';
import '../static/css/App.css';
import CreateTripStep1 from '../components/CreateTrip/CreateTripStep1';
import CreateTripStep2 from '../components/CreateTrip/CreateTripStep2';
import NavWebPage from '../components/Nav/NavWebPage';
import FooterWebPage from '../components/Footer/FooterWebPage';
import CreateTripStep3 from '../components/CreateTrip/CreateTripStep3';
import { HookContext } from '../store/HookProvider'

function CreateTrip() {
    const { tripStep } = useContext(HookContext)

    const handleTripComponent = () => {
        if (tripStep === 1) {
            return <CreateTripStep1></CreateTripStep1>
        } if (tripStep === 2) {
            return <CreateTripStep2></CreateTripStep2>
        } if (tripStep === 3) {
            return <CreateTripStep3></CreateTripStep3>
        }
    }

    return (
        <div className="flex-wrapper">
            <div className="top-page">
                {/* <div className="Navbar-Component">
                    <NavWebPage></NavWebPage>
                </div> */}
                <div className="Content-Component">
                    {handleTripComponent()}
                </div>
            </div>
        </div>
    )
}
export default CreateTrip;


