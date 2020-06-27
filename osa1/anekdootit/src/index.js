import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const App = (props) => {
  const giveRandom = (number) => {
    let rnd = Math.floor(Math.random() * props.anecdotes.length)
    if (rnd === number) rnd++
    if (rnd === props.anecdotes.length) rnd = 0
    return rnd
  }

  const initArray = (number) => {
    let arr = []
    for (let i = 0; i < number; i++) {
      arr.push(0)
    }
    return arr
  }

  const [selected, setSelected] = useState(giveRandom())
  const [points, setPoints] = useState(initArray(props.anecdotes.length))
  const randomize = () => setSelected(giveRandom(selected))
  const popular = points.indexOf(Math.max(...points))
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    randomize()
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => vote()} text="vote" />
      <Button handleClick={() => randomize()} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[popular]}</p>
      <p>has {points[popular]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)