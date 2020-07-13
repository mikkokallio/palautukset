import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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

      <Form onSubmit={addBlog}>
        <Form.Label>title:</Form.Label><Form.Control id='title'
          value={title}
          onChange={handleTitleChange}
        />
        <Form.Label>author:</Form.Label><Form.Control id='author'
          value={author}
          onChange={handleAuthorChange}
        />
        <Form.Label>url:</Form.Label><Form.Control id='url'
          value={url}
          onChange={handleUrlChange}
        />
        <Button type="submit">save</Button>
      </Form>
    </div>
  )
}

export default BlogForm