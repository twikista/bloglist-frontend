// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
// import { getBlogs } from '../features/blog/blogThunk'
import BlogItem from './BlogItem'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'

const Blogs = ({ blogRef }) => {
  const { isLoading, blogs } = useSelector((state) => state.blogs)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getBlogs())
  // }, [])

  if (isLoading) {
    return (
      <div className='container small-table'>
        <h3>is loading...</h3>
      </div>
    )
  }

  return (
    <div className='container' style={{ marginTop: '20px' }}>
      <Notification />
      <CreateBlogForm blogRef={blogRef} />
      <Table
        striped
        borderless
        className='small-table'
        style={{ marginTop: '20px' }}
      >
        <tbody>
          {blogs &&
            [...blogs].map((blog) => <BlogItem key={blog.id} blog={blog} />)}
        </tbody>
      </Table>
      <div className='blogs'></div>
    </div>
  )
}

export default Blogs
Blogs.propTypes = {
  blogRef: PropTypes.object,
}
