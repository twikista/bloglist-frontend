import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { addBlog } from '../features/blog/blogThunk'
import {
  displayNotification,
  removeNotification,
} from '../features/notification/notification'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ blogRef }) => {
  const { id, name, username } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const [title, setTitile] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (newBlogObject) => {
    try {
      //hide createBlog form

      const returnedBlog = await dispatch(
        addBlog({ newBlogObject, user: { id, name, username } })
      ).unwrap()
      if (returnedBlog) blogRef.current.toggleFormVisibility()
      console.log(returnedBlog)
      //set notification message
      dispatch(
        displayNotification({
          text: `a new blog '${title}' by ${author} has been added`,
          variant: 'success',
        })
      )
      //remove notification message
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } catch (err) {
      console.log(err)
      dispatch(
        displayNotification({
          text: `${err}`,
          variant: 'error',
        })
      )
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const handleSubmit = (e) => {
    console.log('got called')
    e.preventDefault()
    console.log(title, author, url)
    createBlog({ title, author, url })
    setTitile('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Togglable ref={blogRef} label='new blog'>
      <Form onSubmit={handleSubmit}>
        <h2>Add new note</h2>
        <Form.Group className='mb-3 small-table' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            size='lg'
            value={title}
            type='text'
            onChange={(e) => {
              setTitile(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3 small-table' controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            size='lg'
            value={author}
            type='text'
            onChange={(e) => {
              setAuthor(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3 small-table' controlId='url'>
          <Form.Label>URL</Form.Label>
          <Form.Control
            size='lg'
            value={url}
            type='text'
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />
        </Form.Group>
        <Button
          className='small-table'
          variant='success'
          type='submit'
          id='submit'
        >
          Add
        </Button>
      </Form>
    </Togglable>
  )
}

export default CreateBlogForm

CreateBlogForm.propTypes = {
  blogRef: PropTypes.object,
}
