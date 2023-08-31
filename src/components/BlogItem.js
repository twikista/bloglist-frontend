// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteBlog, updateBlog } from '../features/blog/blogThunk'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogItem = ({ blog }) => {
  // const { user: activeUser } = useSelector((state) => state.auth)
  // const dispatch = useDispatch()

  // const [viewAll, setViewAll] = useState(false)
  const { title, author } = blog

  // const toggleView = () => setViewAll(!viewAll)

  // const updateLike = (blogId, updatedBlogObject) => {
  //   dispatch(updateBlog({ blogId, updatedBlogObject, user }))
  // }

  // const handleDelete = (blogId) => {
  //   const confirmDelete = window.confirm(`remove blog ${title} by ${author}?`)
  //   if (confirmDelete) {
  //     dispatch(deleteBlog(blogId))
  //   } else return
  // }

  // const otherDetails = () => (
  //   <div>
  //     <p className='blog-url'>{blog.url}</p>
  //     <p className='blog-likes'>
  //       likes {blog.likes}
  //       {activeUser.id === user.id && (
  //         <button
  //           onClick={() =>
  //             updateLike(blog.id, {
  //               user: activeUser.id,
  //               likes: likes + 1,
  //               title,
  //               author,
  //               url,
  //               id,
  //             })
  //           }
  //           id='like-button'
  //         >
  //           like
  //         </button>
  //       )}
  //     </p>
  //     <p>{blog.user.name}</p>
  //     {activeUser.id === user.id && (
  //       <button onClick={() => handleDelete(blog.id)}>remove</button>
  //     )}
  //   </div>
  // )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <tr key={blog.id} style={blogStyle}>
      <td>
        <Link to={`blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </td>
      {/* <button onClick={toggleView}>{viewAll ? 'hide' : 'view'}</button> */}

      <td>{`${author}`}</td>
      {/* {viewAll && otherDetails()} */}
    </tr>
  )
}

export default BlogItem

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
}
