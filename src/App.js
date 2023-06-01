import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitile] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const returnedBlog = await blogService.createNewNote({
        title,
        author,
        url,
      });
      console.log(returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
      setTitile("");
      setAuthor("");
      setUrl("");
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

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>Add new note</h2>
      <div>
        <label>title</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitile(target.value)}
        ></input>
      </div>
      <div>
        <label>author</label>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        <label>url</label>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit">Add</button>
    </form>
  );

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
