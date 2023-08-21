import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
          text: `a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`,
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
    createBlog({ title, author, url })
    setTitile('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Togglable ref={blogRef} label='new blog'>
      <form onSubmit={handleSubmit}>
        <h2>Add new note</h2>
        <div>
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
        </div>
        <button type='submit' id='submit'>
          Add
        </button>
      </form>
    </Togglable>
  )
}

export default CreateBlogForm

CreateBlogForm.propTypes = {
  blogRef: PropTypes.object,
}
