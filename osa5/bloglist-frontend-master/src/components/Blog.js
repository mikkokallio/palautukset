import React from 'react'
import Togglable from './Togglable'

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
        {blog.title} {blog.author} <button onClick={() => del(blog)}>delete</button>
        <Togglable buttonLabel="info">
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p><button className='like' onClick={() => onClick(blog)}>like</button>
          <p>{blog.user ? blog.user.name : 'no user'}</p>
        </Togglable>
      </div>
    </div>
  )
}
export default Blog