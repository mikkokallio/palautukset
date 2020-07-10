import React, { useEffect } from 'react'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialize } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize()) 
  },[dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdotes />
      <Filter />
      <NewAnecdote />
    </div>
  )
}

export default App