import { configureStore } from '@reduxjs/toolkit'
import authSlice from './components/slices/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authSlice
  }
})