import React, { useContext } from 'react';
import './static/css/App.css';
import Home from './webpage/Home'
import PreviewPage from './components/Preview/PreviewPage';
import { HookContext } from './store/HookProvider'

function App() {
    const { counter, step, addCounter, subCounter, nextStep, prevStep } = useContext(HookContext)
    return (
      <div>
        <Home></Home>
        <PreviewPage></PreviewPage>
      </div>
    );
  }

export default App;
