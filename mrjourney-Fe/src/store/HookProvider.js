
import React, { createContext, useReducer } from "react"
import momentjs from 'moment'

export const HookContext = createContext({})

const initialState = {
  counter: 0,
  step: 1,
  thaiprovince:
    [
      'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
      'ขอบแก่น',
      'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
      'ตรัง', 'ตราด', 'ตาก',
      'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราข', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
      'บึงกาฬ', 'บุรีรัมย์',
      'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
      'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา',
      'ภูเก็ต',
      'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
      'ยะลา', 'ยโสธร',
      'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
      'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
      'ศรีสะเกษ',
      'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
      'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ'
    ],
  Trip: {
    activeEvent: 0,
    tripName: '',
    province: '',
    date: '',
    numberAddDate: 1,
    totalDate: [{}]
  },
  addModalShow: false,
  Event: {
    eventName: '',
    startEvent: '',
    endEvent: '',
    eventType: '',

  },
  keyModal: 0
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
    // Step
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
    case "CONFIRM_TRIP_STEP1":

    // Handle
    case "HANDLE_TRIP":
      return {
        ...state,
        Trip: {
          ...state.Trip,
          [action.name]: action.value
        }
      }
    case "HANDLE_EVENT":
      return {
        ...state,
        Event: {
          ...state.Event,
          [action.name]: action.value
        }
      }
    // Plus&Minus Date Trip
    case "PLUS_DATE":
      return {
        ...state,
        Trip: {
          ...state.Trip,
          numberAddDate: state.Trip.numberAddDate + action.payload
        }
      }
    case "MINUS_DATE":
      return {
        ...state,
        Trip: {
          ...state.Trip,
          numberAddDate: state.Trip.numberAddDate - action.payload
        }
      }
    // Active Event
    case "ACTIVE_EVENT":
      return {
        ...state,
        Trip: {
          ...state.Trip,
          activeEvent: action.payload
        }
      }
    case "NOTACTIVE_EVENT":
      return {
        ...state,
        Trip: {
          ...state.Trip,
          activeEvent: action.payload - 1
        }
      }

    // Event
    case "SET_EVENT":
      let AllDate = state.Trip.totalDate
      AllDate[action.key].event.push(state.Event)
      return {
        ...state,
        Trip: {
          ...state.Trip,
          totalDate: AllDate
        },
        addModalShow: false,
        Event: {
          eventName: '',
          startEvent: '',
          endEvent: '',
          eventType: ''
        }
      }
    case "DELETE_EVENT":
      let AllDateDelete = state.Trip.totalDate //new
      const newAllEvent = AllDateDelete[action.key].event.filter(Event => {
        return Event !== action.eventDetail
      })
      AllDateDelete[action.key].event = newAllEvent
      return {
        ...state,
        Trip: {
          ...state.Trip,
          totalDate: AllDateDelete
        }
      }
    // Select Event Type
    case "SELECT_EVENT_TYPE":
      return {
        ...state,
        Event: {
          ...state.Event,
          eventType: action.payload
        }
      }
    case "EVENT_MODAL_SHOW":
      return {
        ...state,
        keyModal: action.payload,
        addModalShow: true
      }
    //Event Modal
    case "EVENT_MODAL_CLOSE":
      return {
        ...state,
        addModalShow: false,
        Event: {
          eventName: '',
          startEvent: '',
          endEvent: '',
          eventType: ''
        },
      }

    case "NEXT_STEP_1":
      let AllTripDate = []
      for (let index = 0; index < state.Trip.numberAddDate; index++) {
        let ShowBox = {
          eventDate: momentjs(state.Trip.date).add(index, 'day').format('ll'),
          event: []
        }
        AllTripDate.push(ShowBox)
      }
      return {
        ...state,
        Trip: {
          ...state.Trip,
          totalDate: AllTripDate
        },
        step: state.step + action.payload
      }
  }
}

export const HookProvider = ({ children }) => {
  const [hookState, hookDispatch] = useReducer(
    hookReducer,
    initialState
  )

  const { counter, step, thaiprovince, Trip, Event, addModalShow, keyModal } = hookState

  const addCounter = payload =>
    hookDispatch({ type: "ADD_COUNTER", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const subCounter = payload =>
    hookDispatch({ type: "SUB_COUNTER", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const nextStep = payload =>
    hookDispatch({ type: "NEXT_STEP", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const prevStep = payload =>
    hookDispatch({ type: "PREV_STEP", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const resetStep = payload =>
    hookDispatch({ type: "RESET_STEP", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const handleTripForm = (value, name) =>
    hookDispatch({ type: "HANDLE_TRIP", value, name })
  const handleEventForm = (value, name) =>
    hookDispatch({ type: "HANDLE_EVENT", value, name })
  const plusDate = payload =>
    hookDispatch({ type: "PLUS_DATE", payload })
  const minusDate = payload =>
    hookDispatch({ type: "MINUS_DATE", payload })
  const setActiveEvent = payload =>
    hookDispatch({ type: "ACTIVE_EVENT", payload })
  const setNotActiveEvent = payload =>
    hookDispatch({ type: "NOTACTIVE_EVENT", payload })
  const setEvent = (key) =>
    hookDispatch({ type: "SET_EVENT", key })
  const eventModalClose = payload =>
    hookDispatch({ type: "EVENT_MODAL_CLOSE", payload })
  const selectEventType = payload =>
    hookDispatch({ type: "SELECT_EVENT_TYPE", payload })
  const eventModalShow = payload =>
    hookDispatch({ type: "EVENT_MODAL_SHOW", payload })
  const confirmTripStep = payload =>
    hookDispatch({ type: "NEXT_STEP_1", payload })
  const deleteEvent = (eventDetail, key) =>
    hookDispatch({ type: "DELETE_EVENT", eventDetail, key })


  return (
    <HookContext.Provider
      value={{
        counter,
        step,
        thaiprovince,
        Trip,
        Event,
        addModalShow,
        keyModal,
        addCounter,
        subCounter,
        nextStep,
        prevStep,
        resetStep,
        handleTripForm,
        handleEventForm,
        plusDate,
        minusDate,
        setActiveEvent,
        setNotActiveEvent,
        setEvent,
        eventModalClose,
        selectEventType,
        eventModalShow,
        confirmTripStep,
        deleteEvent
      }}>
      {children}
    </HookContext.Provider>
  )
}