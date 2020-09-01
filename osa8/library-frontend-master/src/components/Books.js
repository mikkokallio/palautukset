import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, { variables: { genre }})

  if (!props.show) {
    return null
  }

  const books = !result.loading && !result.error ? result.data.allBooks : []
  console.log(books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
      <button onClick={() => setGenre('agile')}>agile</button>
      <button onClick={() => setGenre('patterns')}>patterns</button>
      <button onClick={() => setGenre('design')}>design</button>
      <button onClick={() => setGenre('crime')}>crime</button>
      <button onClick={() => setGenre('classic')}>classic</button>
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books