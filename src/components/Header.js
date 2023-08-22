import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import blogService from '../services/blogs'

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(logout())
    blogService.setToken(null)
  }
  return (
    <header>
      <h2>blogs</h2>
      <h4>{user.name} logged in</h4>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </header>
  )
}

export default Header
