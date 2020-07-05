import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(entry => {
        console.log(entry)
        setBlogs(blogs.concat(entry))
        setMessage(`${entry.title} by ${entry.author} added`)
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

  const delBlog = target => {
    blogService
      .remove(target.id)
      .then(entry => {
        console.log(entry)
        const copy = blogs.filter(blog => blog.id !== target.id)
        setBlogs(copy)
        setMessage(`${entry.title} deleted`)
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

  const addLike = blog => {
    let blogObject = blog
    blogObject.likes++

    console.log('Blog: ', blogObject)

    blogService
      .update(blog.id, blogObject)
      .then(entry => {
        console.log(entry)
        const copy = blogs
          .map(mapped => mapped.id === blog.id ? blogObject : mapped)
          .sort((a, b) => b.likes - a.likes)
        setBlogs(copy)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const logout = async (event) => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    setUser(null)
  }

  const blogComp = () => (
    <div>
      <button onClick={logout}>logout</button>
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onClick={addLike} del={delBlog} />
        )
      }
    </div>)

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={message} type={notificationType} />
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
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogComp()}
        </div>
      }
    </div>
  )
}

export default App