import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Favorites = (props) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre: props.favorite }})

  if (!props.show) {
    return null
  }

  const books = !result.loading && !result.error ? result.data.allBooks : []
  console.log(books)

  return (
    <div>
      <h2>recommended books in genre: {props.favorite}</h2>
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
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Favorites