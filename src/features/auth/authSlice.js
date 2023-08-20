import { createSlice } from '@reduxjs/toolkit'
import { login } from './authThunk'
import { setInitialAuthState } from '../../utils/utils'
// console.log(setInitialAuthState())
const authSlice = createSlice({
  name: 'auth',
  initialState: setInitialAuthState(),
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isloading = false
      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isloading = false
      state.error = action.error.message
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
