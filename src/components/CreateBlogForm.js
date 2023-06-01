import { useState } from "react";

const CreateBlogForm = ({ addBlog }) => {
  const [title, setTitile] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    addBlog({ title, author, url });
    setTitile("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={createBlog}>
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
};

export default CreateBlogForm;
