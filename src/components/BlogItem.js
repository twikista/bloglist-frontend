import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogItem = ({ blog }) => {
  const { title, author } = blog

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

      <td>{`${author}`}</td>
    </tr>
  )
}

export default BlogItem

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
}
