import React from 'react';
import ReactDOM from 'react-dom';
import 
{ BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import App from './App';
import CreateTrip from './linepage/CreateTrip';
import Home from './webpage/Home';
import CreateJoinRoom from './webpage/CreateJoinRoom';
import JoinedRoom from './webpage/JoinedRoom';
import MyOwnerRoom from './webpage/MyOwnerRoom';
import Profile from './webpage/Profile';
import CheckTrip from './linepage/CheckTrip';


// ReactDOM.render
// (<App />, 
// document.getElementById('root')
// );

ReactDOM.render(
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
                <MyOwnerRoom/>
            </Route>
            <Route path="/">
                <App />
            </Route>
        </Switch>
        
    </Router>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

