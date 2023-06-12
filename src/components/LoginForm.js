import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Login = (e) => {
    e.preventDefault()
    const credentials = { username, password }
    handleLogin(credentials)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={Login}>
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
