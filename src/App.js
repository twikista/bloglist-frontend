import { Routes, Route } from 'react-router-dom'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
// import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
// import { getBlogs } from './features/blog/blogThunk'
import Blogs from './components/Blogs'
import Header from './components/Header'
import Users from './components/Users'

const App = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth)
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
        <Route
          path='/'
          element={
            loggedInUser === null ? <LoginForm /> : <Blogs blogRef={blogRef} />
          }
        />
        <Route path='users' element={<Users />} />
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
