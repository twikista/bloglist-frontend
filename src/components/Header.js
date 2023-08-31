import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { logout } from '../features/auth/authSlice'
import blogService from '../services/blogs'
import { Container } from 'react-bootstrap'

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(logout())
    blogService.setToken(null)
    navigate('/')
  }
  return (
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href='/'>blog app</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/'>blogs</Nav.Link>
          <Nav.Link href='/users'>users</Nav.Link>
        </Nav>
        <Nav>
          {user && (
            <>
              <Navbar.Text>signed in as {user.name}</Navbar.Text>
              <Button
                style={{ marginLeft: '12px' }}
                className='btn-short'
                variant='outline-light'
                size='sm'
                onClick={handleLogout}
              >
                logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
