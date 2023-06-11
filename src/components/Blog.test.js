import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

describe('<Blog/>', () => {
  const blog = {
    title: 'testing react app',
    author: 'Acadamind',
    likes: 3,
    url: 'https://www.acadamind.io',
    user: {
      id: '5a43e6b6c37f3d065eaaa581',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }

  const activeUser = {
    id: '5a43e6b6c37f3d065eaaa581',
    username: 'mluukkai',
    name: 'Matti Luukkainen',
  }

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        hendleDelete={deleteBlog}
        user={activeUser}
        updateBlog={updateBlog}
      />
    ).container
  })

  test('render blog title and author by default', () => {
    const span = container.querySelector('.basic-details')

    expect(span).toHaveTextContent('testing react app by Acadamind')
  })

  test('does not render blog url and likes by defult', () => {
    const urlElement = screen.queryByText('https://www.acadamind.io')
    const likeElement = screen.queryByText(3)

    expect(likeElement).toBeNull()
    expect(urlElement).toBeNull()
  })

  test('show blog url and likes on click of view button', async () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const urlElement = container.querySelector('.blog-url')
    const likesElement = container.querySelector('.blog-likes')

    expect(urlElement).toHaveTextContent('https://www.acadamind.io')
    expect(likesElement).toHaveTextContent('likes 3')
  })

  test('calls like button handler twice if like button is clicked twice', () => {
    /*click view button to expand blog */
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    /*once blog is expanded, click on like button twice*/
    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})

describe('<CreateBlogForm/>', () => {
  const addBlog = jest.fn()
  beforeEach(() => {
    render(<CreateBlogForm addBlog={addBlog} />)
  })

  test('input values are updated correctly', async () => {
    const [titleInput, authorInput, urlInput] = screen.getAllByRole('textbox')

    userEvent.type(titleInput, 'How to learn React')
    userEvent.type(authorInput, 'Net ninja')
    userEvent.type(urlInput, 'http://netninja.io')

    expect(titleInput.value).toBe('How to learn React')
    expect(authorInput.value).toBe('Net ninja')
    expect(urlInput.value).toBe('http://netninja.io')
  })

  test('calls onSubmit on click of add button', async () => {
    const addbutton = screen.getByText('Add')
    userEvent.click(addbutton)

    expect(addBlog).toHaveBeenCalledTimes(1)
  })

  test('calls onSubmit with the right input values', async () => {
    const titleInput = screen.getByPlaceholderText('enter blog title')
    const authorInput = screen.getByPlaceholderText('enter blog author')
    const urlInput = screen.getByPlaceholderText('enter blog url')

    userEvent.type(titleInput, 'How to learn React')
    userEvent.type(authorInput, 'Net ninja')
    userEvent.type(urlInput, 'http://netninja.io')

    const blog = {
      title: 'How to learn React',
      author: 'Net ninja',
      url: 'http://netninja.io',
    }

    const addbutton = screen.getByText('Add')
    userEvent.click(addbutton)

    expect(addBlog.mock.calls[0][0]).toEqual(blog)
  })
})
