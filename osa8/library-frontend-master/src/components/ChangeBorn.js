import React, { useState } from 'react'
import Select from 'react-select'
import { gql, useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BORN } from '../queries.js'

const ChangeBorn = (props) => {
  const [editBorn] = useMutation(CHANGE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })
  const [name, setName] = useState({})
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  //const authors = result.map(a => a.name)

  const authors = !result.loading ?
    result.data.allAuthors.map(a => {
      return { value: a.name, label: a.name }
    }) : []

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const nameValue = name.value
    const year = parseInt(born)

    editBorn({ variables: { nameValue, year } })

    console.log('change year...')

    setName({})
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            onChange={(target) => {
              setName(target)
              console.log(target)}}
            options={authors}
          />
        </div>
        <div>
          born in
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default ChangeBorn