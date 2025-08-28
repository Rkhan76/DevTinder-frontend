// slices/activityCountSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notificationsCount: 0,
  chatsCount: 0,
  friendRequestsCount: 0,
}

const activityCountSlice = createSlice({
  name: 'activityCount',
  initialState,
  reducers: {
    setNotificationsCount: (state, action) => {
      state.notificationsCount = action.payload
    },
    setChatsCount: (state, action) => {
      state.chatsCount = action.payload
    },
    setFriendRequestsCount: (state, action) => {
      state.friendRequestsCount = action.payload
    },
    resetActivityCount: (state) => {
      state.notificationsCount = 0
      state.chatsCount = 0
      state.friendRequestsCount = 0
    },
  },
})

export const {
  setNotificationsCount,
  setChatsCount,
  setFriendRequestsCount,
  resetActivityCount,
} = activityCountSlice.actions

export default activityCountSlice.reducer
