import { createAsyncThunk } from '@reduxjs/toolkit'
import blogServices from '../../services/blogs'

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (thunkAPI) => {
  try {
    const blogs = await blogServices.getAll()
    return blogs
  } catch (error) {
    return thunkAPI.rejectWithValue('data fetching failed')
  }
})

export const getSingleBlog = createAsyncThunk(
  'blogs/getSingleBlog',
  async (blogId, thunkAPI) => {
    try {
      const blogs = await blogServices.getSingle(blogId)
      return blogs
    } catch (error) {
      return thunkAPI.rejectWithValue('data fetching failed')
    }
  }
)

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async ({ newBlogObject, user }, thunkAPI) => {
    try {
      const newBlog = await blogServices.createNewBlog(newBlogObject)
      return { newBlog, user }
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId) => {
    try {
      await blogServices.deleteBlog(blogId)
      return blogId
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/updateblog',
  async ({ blogId, updatedBlogObject, user, comments }, thunkAPI) => {
    try {
      const returnedObject = await blogServices.updateBlog(
        blogId,
        updatedBlogObject
      )
      return { returnedObject, user, comments }
    } catch (error) {
      console.log(error)
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async ({ id, commentObject }) => {
    console.log(commentObject, id)
    try {
      const saveComment = await blogServices.createComment(id, commentObject)
      console.log(commentObject)
      return saveComment
    } catch (error) {
      console.log(error)
    }
  }
)
