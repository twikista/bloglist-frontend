import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogRef = useRef();
  // const [show, setShow] = useState(true);
  console.log(user);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const rawUser = window.localStorage.getItem("loginCredentials");
    if (rawUser) {
      const user = JSON.parse(rawUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      window.localStorage.setItem("loginCredentials", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loginCredentials");
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (newNoteObject) => {
    blogRef.current.toggleFormVisibility();
    try {
      const returnedBlog = await blogService.createNewNote(newNoteObject);
      console.log(returnedBlog);
      const blogCreator = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name,
      };
      setBlogs(blogs.concat({ ...returnedBlog, user: blogCreator }));
      setSuccessMessage(
        `a new blog '${returnedBlog.title}' by ${returnedBlog.author} has been added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (updatedBlogObject, blogId) => {
    try {
      const returnedBlog = await blogService.updateBlog(
        updatedBlogObject,
        blogId
      );
      console.log(returnedBlog);
      const activeUser = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name,
      };
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === returnedBlog.id
          ? { ...returnedBlog, user: activeUser }
          : blog;
      });
      console.log(updatedBlogs);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const createBlogForm = () => (
    <Togglable ref={blogRef} label="new blog">
      <CreateBlogForm addBlog={addBlog} />
    </Togglable>
  );

  console.log(blogs);

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h1>Log in to application</h1>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorMessage ? errorMessage : successMessage}
        messageType={errorMessage ? "error" : "success"}
      />

      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      {createBlogForm()}
      {blogs.map((blog, index) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} index={index} />
      ))}
    </div>
  );
};

export default App;
