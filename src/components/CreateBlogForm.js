import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ addBlog }) => {
  const [title, setTitile] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (e) => {
    console.log('got called')
    e.preventDefault()
    addBlog({ title, author, url })
    setTitile('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={createBlog}>
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
  )
}

export default CreateBlogForm

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}
