import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { text: '', variant: '' },
  reducers: {
    displayNotification: (state, action) => {
      console.log(action.payload)
      state.text = action.payload.text
      state.variant = action.payload.variant
    },
    removeNotification: (state) => {
      state.text = ''
      state.variant = ''
    },
  },
})

export const { displayNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
