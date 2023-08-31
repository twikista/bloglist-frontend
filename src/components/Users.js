import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
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
    <div className='container' style={{ marginTop: '50px' }}>
      <Table className='small-table'>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {loading()}
          {users && users.map((user) => <UserItem key={user.id} user={user} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
