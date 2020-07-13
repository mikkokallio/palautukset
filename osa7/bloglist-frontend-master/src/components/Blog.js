import React from 'react'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, id, onClick, del }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog)

  return (
    <div style={blogStyle} className='blog' id={id}>
      <div>
        {blog.title} {blog.author} <Button onClick={() => del(blog)}>delete</Button>
        <Togglable buttonLabel="info">
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p><Button className='like' onClick={() => onClick(blog)}>like</Button>
          <p>{blog.user ? blog.user.name : 'no user'}</p>
        </Togglable>
      </div>
    </div>
  )
}
export default Blog