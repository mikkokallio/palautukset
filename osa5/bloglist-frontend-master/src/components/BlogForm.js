import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  return (
    <div>
      <h2>Create a new blog post</h2>

      <form onSubmit={addBlog}>
        <p>title: <input id='title'
          value={title}
          onChange={handleTitleChange}
        /></p>
        <p>author: <input id='author'
          value={author}
          onChange={handleAuthorChange}
        /></p>
        <p>url: <input id='url'
          value={url}
          onChange={handleUrlChange}
        /></p>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm