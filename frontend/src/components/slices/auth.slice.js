import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state = initialState;
        }
    },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;