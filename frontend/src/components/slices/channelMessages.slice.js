import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import {
    actionInstance
} from "../../utils/axios"


export const getChannelDetailsThunk = createAsyncThunk('get-channel', async (params, {
    rejectWithValue
}) => {
    const response = await actionInstance.get(`/channel/${params.id}`);
    console.log('channel with messages thunk', response);
    if (response.data.success) {
        return response.data.channel;
    } else {
        console.log('error from channel thunk');
        return rejectWithValue(response.data.message);
    }
})


const initialState = {
    isLoading: true,
    channel: null,
    errorMessage: ''
}

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        reset: (state) =>{
            state.channel = null;
            state.errorMessage = ""
        } 
    },
    extraReducers: builder => {
        builder.addCase(getChannelDetailsThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        builder.addCase(getChannelDetailsThunk.rejected, (state, {
            payload
        }) => {
            return {
                ...state,
                errorMessage: payload,
                isLoading: false,
                channel: null
            }
        })

        builder.addCase(getChannelDetailsThunk.fulfilled, (state, {
            payload
        }) => {
            return {
                ...state,
                isLoading: false,
                channel: payload,
                errorMessage: ''
            }
        })
    }
})

export const { reset } = channelSlice.actions;

export default channelSlice.reducer;