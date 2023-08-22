import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../features/users/userThunk'
import UserItem from './UserItem'

const Users = () => {
  const { isLoading, users } = useSelector((state) => {
    return state.users
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const loading = () => {
    if (isLoading)
      return (
        <tr>
          <td>loading users...</td>
        </tr>
      )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {loading()}
          {users && users.map((user) => <UserItem key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
