import {useReducer} from 'react';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { v4 as uuidv4 } from 'uuid';

import {SET_ALERT, REMOVE_ALERT} from '../types'

const AlertState = ({children}) => {
  const initialState = []
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set alert
  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {msg, type, id}
    })

     //remove alert
    setTimeout(() => {
      dispatch({type: REMOVE_ALERT, payload: id})
    }, 4000);
  }

  return <AlertContext.Provider value={{
    setAlert,
    alerts: state
  }}>
  {children}
  </AlertContext.Provider>
}

export default AlertState