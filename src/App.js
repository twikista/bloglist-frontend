import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import { getBlogs } from './features/blog/blogThunk'
import Blogs from './components/Blogs'
import Header from './components/Header'

const App = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Header />
          <CreateBlogForm blogRef={blogRef} />
          <Blogs />
        </>
      )}
    </div>
  )
}

export default App
