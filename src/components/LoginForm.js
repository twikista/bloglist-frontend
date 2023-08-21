import { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authThunk'
import {
  displayNotification,
  removeNotification,
} from '../features/notification/notification'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (credentials) => {
    try {
      const user = await dispatch(login(credentials)).unwrap()
      // const user = await loginService.login(credentials)
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
      }

      // setUser(user)
    } catch (error) {
      console.log(error)
      dispatch(
        displayNotification({
          text: 'wrong username or password',
          variant: 'error',
        })
      )
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = { username, password }
    handleLogin(credentials)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in to application</h1>
      <div>
        <label>username</label>
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id='password'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
// }
