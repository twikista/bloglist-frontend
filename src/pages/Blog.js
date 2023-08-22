import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../features/blog/blogThunk'

const Blog = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blogs)
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const params = useParams()
  const blog = blogs.find((blog) => blog.id === params.id)
  const { user, likes, title, author, url, id } = blog

  const updateLike = (blogId, updatedBlogObject) => {
    dispatch(updateBlog({ blogId, updatedBlogObject, user }))
  }

  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm(`remove blog ${title} by ${author}?`)
    if (confirmDelete) {
      dispatch(deleteBlog(blogId))
    } else return
  }

  return (
    <article>
      <h3>{title}</h3>
      <Link to={url} target='blank'>
        {url}
      </Link>
      <div>
        <span>{likes} likes</span>
        {loggedInUser.id === user.id && (
          <button
            onClick={() =>
              updateLike(id, {
                user: loggedInUser.id,
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
        )}
      </div>
      <span>Added by {blog.user.name}</span>
      <div>
        {loggedInUser.id === user.id && (
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    </article>
  )
}

export default Blog
