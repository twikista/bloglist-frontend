import PropTypes from 'prop-types'

const User = ({ user }) => {
  console.log(user)
  //   if (user) return null
  return (
    user && (
      <div>
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
            <h4>User curently has no blog listing</h4>
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
