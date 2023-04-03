import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { actionInstance } from "../../utils/axios"


export const getUsersThunk = createAsyncThunk('get-users', async (params,{rejectWithValue})=>{
    const response = await actionInstance.get('/users');
    console.log('all users thunk', response);
    if(response.data.success){
        return response.data.users;
    }
    else {
        console.log('error from all users thunk');
        return rejectWithValue(response.data.message);
    }
})


const initialState = {
    isLoading: false,
    users: [],
    errorMessage: ''
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder.addCase(getUsersThunk.pending, (state)=> {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(getUsersThunk.rejected, (state, {payload})=>{
            return {
                ...state,
                errorMessage: payload,
                isLoading: false,
                users: []
            }
        })

        builder.addCase(getUsersThunk.fulfilled, (state, {payload})=>{
            return {
                ...state,
                isLoading: false,
                users: payload,
                errorMessage: ''
            }
        })
    }
})

export const {} = usersSlice.actions;

export default usersSlice.reducer;