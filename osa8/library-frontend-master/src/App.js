import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ChangeBorn from './components/ChangeBorn'
import LoginForm from './components/LoginForm'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ME } from './queries'
import Favorites from './components/Favorites'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [getMe, result] = useLazyQuery(ME)
  const [me, setMe] = useState(null)
  const client = useApolloClient()

  const loadMe = () => {
    console.log('logging in, me is: ', me)
    const test = getMe()
    console.log('got me, me is: ', test)
  }

  console.log('now me is, ', me)

  useEffect(() => {
    if (result.data) {
      setMe(result.data.me)
      console.log('just se me, me is: ', me)
    }
  }, [result])


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setError(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    setMe(null)
    console.log('logged out, me is: ', me)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        {error ? <div>NOTE: {error}</div> : null}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommend')}>recommended</button>: null}
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('edit')}>edit author</button> : null}
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {token && me ? me.username : null}
        {token ? <button onClick={() => logout()}>log out</button> : null}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Favorites
        show={page === 'recommend'}
        favorite={token && me ? me.favoriteGenre : ''}
      />

      <NewBook
        show={page === 'add'}
        setError={setError}
        updateCacheWith={updateCacheWith}
      />

      <ChangeBorn
        show={page === 'edit'}
      />

      {token ? null :
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={setError}
          setPage={setPage}
          loadMe={loadMe}
          client={client}
        />
      }

    </div>
  )
}

export default App