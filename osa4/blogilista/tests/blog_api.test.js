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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('a valid blog can be added', async () => {
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

test('blog added without likes gets 0 likes', async () => {
  await api
    .post('/api/blogs')
    .send(noLikesBlog)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

  const lastBlog = blogsAfter.filter(blog => blog.title === 'My Unliked Blog')[0]

  expect(lastBlog.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
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

test('blog has an id', async () => {
  const allBlogs = await helper.blogsInDb()

  expect(allBlogs[0].id).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})






