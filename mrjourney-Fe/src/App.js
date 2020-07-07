import React from 'react';
import './static/css/App.css';
import { Link } from 'react-router-dom';
import Home from './webpage/Home'
import PreviewPage from './components/Preview/PreviewPage';

class App extends React.Component {

  render() {
    return (
      <div>
        <Home></Home>
        <PreviewPage></PreviewPage>
      </div>
    );
  }
}

export default App;
