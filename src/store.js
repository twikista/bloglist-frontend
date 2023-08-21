import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notification'
import blogsReducer from './features/blog/blogSplice'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    auth: authReducer,
  },
})

export default store
