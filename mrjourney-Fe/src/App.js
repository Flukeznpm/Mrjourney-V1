import React, { useContext } from 'react';
import './static/css/App.css';
import { Link } from 'react-router-dom';
import { CounterContext } from './store/CounterProvider'

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
      </div>
    );
  }

export default App;
