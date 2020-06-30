import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Button = (props) => {
  const buttonStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <button style={buttonStyle} type={props.type} onClick={props.onClick}>{props.text}</button>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const Filter = (props) => (
  <div>filter shown with <input
    value={props.filter}
    onChange={props.handler}
  /></div>
)

const Numbers = (props) => (
  <div>
    <h2>Numbers</h2>
    {props.callback().map(person =>
      <div key={person.name}>{
        person.name} {person.number}
        <Button text='delete' onClick={() => props.deleted(person)} />
      </div>
    )}
  </div>
)

const Form = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input
        value={props.nameValue}
        onChange={props.nameHandler}
      />
    </div>
    <div>
      number: <input
        value={props.numberValue}
        onChange={props.numberHandler}
      />
    </div>
    <div>
      <Button type='submit' text='add' />
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  const hook = () => {
    personService
      .getAll()
      .then(list => setPersons(list))
  }

  useEffect(hook, [])

  const delNumber = target => {
    if (!window.confirm(`Delete ${target.name}?`)) return
    personService
      .remove(target.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== target.id))
        setErrorMessage(`${target.name} deleted`)
        setNotificationType('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
  }

  const addNumber = event => {
    event.preventDefault()

    const numberObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      if (!window.confirm(`${newName} is already in the phonebook. Replace number with new?`)) return

      const id = persons.filter(person => person.name === newName)[0].id
      personService
        .update(id, numberObject)
        .then(entry => {
          setPersons(persons.map(person => person.id !== id ? person : numberObject))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${newName}'s number updated`)
          setNotificationType('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        )
        .catch(error => {
          setErrorMessage(`Note '${newName}' was already removed from server`)
          setNotificationType('error')

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    } else {
      personService
        .create(numberObject)
        .then(entry => {
          console.log(entry)
          setPersons(persons.concat(entry))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${newName} added`)
          setNotificationType('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setNotificationType('error')

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterNames = () => {
    if (filter === '') return persons
    const list = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    if (list.length === 0) return [{ name: 'No entries found' }]
    return list
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={notificationType} />
      <Filter
        filter={filter}
        handler={handleFilterChange}
      />
      <h2>add a new</h2>
      <Form
        onSubmit={addNumber}
        nameValue={newName}
        nameHandler={handleNameChange}
        numberValue={newNumber}
        numberHandler={handleNumberChange}
      />
      <Numbers callback={filterNames} deleted={delNumber} />
    </div>
  )

}

export default App