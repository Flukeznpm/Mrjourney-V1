import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import App from './App';
import CreateTrip from './linepage/CreateTrip';
import Home from './webpage/Home';
import CreateJoinRoom from './webpage/CreateJoinRoom';
import CreateJoinRoomV2 from './webpage/CreateJoinRoomV2';
import JoinedRoom from './webpage/JoinedRoom';
import MyOwnerRoom from './webpage/MyOwnerRoom';
import CurrentJoinRoom from './webpage/CurrentJoinRoom';
import Profile from './webpage/Profile';
import CheckTrip from './linepage/CheckTrip';
import LoginPage from './webpage/LoginPage';
import FirstTimeLogin from './webpage/FirstTimeLogin';
<<<<<<< HEAD
import { HookProvider } from './store/HookProvider'
=======
import { CounterProvider } from './store/CounterProvider'
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede

// ReactDOM.render
// (<App />, 
// document.getElementById('root')
// );

ReactDOM.render(
<<<<<<< HEAD
    <HookProvider>
=======
    <CounterProvider>
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede
        <Router>
            <Switch>
                <Route path="/CheckTrip" >
                    <CheckTrip />
                </Route>
                <Route path="/CreateTrip">
                    <CreateTrip />
                </Route>
                <Route path="/CreateJoinRoom" >
                    <CreateJoinRoom />
                </Route>
<<<<<<< HEAD
                <Route path="/CreateJoinRoomV2" >
                    <CreateJoinRoomV2 />
                </Route>
=======
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede
                <Route path="/JoinedRoom">
                    <JoinedRoom />
                </Route>
                <Route path="/Home">
                    <Home />
                </Route>
                <Route path="/Profile">
                    <Profile />
                </Route>
                <Route path="/MyOwnerRoom">
                    <MyOwnerRoom />
                </Route>
                <Route path="/CurrentJoinRoom">
                    <CurrentJoinRoom />
                </Route>
                <Route path="/LoginPage">
                    <LoginPage />
                </Route>
                <Route path="/FirstTimeLogin">
                    <FirstTimeLogin />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
<<<<<<< HEAD
    </HookProvider>
=======
    </CounterProvider>
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

