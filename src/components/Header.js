import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
      <nav style={{ display: 'flex', gap: '5px' }}>
        <NavLink to='/'>blogs</NavLink>
        <NavLink to='/users'>users</NavLink>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </nav>
      <h2>blogs</h2>
    </header>
  )
}

export default Header
