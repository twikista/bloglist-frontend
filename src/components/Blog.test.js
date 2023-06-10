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

  test('render blog title and author by default', () => {
    const { container } = render(<Blog blog={blog} />)
    // screen.debug()
    const span = container.querySelector('.basic-details')

    expect(span).toHaveTextContent('testing react app by Acadamind')
  })

  test('does not render blog url and likes by defult', () => {
    render(<Blog blog={blog} />)
    const urlElement = screen.queryByText('https://www.acadamind.io')
    const likeElement = screen.queryByText(3)

    expect(likeElement).toBeNull()
    expect(urlElement).toBeNull()
  })

  test('show blog url and likes on click of view button', async () => {
    // const user = userEvent.setup()
    const deleteBlog = jest.fn()
    const { container } = render(
      <Blog blog={blog} deleteBlog={deleteBlog} user={activeUser} />
    )
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const urlElement = container.querySelector('.blog-url')
    const likesElement = container.querySelector('.blog-likes')

    expect(urlElement).toHaveTextContent('https://www.acadamind.io')
    expect(likesElement).toHaveTextContent('likes 3')
  })

  test('calls like button handler twice if like button is clicked twice', () => {
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    render(
      <Blog
        blog={blog}
        hendleDelete={deleteBlog}
        user={activeUser}
        updateBlog={updateBlog}
      />
    )
    /*click view button to expand blog */
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    /*once blog is expanded, click on like button twice*/
    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })

  test('call onSubmit with the right values filled into input', async () => {
    const addBlog = jest.fn()
    render(<CreateBlogForm addBlog={addBlog} />)

    const inputs = screen.getAllByRole('textbox')
    userEvent.type(inputs[0], 'How to learn React')
    userEvent.type(inputs[1], 'Net ninja')
    userEvent.type(inputs[2], 'hhtp://netninja.io')

    const addbutton = screen.getByText('Add')

    userEvent.click(addbutton)
  })
})
