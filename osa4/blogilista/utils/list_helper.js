var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => blogs
  .map(blog => blog.likes)
  .reduce((a, b) => a + b)

const favoriteBlog = blogs => blogs.length === 0 ? null : blogs
  .filter(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
  .map(({ __v, _id, url, ...blog }) => blog)[0]

// Reduce to obj containing names and #, get the one with high #, and form a new obj from it
const mostBlogs = blogs => blogs.length === 0 ? null : Object.entries(blogs
  .reduce((a, blog) => {
    a[blog.author] = (a[blog.author] || 0) + 1
    return a
  }, {}))
  .sort((a, b) => b[1] - a[1])
  .map(author => ({"author": author[0], "blogs": author[1]}))[0]

/*const mostBlogs = blogs => blogs.length === 0 ? null : _.countBy(blogs, 'author')*/

const mostLikes = blogs => blogs.length === 0 ? null : Object.entries(blogs
  .reduce((a, blog) => {
    a[blog.author] = (a[blog.author] || 0) + blog.likes
    return a
  }, {}))
  .sort((a, b) => b[1] - a[1])
  .map(author => ({"author": author[0], "likes": author[1]}))[0]

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}