import React from 'react';
import './static/css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CreateTrip from './linepage/CreateTrip';
import Home from './webpage/Home';
import CreateJoinRoom from './webpage/CreateJoinRoom';
import JoinRoom from './webpage/JoinRoom';
import AllMyOwnerRoom from './webpage/AllMyOwnerRoom';
import AllMyJoinedRoom from './webpage/AllMyJoinedRoom';
import CurrentJoinRoom from './webpage/CurrentJoinRoom';
import CheckTrip from './linepage/CheckTrip';
import LoginPage from './webpage/LoginPage';
import FirstTimeLogin from './webpage/FirstTimeLogin';
import 'antd/dist/antd.css';
import Profile from './webpage/Profile';
import NotMatchPage from './NotMatchPage';
import RoomHistoryJoin from './components/JoinedRoom/RoomHistoryJoin.js/View';
import Rating from './linepage/Rating';
import CreateBill from './linepage/CreateBill';
import WeatherPage from './webpage/WeatherPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/Rating">
          <Rating />
        </Route>
        <Route path="/WeatherPage">
          <WeatherPage />
        </Route>
        <Route path="/CreateBill">
          <CreateBill />
        </Route>
        <Route path="/CheckTrip" >
          <CheckTrip />
        </Route>
        <Route path="/CreateTrip">
          <CreateTrip />
        </Route>
        <Route path="/CreateJoinRoom" >
          <CreateJoinRoom />
        </Route>
        <Route path="/JoinRoom">
          <JoinRoom />
        </Route>
        <Route path="/RoomHistoryJoin">
          <RoomHistoryJoin />
        </Route>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/AllMyOwnerRoom">
          <AllMyOwnerRoom />
        </Route>
        <Route path="/AllMyJoinedRoom">
          <AllMyJoinedRoom />
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

