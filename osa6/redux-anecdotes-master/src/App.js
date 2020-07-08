import React from 'react'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App