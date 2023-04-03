import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actionInstance } from '../../utils/axios';

export const loginAsync = createAsyncThunk('auth/login/getUser', async (params,{rejectWithValue}) =>{
    const response = await actionInstance.get('/get-user');
    console.log('get user response', response);
    if(response.data.success){
        return response.data.user;
    }
    else {
        console.log('token error from thunk');
        localStorage.removeItem('token');
        return rejectWithValue(response.data.message);
    }
})

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: null,
    errorMessage: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.errorMessage = '';
        }
    },
    extraReducers: builder =>{
        builder.addCase(loginAsync.pending, (state)=>({...state, isLoading: true}))

        builder.addCase(loginAsync.rejected, (state, action) =>{
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                isLoggedIn: false,
                user: null
            }
        })

        builder.addCase(loginAsync.fulfilled, (state,action)=>{
            return {
                ...state,
                errorMessage: '',
                isLoading: false,
                isLoggedIn: true,
                user: action.payload
            }
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;