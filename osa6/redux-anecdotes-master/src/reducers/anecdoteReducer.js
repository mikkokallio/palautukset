import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updated = action.data.updAnecdote
      return state.map(anecdote =>
        anecdote.id !== updated.id ? anecdote : updated
      )
    case 'CREATE_NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    case 'ZERO':
      return state
    default: return state
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'CREATE_NEW',
      data: newAnecdote,
    })
  }
}
export const vote = anecdote => {
  return async dispatch => {
    const changed = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const updAnecdote = await anecdoteService.updVotes(changed)
    dispatch({
      type: 'VOTE', data: { updAnecdote }
    })
  }
}

export default reducer