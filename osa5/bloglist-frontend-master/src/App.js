import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = event => {
    event.preventDefault()

    const blogObject = { title, author, url }
    blogService
      .create(blogObject)
      .then(entry => {
        console.log(entry)
        setBlogs(blogs.concat(entry))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`${title} by ${author} added`)
        setNotificationType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setNotificationType('error')

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const logout = async (event) => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <p>title: <input
        value={title}
        onChange={handleTitleChange}
      /></p>
      <p>author: <input
        value={author}
        onChange={handleAuthorChange}
      /></p>
      <p>url: <input
        value={url}
        onChange={handleUrlChange}
      /></p>
      <button type="submit">save</button>
    </form>
  )

  const blogComp = () => (
    <div>
      <button onClick={logout}>logout</button>
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>)

  return (
    <div>
      <Notification message={message} type={notificationType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          {blogComp()}
        </div>
      }
    </div>
  )
}

export default App