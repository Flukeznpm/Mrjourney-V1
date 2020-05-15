import React from 'react';
import './static/css/App.css';
import { Link } from 'react-router-dom';
import momentjs from 'moment'

class App extends React.Component {

  render() {
    return (
      <div>
        <Link to="/CreateTrip" >
          <button>Create</button>
        </Link>
        <Link to="/Home" >
          <button>Home</button>
        </Link>
        <Link to="/Profile" >
          <button>Profile</button>
        </Link>
        <Link to="/CreateJoinRoom" >
          <button>CreateJoinRoom</button>
        </Link>




      </div>


    );
  }
}

export default App;
