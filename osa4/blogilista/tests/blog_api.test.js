const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
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

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mkallio',
      name: 'Mikko Koo',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})






