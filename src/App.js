import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const activeUser = window.localStorage.getItem('loginCredentials')
    if (activeUser) {
      const user = JSON.parse(activeUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loginCredentials', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginCredentials')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (newNoteObject) => {
    blogRef.current.toggleFormVisibility()
    try {
      const returnedBlog = await blogService.createNewNote(newNoteObject)
      console.log(returnedBlog)
      const blogCreator = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name,
      }
      setBlogs(blogs.concat({ ...returnedBlog, user: blogCreator }))
      setSuccessMessage(
        `a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedBlogObject, blogId) => {
    try {
      const returnedBlog = await blogService.updateBlog(
        updatedBlogObject,
        blogId
      )
      const activeUser = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name,
      }
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === returnedBlog.id
          ? { ...returnedBlog, user: activeUser }
          : blog
      })
      setBlogs(updatedBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      const updateBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updateBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const createBlogForm = () => (
    <Togglable ref={blogRef} label='new blog'>
      <CreateBlogForm addBlog={addBlog} />
    </Togglable>
  )

  // if (user === null) {
  //   return <LoginForm handleLogin={handleLogin} />
  // }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorMessage ? errorMessage : successMessage}
        messageType={errorMessage ? 'error' : 'success'}
      />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
          {createBlogForm()}
          {[...blogs]
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
