import { createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../../services/login'

export const login = createAsyncThunk(
  'login/loginUser',
  async (userObject, thunkAPI) => {
    console.log('i got called')
    try {
      const user = await loginService.login(userObject)
      return user
    } catch (error) {
      console.log(thunkAPI.rejectWithValue(error))
    }
  }
)
