import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const setConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getSingle = (blogId) => {
  console.log('got called')
  console.log(blogId)
  const request = axios.get(`${baseUrl}/${blogId}`)
  return request.then((response) => response.data)
}

const createNewBlog = async (newNoteObject) => {
  const config = setConfig()

  const response = await axios.post(baseUrl, newNoteObject, config)
  return response.data
}

const updateBlog = async (blogId, updatedBlogObject) => {
  const config = setConfig()
  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    updatedBlogObject,
    config
  )
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = setConfig()
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const createComment = async (blogId, commentObject) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentObject
  )
  return response.data
}

export default {
  getAll,
  getSingle,
  setToken,
  createNewBlog,
  updateBlog,
  deleteBlog,
  createComment,
}
