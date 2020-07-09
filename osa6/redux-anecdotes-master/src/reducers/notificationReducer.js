const notificationReducer = (state = '', action) => {

    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      default:
        return state
    }
  }

  export const setMessage = message => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
  }

  export const removeMessage = () => {
    return {
      type: 'SET_NOTIFICATION',
      message: ''
    }
  }

  export default notificationReducer