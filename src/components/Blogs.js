import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { getBlogs } from '../features/blog/blogThunk'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

const Blogs = ({ blogRef }) => {
  const { isLoading, blogs } = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  if (isLoading) {
    return <h2>is loading...</h2>
  }

  return (
    <>
      <CreateBlogForm blogRef={blogRef} />
      <div className='blogs'>
        {blogs && [...blogs].map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </>
  )
}

export default Blogs
Blogs.propTypes = {
  blogRef: PropTypes.object,
}
