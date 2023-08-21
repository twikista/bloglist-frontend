import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../features/blog/blogThunk'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const { user: activeUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [viewAll, setViewAll] = useState(false)
  const { user, title, author, url, likes, id } = blog

  const toggleView = () => setViewAll(!viewAll)

  const updateLike = (blogId, updatedBlogObject) => {
    // console.log(blogId)
    // console.log(updatedBlogObject)
    dispatch(updateBlog({ blogId, updatedBlogObject, user }))
    // updateBlog(updatedBlogObject, blogId)
  }

  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm(`remove blog ${title} by ${author}?`)
    if (confirmDelete) {
      dispatch(deleteBlog(blogId))
      // handleDelete(blogId)
    } else return
  }

  const otherDetails = () => (
    <div>
      <p className='blog-url'>{blog.url}</p>
      <p className='blog-likes'>
        likes {blog.likes}{' '}
        <button
          onClick={() =>
            updateLike(blog.id, {
              user: activeUser.id,
              likes: likes + 1,
              title,
              author,
              url,
              id,
            })
          }
          id='like-button'
        >
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {activeUser.id === user.id && (
        <button onClick={() => handleDelete(blog.id)}>remove</button>
      )}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <div>
        <span className='basic-details'>{`${blog.title} by ${blog.author}`}</span>
        <button onClick={toggleView}>{viewAll ? 'hide' : 'view'}</button>
      </div>
      {viewAll && otherDetails()}
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // updateBlog: PropTypes.func.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
}
