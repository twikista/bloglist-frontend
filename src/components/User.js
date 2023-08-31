import PropTypes from 'prop-types'

const User = ({ user }) => {
  return (
    user && (
      <div className='container small-table'>
        <h2>{user.name}</h2>
        <article>
          Added Blogs
          {user.blogs ? (
            <ul>
              {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          ) : (
            <p>user curently has no blog listing</p>
          )}
        </article>
      </div>
    )
  )
}

export default User
User.propTypes = {
  user: PropTypes.object,
}
