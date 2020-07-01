const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


const testBlog = {
  title: "My First Blog",
  author: "Mikko Koo",
  url: "www.example.com",
  likes: 13
}

const noLikesBlog = {
  title: "My Unliked Blog",
  author: "Mikko Koo",
  url: "www.example.com"
}

test('a blog has an id', async () => {
  const allBlogs = await helper.blogsInDb()

  expect(allBlogs[0].id).toBeDefined()
})

describe('adding a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  
  test('succeeds with 200 if valid', async () => {
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAfter.map(blog => blog.title)
  
    expect(titles).toContain(
      'My First Blog'
    )
  })
  
  test('gets 0 likes if has no likes', async () => {
    await api
      .post('/api/blogs')
      .send(noLikesBlog)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
  
    const lastBlog = blogsAfter.filter(blog => blog.title === 'My Unliked Blog')[0]
  
    expect(lastBlog.likes).toBe(0)
  })
  
  test('fails with 400 if no title or url', async () => {
    const newBlog = {
      url: "www.example.com"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAfter = await helper.blogsInDb()
  
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })  
})

afterAll(() => {
  mongoose.connection.close()
})






