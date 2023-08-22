import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/users'

export const getAllUsers = createAsyncThunk('user/getAllUser', async () => {
  try {
    const users = await userService.getAllUsers()
    return users
  } catch (error) {
    console.log(error)
  }
})
