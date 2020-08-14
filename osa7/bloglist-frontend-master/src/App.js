import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { Alert, Button } from 'react-bootstrap'
import { createStore, combineReducers } from 'redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { type: action.data.type, message: action.data.message }
    default:
      return state
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_BLOGS':
      return action.data.blogs
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'SET_BLOGS':
      return action.data
    default:
      return state
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const User = ({ users }) => {
  const id = useParams().id
  console.log(id)
  const user = users.find(n => n.id === id)
  console.log('user ', user)
  if (!user) {
    return (<div>Loading...</div>)
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Has added blogs:</p>
      <ul>
        {
          user.blogs.map((blog, i) =>
            <li id={i} key={user.id}>{blog.title}</li>
          )
        }
      </ul>
    </div>)
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(res =>
      setUsers(res)
    ).then(console.log('users_ ', users))
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      store.dispatch({
        type: 'ADD_ALL_BLOGS', data: { blogs }
      })
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      store.dispatch({ type: 'SET_USER', data: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userLogin)
      )

      blogService.setToken(userLogin.token)
      store.dispatch({ type: 'SET_USER', data: userLogin })

      setUsername('')
      setPassword('')
      store.dispatch({
        type: 'SET_NOTIFICATION', data: { message: `welcome ${userLogin.username}!`, type: 'success' }
      })
      setTimeout(() => {
        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: '', type: '' }
        })
      }, 5000)

    } catch (exception) {
      store.dispatch({
        type: 'SET_NOTIFICATION', data: { message: 'wrong username or password', type: 'danger' }
      })
      setTimeout(() => {
        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: '', type: '' }
        })
      }, 5000)
    }
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(entry => {
        console.log('entry: ', entry)
        store.dispatch({ type: 'ADD_BLOG', data: entry })
        //setBlogs(blogs.concat(entry))
        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: `${entry.title} by ${entry.author} added`, type: 'success' }
        })
        setTimeout(() => {
          store.dispatch({
            type: 'SET_NOTIFICATION', data: { message: '', type: '' }
          })
        }, 5000)
      })
      .catch(error => {
        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: 'An error occurred', type: 'danger' }
        })
        setTimeout(() => {
          store.dispatch({
            type: 'SET_NOTIFICATION', data: { message: '', type: '' }
          })
        }, 5000)
      })
  }

  const delBlog = target => {
    blogService
      .remove(target.id)
      .then(entry => {
        console.log(entry)
        const copy = blogs.filter(blog => blog.id !== target.id)
        store.dispatch({ type: 'SET_BLOGS', data: copy })

        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: `${target.title} deleted`, type: 'success' }
        })
        setTimeout(() => {
          store.dispatch({
            type: 'SET_NOTIFICATION', data: { message: '', type: '' }
          })
        }, 5000)

      })
      .catch(error => {
        store.dispatch({
          type: 'SET_NOTIFICATION', data: { message: 'error occurred', type: 'error' }
        })
        setTimeout(() => {
          store.dispatch({
            type: 'SET_NOTIFICATION', data: { message: '', type: '' }
          })
        }, 5000)
      })
  }

  const addComment = (blog, comment) => {
    let blogObject = blog.blog
    if (!blogObject.comments) blogObject.comments = []
    blogObject.comments.push(blog.comment)
    
    blogService
      .comment(blogObject.id, blogObject.comments)
      .then(entry => {
        console.log(entry)
        const copy = store.getState().blogs
          .map(mapped => mapped.id === blogObject.id ? blogObject : mapped)
          .sort((a, b) => b.likes - a.likes)
        store.dispatch({ type: 'SET_BLOGS', data: copy })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addLike = blog => {
    let blogObject = blog
    blogObject.likes++

    console.log('Blog: ', blogObject)

    blogService
      .update(blog.id, blogObject)
      .then(entry => {
        console.log(entry)
        const copy = store.getState().blogs
          .map(mapped => mapped.id === blog.id ? blogObject : mapped)
          .sort((a, b) => b.likes - a.likes)
        store.dispatch({ type: 'SET_BLOGS', data: copy })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const logout = async () => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    store.dispatch({ type: 'SET_USER', data: null })
  }

  const blogs = store.getState().blogs
  console.log('blogs: ')

  const blogComp = () => (
    <div>
      <Button onClick={logout}>logout</Button>
      <h2>blogs</h2>
      {
        blogs.map((blog, i) =>
          <p id={i} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
        )
      }
    </div>)

  const blogFormRef = useRef()

  console.log('store state', store.getState())

  const notification = store.getState().notification
  const user = store.getState().user

  return (
    <Router>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user ? <p>{user.name} logged in</p> : <p>logged out</p>}
      </div>

      <Switch>
        <Route path="/users/:id">
          <User users={users} />
        </Route>
        <Route path="/users">
          <div className='container'>
            <h2>Users</h2>
            {
              users.map((user, i) =>
                <p id={i} key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> has posted {user.blogs.length} blogs</p>
              )
            }
          </div>
        </Route>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} del={delBlog} onClick={addLike} addComment={addComment} />
        </Route>
        <Route path="/">
          <div className='container'>
            {(notification.message &&
              <Alert variant={notification.type}>
                {notification.message}
              </Alert>
            )}
            {user === null ?
              <Togglable buttonLabel='login'>
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) => setUsername(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}
                  handleSubmit={handleLogin}
                />
              </Togglable> :
              <div>

                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm
                    createBlog={addBlog}
                  />
                </Togglable>
                {blogComp()}
              </div>
            }
          </div>

        </Route>
      </Switch>

      <div>
        <i>Blogs app</i>
      </div>
    </Router>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App