
import React, { createContext, useReducer } from "react"

export const HookContext = createContext({})

const initialState = {
  counter: 0,
  step: 1
}

const hookReducer = (state, action) => {
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

export const HookProvider = ({ children }) => {
  const [counterState, counterDispatch] = useReducer(
    hookReducer,
    initialState
  )

  const { counter } = counterState

  const addCounter = payload =>
    counterDispatch({ type: "ADD_COUNTER", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const subCounter = payload =>
    counterDispatch({ type: "SUB_COUNTER", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  const [stepState, stepDispatch] = useReducer(
    hookReducer,
    initialState
  )

  const { step } = stepState

  const nextStep = payload =>
    stepDispatch({ type: "NEXT_STEP", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const prevStep = payload =>
    stepDispatch({ type: "PREV_STEP", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <HookContext.Provider
      value={{
        counter,
        step,
        addCounter,
        subCounter,
        nextStep,
        prevStep
      }}>
      {children}
    </HookContext.Provider>
  )
}