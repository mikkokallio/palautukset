const notificationReducer = (state = '', action) => {

    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      default:
        return state
    }
  }

  const setMessage = (id, message) => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
  }

  const removeMessage = (id) => {
    return {
      type: 'SET_NOTIFICATION',
      message: ''
    }
  }

  export const setMessageWithTimeout = (message, time) => {
    return async dispatch => {
      const id = new Date()
      dispatch(setMessage(id, message))

      setTimeout(() => {
        dispatch(removeMessage(id))
      }, time * 1000)
    }
  }

  export default notificationReducer