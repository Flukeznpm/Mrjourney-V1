import React from 'react';
import './static/css/App.css';
import { Link } from 'react-router-dom';
import Home from './webpage/Home'

class App extends React.Component {

  render() {
    return (
      <div>
        <Home></Home>
      </div>
    );
  }
}

export default App;
