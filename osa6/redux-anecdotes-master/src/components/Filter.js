import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => dispatch(filterChange({type: 'SET_FILTER', filter: event.target.value}))} />
    </div>
  )
}

export default Filter