import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from './userThunk'

const initialState = {
  isLoading: false,
  users: [],
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload
    })
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default userSlice.reducer
