import { Routes, Route, useMatch } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import Notification from './components/Notification'
// import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import { getBlogs } from './features/blog/blogThunk'
import { getAllUsers } from './features/users/userThunk'
import Blogs from './components/Blogs'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import Blog from './pages/Blog'

const App = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const { users } = useSelector((state) => state.users)
  const { blogs } = useSelector((state) => state.blogs)
  const match = useMatch('/users/:id')
  const user = match ? users.find((i) => i.id === match.params.id) : null
  const dispatch = useDispatch()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        {/* <Route index element={<Blogs blogRef={blogRef} />} /> */}
        <Route
          path='/'
          element={
            loggedInUser === null ? <LoginForm /> : <Blogs blogRef={blogRef} />
          }
        />
        <Route path='/blogs/:id' element={<Blog blogs={blogs} />} />
        <Route path='users' element={<Users />} />
        <Route path='/users/:id' element={<User user={user} />} />
      </Routes>

      {/* {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Blogs blogRef={blogRef} />
        </>
      )} */}
    </div>
  )
}

export default App
