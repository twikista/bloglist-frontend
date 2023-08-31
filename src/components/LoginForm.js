import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authThunk'
import {
  displayNotification,
  removeNotification,
} from '../features/notification/notification'
import blogService from '../services/blogs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (credentials) => {
    try {
      const user = await dispatch(login(credentials)).unwrap()
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
      }
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
    <Form
      onSubmit={handleSubmit}
      className='container small-table flex-centered'
    >
      <h1 className='mb-5'>Log in to application</h1>
      <Form.Group
        className='mb-3'
        controlId='username'
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Form.Label>username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          size='lg'
        />
      </Form.Group>
      <Form.Group
        className='mb-3'
        controlId='password'
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Form.Label>password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          size='lg'
        />
      </Form.Group>
      <Button
        type='submit'
        size='lg'
        style={{ width: '100%', maxWidth: '400px' }}
      >
        login
      </Button>
    </Form>
  )
}

export default LoginForm
