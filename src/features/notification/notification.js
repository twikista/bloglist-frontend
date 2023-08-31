import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    variant: '',
    modal: { show: false, text: null },
  },
  reducers: {
    displayNotification: (state, action) => {
      state.text = action.payload.text
      state.variant = action.payload.variant
    },
    removeNotification: (state) => {
      state.text = ''
      state.variant = ''
    },
    toggleModal: (state, action) => {
      state.modal.text = action.payload.text
      state.modal.show = !state.modal.show
    },
  },
})

export const { displayNotification, removeNotification, toggleModal } =
  notificationSlice.actions
export default notificationSlice.reducer
