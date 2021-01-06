
import React, { createContext, useReducer } from "react"

export const HookContext = createContext({})

const initialState = {
  counter: 0,
  step: 1,
  tripStep: 1,
  thaiprovince:
    [
      'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
      'ขอนแก่น',
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
  keyModal: 0,
  Room: {
    roomName: '',
    roomCover: '',
    province: '',
    startDate: '',
    endDate: '',
    tripDetails: '',
    qrCode: '',
    maxMember: 1,
    genderCondition: '',
    ageCondition: '',
  },
  AccProfile: {
    fName: '',
    lName: '',
    birthday: '',
    gender: '',
    tel: ''
  }
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
    case "RESET_STEP":
      return {
        ...state,
        step: action.payload
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
    case "NEXT_TRIP_STEP":
      return {
        ...state,
        tripStep: state.tripStep + action.payload
      }
    case "PREV_TRIP_STEP":
      return {
        ...state,
        tripStep: state.tripStep - action.payload
      }
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
    case "HANDLE_ROOM":
      return {
        ...state,
        Room: {
          ...state.Room,
          [action.name]: action.value
        }
      }
    case "HANDLE_ACCPROFILE":
      return {
        ...state,
        AccProfile: {
          ...state.AccProfile,
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
    case "PLUS_MEMBER":
      return {
        ...state,
        Room: {
          ...state.Room,
          maxMember: state.Room.maxMember + action.payload
        }
      }
    case "MINUS_MEMBER":
      return {
        ...state,
        Room: {
          ...state.Room,
          maxMember: state.Room.maxMember - action.payload
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
    // "TripStep":
    case "CONFIRM_TRIP_STEP1":
      let AllTripDate = []
      for (let index = 0; index < state.Trip.numberAddDate; index++) {
        var startDate = new Date(state.Trip.date);
        startDate.setDate(startDate.getDate() + index);
        let ShowBox = {
          eventDate: startDate,
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
        tripStep: state.tripStep + action.payload
      }
    // Event
    case "SET_EVENT":
      let AllDate = state.Trip.totalDate
      AllDate[action.key].event.push(state.Event)
      if (state.Event.eventName && state.Event.startEvent && state.Event.endEvent) {
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
      } else {
        return false
      }
    case "DELETE_EVENT":
      let AllDateDelete = state.Trip.totalDate //new
      AllDateDelete[action.key].event.splice(action.keyE, 1)
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
    //Event Modal
    case "EVENT_MODAL_SHOW":
      return {
        ...state,
        keyModal: action.payload,
        addModalShow: true
      }
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
    //ShowRoom
    case "SHOW_ROOM_MODAL_SHOW":
      return {
        ...state,
        addModalShow: true,
        keyModal: action.payload
      }
    case "SHOW_ROOM_MODAL_CLOSE":
      return {
        ...state,
        addModalShow: false,
        keyModal: action.payload
      }
  }
}

export const HookProvider = ({ children }) => {
  const [hookState, hookDispatch] = useReducer(
    hookReducer,
    initialState
  )

  const { counter, step, tripStep, thaiprovince, Trip, Event, addModalShow, keyModal, Room, toDate, AccProfile } = hookState

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
  const confirmTripStep = payload =>
    hookDispatch({ type: "CONFIRM_TRIP_STEP1", payload })
  const nextTripStep = payload =>
    hookDispatch({ type: "NEXT_TRIP_STEP", payload })
  const prevTripStep = payload =>
    hookDispatch({ type: "PREV_TRIP_STEP", payload })
  const handleTripForm = (value, name) =>
    hookDispatch({ type: "HANDLE_TRIP", value, name })
  const handleEventForm = (value, name) =>
    hookDispatch({ type: "HANDLE_EVENT", value, name })
  const handleRoomForm = (value, name) =>
    hookDispatch({ type: "HANDLE_ROOM", value, name })
  const handleAccProfileForm = (value, name) =>
    hookDispatch({ type: "HANDLE_ACCPROFILE", value, name })
  const plusDate = payload =>
    hookDispatch({ type: "PLUS_DATE", payload })
  const minusDate = payload =>
    hookDispatch({ type: "MINUS_DATE", payload })
  const plusMember = payload =>
    hookDispatch({ type: "PLUS_MEMBER", payload })
  const minusMember = payload =>
    hookDispatch({ type: "MINUS_MEMBER", payload })
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
  const deleteEvent = (key, keyE) =>
    hookDispatch({ type: "DELETE_EVENT", key, keyE })
  const showRoomModalShow = payload =>
    hookDispatch({ type: "SHOW_ROOM_MODAL_SHOW", payload })
  const showRoomModalClose = payload =>
    hookDispatch({ type: "SHOW_ROOM_MODAL_CLOSE", payload })
  return (
    <HookContext.Provider
      value={{
        counter,
        step,
        tripStep,
        thaiprovince,
        Trip,
        Event,
        addModalShow,
        keyModal,
        Room,
        toDate,
        AccProfile,
        addCounter,
        subCounter,
        nextStep,
        prevStep,
        nextTripStep,
        prevTripStep,
        confirmTripStep,
        resetStep,
        handleTripForm,
        handleEventForm,
        handleRoomForm,
        handleAccProfileForm,
        plusDate,
        minusDate,
        plusMember,
        minusMember,
        setActiveEvent,
        setNotActiveEvent,
        setEvent,
        eventModalClose,
        selectEventType,
        eventModalShow,
        deleteEvent,
        showRoomModalShow,
        showRoomModalClose,
      }}>
      {children}
    </HookContext.Provider>
  )
}