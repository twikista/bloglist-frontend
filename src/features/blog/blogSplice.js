import { createSlice } from '@reduxjs/toolkit'
import { getBlogs, addBlog, deleteBlog, updateBlog } from './blogThunk'
// import blogs from '../../services/blogs'

const blogSplice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getBlogs.pending]: (state) => {
      state.isLoading = true
      // console.log(action)
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.isLoading = false
      state.blogs = action.payload
      // console.log(JSON.parse(JSON.stringify(state)))
    },
    [getBlogs.rejected]: (state) => {
      state.isLoading = false
      // console.log(action.payload)
    },
    [addBlog.fulfilled]: (state, action) => {
      const { newBlog, user } = action.payload
      state.blogs = state.blogs.concat({ ...newBlog, user })
      // console.log(JSON.parse(JSON.stringify(state)))
    },
    [addBlog.rejected]: (state, action) => {
      state.error = action.payload
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
    },
    [updateBlog.fulfilled]: (state, action) => {
      // console.log(action.payload)
      const { returnedObject, user } = action.payload
      state.blogs = state.blogs.map((blog) =>
        blog.id !== returnedObject.id ? blog : { ...returnedObject, user: user }
      )
    },
    // [updateBlog.rejected]: (state, action) => {
    //   // console.log(action)
    // },
  },
})

export default blogSplice.reducer
