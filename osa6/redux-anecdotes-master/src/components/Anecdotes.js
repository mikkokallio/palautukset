import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

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

  const addVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setMessage(`voted for ${content}`))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handler={() => addVote(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default Anecdotes