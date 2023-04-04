import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { actionInstance } from "../../utils/axios"


export const getChannelsThunk = createAsyncThunk('get-channels', async (params,{rejectWithValue})=>{
    const response = await actionInstance.get('/channel');
    console.log('all channels thunk', response);
    if(response.data.success){
        return response.data.channels;
    }
    else {
        console.log('error from all channels thunk');
        return rejectWithValue(response.data.message);
    }
})


const initialState = {
    isLoading: true,
    channels: [],
    errorMessage: ''
}

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder.addCase(getChannelsThunk.pending, (state)=> {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(getChannelsThunk.rejected, (state, {payload})=>{
            return {
                ...state,
                errorMessage: payload,
                isLoading: false,
                channels: []
            }
        })

        builder.addCase(getChannelsThunk.fulfilled, (state, {payload})=>{
            return {
                ...state,
                isLoading: false,
                channels: payload,
                errorMessage: ''
            }
        })
    }
})

export const {} = channelsSlice.actions;

export default channelsSlice.reducer;