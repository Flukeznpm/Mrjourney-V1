import React, { useContext } from 'react';
import './static/css/App.css';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import Home from './webpage/Home'
import PreviewPage from './components/Preview/PreviewPage';
=======
import { CounterContext } from './store/CounterProvider'
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede

function Headline(props) {
  if(props.step === 1){
    const greeting = 'Hello Function Component!';
    return <h1>{greeting}</h1>;
  }
  if(props.step === 2){
    const greeting = 'Hello Function Component2222!';
    return <h1>{greeting}</h1>;
  }
}

function App() {
    const { counter, step, addCounter, subCounter, nextStep, prevStep } = useContext(CounterContext)
    return (
      <div>
<<<<<<< HEAD
        <Home></Home>
        <PreviewPage></PreviewPage>
=======
        <h1>{counter}</h1>
        <div style={{ display: "flex" }}>
          <button style={{}} onClick={() => addCounter(1)}>
            Add
          </button>
          <button onClick={() => subCounter(1)}>Sub</button>
        </div>
        <h1>Step {step}</h1>
        <div style={{ display: "flex" }}>
          <button style={{}} onClick={() => nextStep(1)}>
            Add
          </button>
          <button onClick={() => prevStep(1)}>Sub</button>
        </div>
        <Headline step={step} />
>>>>>>> e68397699073545bffb1d6070314bd59996c0ede
      </div>
    );
  }

export default App;
