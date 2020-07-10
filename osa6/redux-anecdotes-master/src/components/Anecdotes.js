import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessageWithTimeout } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handler }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handler}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log(filter.filter)
    let list = anecdotes.sort((a, b) => b.votes - a.votes)
    if (filter.type === 'SET_FILTER' && filter.filter) {
      list = list.filter(anecdote => anecdote.content.includes(filter.filter))
    }
    return list
  })

  const addVote = anecdote => {
    dispatch(vote(anecdote))
    dispatch(setMessageWithTimeout(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handler={() => addVote(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes