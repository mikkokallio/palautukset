const t = [1, -1, 3]

t.push(5)

console.log(t.length) // tulostuu 4
console.log(t[1])     // tulostuu -1

t.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
})   



const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // tulostuu [1, -1, 3]
console.log(t2) // tulostuu [1, -1, 3, 5]


const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // tulostuu [2, 4, 6]


const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// tulostuu [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]


const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // tulostuu 1, 2
console.log(rest)          // tulostuu [3, 4 ,5]



const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
  }
  
  const object12 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
  }
  
  const object3 = {
    name: {
      first: 'Juha',
      last: 'Tauriainen',
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
  }


  console.log(object1.name)         // tulostuu Arto Hellas
const fieldName = 'age' 
console.log(object1[fieldName])    // tulostuu 35


object1.address = 'Tapiola'
object1['secret number'] = 12341

//

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }

  const result = sum(1, 5)
  console.log(result)

  const square = p => {
    console.log(p)
    return p * p
  }

  const square = p => p * p

  const t = [1, 2, 3]
  const tSquared = t.map(p => p * p)
  // tSquared on nyt [1, 4, 9]



  const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>
          Hello {name}, you are {age} years old
        </p>
        <p>So you were probably born {bornYear()}</p>
      </div>
    )
  }

  // State, counter

  import React, { useState } from 'react'
  import ReactDOM from 'react-dom'
  
  const App = (props) => {
    const [ counter, setCounter ] = useState(0)
  
    setTimeout(
      () => setCounter(counter + 1),
      1000
    )
  
    return (
      <div>{counter}</div>
    )
  }
  
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )

  // button click, helper function, destructuring

  const Display = ({ counter }) => <div>{counter}</div>

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />     
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}

// complex state, multiple states

const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
  
  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
  
  const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
  
    const handleLeftClick = () => {
      setAll(allClicks.concat('L'))
      setLeft(left + 1)
    }
  
    const handleRightClick = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
    }
  
    return (
      <div>
        <div>
          {left}
          <Button onClick={handleLeftClick} text='left' />
          <Button onClick={handleRightClick} text='right' />
          {right}
          <History allClicks={allClicks} />
        </div>
      </div>
    )
  }

  //TODO: debuggaus!!!!!


  // Hooks

  // Event handler returns a function - optional for this course!

  const App = (props) => {
    const [value, setValue] = useState(10)
  
    const setToValue = (newValue) => () => {
      setValue(newValue)
    }
  
    return (
      <div>
        {value}
        <button onClick={setToValue(1000)}>thousand</button>
        <button onClick={setToValue(0)}>reset</button>
        <button onClick={setToValue(value + 1)}>increment</button>
      </div>
    )
  }

  // VS

  const Display = props => <div>{props.value}</div>

  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  
  const App = props => {
    const [value, setValue] = useState(10)
  
    const setToValue = newValue => {
      setValue(newValue)
    }
  
    return (
      <div>
        <Display value={value} />
        <Button handleClick={() => setToValue(1000)} text="thousand" />
        <Button handleClick={() => setToValue(0)} text="reset" />
        <Button handleClick={() => setToValue(value + 1)} text="increment" />
      </div>
    )
  }