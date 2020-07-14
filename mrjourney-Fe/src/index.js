import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import App from './App';
import CreateTrip from './linepage/CreateTrip';
import Home from './webpage/Home';
import CreateJoinRoom from './webpage/CreateJoinRoom';
import JoinedRoom from './webpage/JoinedRoom';
import MyOwnerRoom from './webpage/MyOwnerRoom';
import CurrentJoinRoom from './webpage/CurrentJoinRoom';
import Profile from './webpage/Profile';
import CheckTrip from './linepage/CheckTrip';
import LoginPage from './webpage/LoginPage';
import FirstTimeLogin from './webpage/FirstTimeLogin';
import { HookProvider } from './store/HookProvider'
import momentjs from 'moment'
import 'moment/locale/th'
momentjs.locale('th')

ReactDOM.render(
    <HookProvider>
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
    </HookProvider>
    , document.getElementById('root')
);

