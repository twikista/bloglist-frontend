import { createSlice } from '@reduxjs/toolkit'
import {
  getBlogs,
  getSingleBlog,
  addBlog,
  deleteBlog,
  updateBlog,
  addComment,
} from './blogThunk'

const blogSplice = createSlice({
  name: 'blogs',
  initialState: {
    blog: '',
    blogs: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getBlogs.pending]: (state) => {
      state.isLoading = true
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.isLoading = false
      state.blogs = action.payload
    },
    [getBlogs.rejected]: (state) => {
      state.isLoading = false
    },
    [getSingleBlog.pending]: (state) => {
      state.isLoading = true
    },
    [getSingleBlog.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action.payload)
      state.blog = action.payload
    },
    [addBlog.fulfilled]: (state, action) => {
      const { newBlog, user } = action.payload
      state.blogs = state.blogs.concat({ ...newBlog, user })
    },
    [addBlog.rejected]: (state, action) => {
      state.error = action.payload
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
    },
    [updateBlog.fulfilled]: (state, action) => {
      const { returnedObject, user, comments } = action.payload
      state.blogs = state.blogs.map((blog) =>
        blog.id !== returnedObject.id
          ? blog
          : { ...returnedObject, user: user, comments }
      )
    },
    [addComment.fulfilled]: (state, action) => {
      const blogCommentedOn = state.blogs.find(
        (blog) => blog.id === action.payload.blog
      )
      blogCommentedOn.comments = blogCommentedOn.comments.concat(action.payload)
      state.blogs = state.blogs.map((blog) =>
        blog.id === action.payload.blog ? blogCommentedOn : blog
      )
    },
  },
})

export default blogSplice.reducer
