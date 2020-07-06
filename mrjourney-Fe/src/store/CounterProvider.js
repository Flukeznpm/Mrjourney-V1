
import React, { createContext, useReducer } from "react"

export const CounterContext = createContext({})

const initialState = {
  counter: 0,
  step: 1
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COUNTER":
      return {
        ...state, // copy state 
        counter: state.counter + action.payload // set state counter
      }
    case "SUB_COUNTER":
      return {
        ...state, // copy state 
        counter: state.counter - action.payload // set state counter
      }
    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + action.payload
      }
    case "PREV_STEP":
      return {
        ...state,
        step: state.step - action.payload
      }
  }
}

export const CounterProvider = ({ children }) => {
  const [counterState, counterDispatch] = useReducer(
    counterReducer,
    initialState
  )

  const { counter } = counterState

  const addCounter = payload =>
    counterDispatch({ type: "ADD_COUNTER", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const subCounter = payload =>
    counterDispatch({ type: "SUB_COUNTER", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  const [stepState, stepDispatch] = useReducer(
    counterReducer,
    initialState
  )

  const { step } = stepState

  const nextStep = payload =>
    stepDispatch({ type: "NEXT_STEP", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const prevStep = payload =>
    stepDispatch({ type: "PREV_STEP", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <CounterContext.Provider
      value={{
        counter,
        step,
        addCounter,
        subCounter,
        nextStep,
        prevStep
      }}>
      {children}
    </CounterContext.Provider>
  )
}