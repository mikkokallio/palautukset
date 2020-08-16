import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title,
    published,
    author
  }
}
`

export const ADD_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $year: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $year,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const CHANGE_BORN = gql`
  mutation editBorn($nameValue: String!, $year: Int!) {
    editAuthor(
      name: $nameValue,
      setBornTo: $year
    ) {
      name
      born
    }
  }
`
