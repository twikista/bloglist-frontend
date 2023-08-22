import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notification'
import blogsReducer from './features/blog/blogSplice'
import authReducer from './features/auth/authSlice'
import usersReducer from './features/users/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    auth: authReducer,
    users: usersReducer,
  },
})

export default store
