import React from 'react'
import { connect } from 'react-redux'
//import { useSelector } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(store => store.message)
  const notification = props.message.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}

export default connect(mapStateToProps)(Notification)