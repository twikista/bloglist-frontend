import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog, addComment } from '../features/blog/blogThunk'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {
  displayNotification,
  removeNotification,
  toggleModal,
} from '../features/notification/notification'
import AppModal from '../components/Modal'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogs } = useSelector((state) => state.blogs)
  const { user: loggedInUser } = useSelector((state) => state.auth)
  // const { modal } = useSelector((state) => state.notification)
  const params = useParams()
  const blog = blogs.find((blog) => blog.id === params.id)
  const commentIds = blog ? blog.comments.map((i) => i.id) : null
  const [commentText, setCommentText] = useState('')

  const handleAddComment = (e) => {
    e.preventDefault()
    const commentObject = { text: commentText }
    dispatch(addComment({ id: blog.id, commentObject }))
    console.log(commentText)
    console.log(commentObject)
    setCommentText('')
  }

  const updateLike = (blogId, updatedBlogObject) => {
    dispatch(
      updateBlog({
        blogId,
        updatedBlogObject,
        user: blog.user,
        comments: blog.comments,
      })
    )
  }

  const showModal = () => {
    dispatch(
      toggleModal({ text: `remove blog ${blog.title} by ${blog.author}` })
    )
  }

  const handleDelete = (blogId) => {
    dispatch(toggleModal({ text: null }))
    dispatch(deleteBlog(blogId))
    dispatch(
      displayNotification({
        text: `'${blog.title}'  has been removed`,
        variant: 'success',
      })
    )
    //remove notification message
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    navigate('/')
  }

  return (
    <>
      <AppModal deleteHandler={handleDelete} blog={blog} />
      <div className='container'>
        {blog && (
          <article className='small-table'>
            <h3>{blog.title}</h3>
            <Link to={blog.url} target='blank'>
              {blog.url}
            </Link>
            <div>
              <span>
                <strong>{blog.likes}</strong> likes
              </span>
              <Button
                variant='outline-primary'
                style={{ margin: '10px 0 10px 10px', width: '80px' }}
                size='sm'
                onClick={() =>
                  updateLike(blog.id, {
                    user: loggedInUser.id,
                    likes: blog.likes + 1,
                    title: blog.title,
                    author: blog.author,
                    url: blog.url,
                    id: blog.id,
                    comments: commentIds,
                  })
                }
                id='like-button'
              >
                like
              </Button>
            </div>
            <span>Added by {blog.user.name}</span>
            <div>
              {loggedInUser.id === blog.user.id && (
                <Button variant='danger' onClick={showModal}>
                  remove
                </Button>
              )}
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4>comments</h4>
              <Form onSubmit={handleAddComment}>
                <InputGroup className='input-width'>
                  <Form.Control
                    type='text'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button type='submit'>add comment</Button>
                </InputGroup>
              </Form>
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment.id}>{comment.text}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </div>
    </>
  )
}

export default Blog
