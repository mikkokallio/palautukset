import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jorma',
    url: 'www.example.com'
  }

  let component, like

  beforeEach(() => {
    like = jest.fn()

    component = render(
      <Blog blog={blog} onClick={like}/>
    )
  })

  test('renders content', () => {
    component.debug()

    const div = component.container.querySelector('.blog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'Jorma'
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.example.com')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('info')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.example.com')
  })

  test('like button event fires twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(like.mock.calls).toHaveLength(2)
  })
})
//console.log(prettyDOM(div))