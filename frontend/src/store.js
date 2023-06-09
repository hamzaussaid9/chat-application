import { configureStore } from '@reduxjs/toolkit'
import authSlice from './components/slices/auth.slice'
import allUsersSlice from './components/slices/allUsers.slice';
import channelsSlice from './components/slices/channels';
import channelMessagesSlice from './components/slices/channelMessages.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allUsers: allUsersSlice,
    channels: channelsSlice,
    channel: channelMessagesSlice
  }
})