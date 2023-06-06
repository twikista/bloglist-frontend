import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const setConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNewNote = async (newNoteObject) => {
  const config = setConfig();

  const response = await axios.post(baseUrl, newNoteObject, config);
  return response.data;
};

const updateBlog = async (updatedBlogObject, blogId) => {
  const config = setConfig();
  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    updatedBlogObject,
    config
  );
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = setConfig();
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createNewNote, updateBlog, deleteBlog };
