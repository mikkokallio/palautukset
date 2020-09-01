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
query ($genre: String!){
  allBooks (genre: $genre) {
    title,
    published,
    genres
  }
}
`

export const ME = gql`
query {
  me {
    username,
    favoriteGenre
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
    }
  }  
`