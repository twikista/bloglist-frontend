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
  // const [formData, setFormData] = useState({ title: '', author: '', url: '' })

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }

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
    // console.log(formData)
    e.preventDefault()
    console.log(title, author, url)
    createBlog({ title, author, url })
    setTitile('')
    setAuthor('')
    setUrl('')
    // setFormData({ title: '', author: '', url: '' })
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
        {/* <div>
          <label>title</label>
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitile(target.value)}
            placeholder='enter blog title'
            id='title'
          />
        </div>
        <div>
          <label>author</label>
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='enter blog author'
            id='author'
          />
        </div>
        <div>
          <label>url</label>
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='enter blog url'
            id='url'
          />
        </div> */}
        <Button
          className='small-table'
          variant='success'
          // size='sm'
          type='submit'
          id='submit'
          // style={{ width: '100%', maxWidth: '520px' }}
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
