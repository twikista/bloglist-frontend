import { Routes, Route, useMatch } from 'react-router-dom'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
// import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
// import { getBlogs } from './features/blog/blogThunk'
import Blogs from './components/Blogs'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import Blog from './pages/Blog'

const App = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const { users } = useSelector((state) => state.users)
  console.log(users)
  const match = useMatch('/users/:id')
  console.log(match)
  const user = match ? users.find((i) => i.id === match.params.id) : null
  console.log(user)
  // const dispatch = useDispatch()
  const blogRef = useRef()

  // useEffect(() => {
  //   dispatch(getBlogs())
  // }, [])

  return (
    <>
      <Notification />
      <Header />
      <Routes>
        {/* <Route index element={<Blogs blogRef={blogRef} />} /> */}
        <Route
          path='/'
          element={
            loggedInUser === null ? <LoginForm /> : <Blogs blogRef={blogRef} />
          }
        />
        <Route path='/blogs/:id' element={<Blog />} />
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
    </>
  )
}

export default App
