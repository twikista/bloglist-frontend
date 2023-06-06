import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, handleDelete, user: activeUser }) => {
  const [viewAll, setViewAll] = useState(false);
  const { user, title, author, url, likes } = blog;

  const toggleView = () => setViewAll(!viewAll);
  const updateLike = (updatedBlogObject, blogId) => {
    console.log(blogId);
    updateBlog(updatedBlogObject, blogId);
  };

  const deleteBlog = (blogId) => {
    const confirmDelete = window.confirm(`remove blog ${title} by ${author}?`);
    if (confirmDelete) {
      handleDelete(blogId);
    } else return;
  };

  const otherDetails = () => (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{" "}
        <button
          onClick={() =>
            updateLike(
              { user: user.id, likes: likes + 1, title, author, url },
              blog.id
            )
          }
        >
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {activeUser.id === user.id && (
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      )}
    </div>
  );

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{viewAll ? "hide" : "view"}</button>
      </div>
      {viewAll && otherDetails()}
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
