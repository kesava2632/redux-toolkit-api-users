import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialData = {
    users:[],
    status:'',
    error:"",
}

export const fetchData = createAsyncThunk('user/fetch', async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  });

const userSlices = createSlice({
    name:'user',
    initialState:initialData,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.status = 'Loading';
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'success';
            state.users = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.status = 'fail';
            state.users = [];
            state.error = action.error.message; // Use action.error.message or action.error.toString() to get the error message
          });
      }

})

const store = configureStore({
    reducer:{
        user:userSlices.reducer
    }
})


export default store