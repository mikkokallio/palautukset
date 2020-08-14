import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {
  useParams
} from "react-router-dom"

const Blog = ({ blogs, onClick, del, addComment }) => {
  const [comment, setComment] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  console.log(blog)

  const addComm = (event) => {
    event.preventDefault()
    addComment({ blog, comment })

    setComment('')
  }

  const handleCommentChange = (event) => setComment(event.target.value)

  if (!blog) {
    return (<div>No data.</div>)
  }

  return (
    <div style={blogStyle} className='blog' id={id}>
      <div>
        {blog.title} {blog.author} <Button onClick={() => del(blog)}>delete</Button>
        <p>{blog.url}</p>
        <p>{blog.likes} likes</p><Button className='like' onClick={() => onClick(blog)}>like</Button>
        <p>{blog.user ? blog.user.name : 'no user'}</p>
        {blog.comments ?
        <div>
        <h4>comments</h4>
        <ul>
          {
            blog.comments.map((comment, i) =>
              <li id={i} key={i}>{comment}</li>
            )
          }
        </ul> </div>:
        <p>No comments</p>
        }
        <Form onSubmit={addComm}>
        <Form.Label>comment:</Form.Label><Form.Control id='comment'
          value={comment}
          onChange={handleCommentChange}
        />
        <Button type="submit">add</Button>
      </Form>
      </div>
    </div>
  )
}
export default Blog