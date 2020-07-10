const notificationReducer = (state = {}, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {...state, message: action.message}
    default:
      return state
  }
}

const setMessage = message => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  }
}

const removeMessage = () => {
  return {
    type: 'SET_NOTIFICATION',
    message: ''
  }
}

let id

export const setMessageWithTimeout = (message, time) => {
  return async (dispatch, getState) => {
    dispatch(setMessage(message))
    if (id) clearTimeout(id)
    id = setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export default notificationReducer