import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const { isLoading, blogs } = useSelector((state) => state.blogs)
  // const { user } = useSelector((state) => state.auth)

  if (isLoading) {
    return <h2>is loading...</h2>
  }

  return (
    <div className='blogs'>
      {blogs &&
        [...blogs].map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // updateBlog={updateBlog}
            // handleDelete={handleDelete}
            // user={user}
          />
        ))}
    </div>
  )
}

export default Blogs
