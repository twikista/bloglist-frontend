import { createAsyncThunk } from '@reduxjs/toolkit'
import blogServices from '../../services/blogs'

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (thunkAPI) => {
  try {
    const blogs = await blogServices.getAll()
    return blogs
  } catch (error) {
    return thunkAPI.rejectWithValue('data ftching failed')
  }
})

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
  async ({ blogId, updatedBlogObject, user }, thunkAPI) => {
    try {
      const returnedObject = await blogServices.updateBlog(
        blogId,
        updatedBlogObject
      )
      return { returnedObject, user }
    } catch (error) {
      console.log(error)
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
