import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserItem = ({ user }) => {
  return (
    <tr>
      <td>
        <Link className='undecorated-link' to={user.id}>
          {user.name}
        </Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default UserItem
UserItem.propTypes = {
  user: PropTypes.object,
}
