import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";


//Thunk for login user
export const loginUser = createAsyncThunk("auth/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {
          const response = await axios.post(
            `${baseUrl}/auth/v1/login`,
            loginData
          );
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
    }
);



// Thunk for register users
export const registerUser = createAsyncThunk("auth/registerUser",
async(registerData, {rejectWithValue})=>{
  try{
    const response = await axios.post(
      `${baseUrl}/auth/v1/register`,
      registerData
    );
    return response.data;
  }catch(error){
    return rejectWithValue(error.response.data)
  }
}
);


//Thunk for verifying user
export const verifyUser = createAsyncThunk("auth/verifyUser",
   async(verifyData, {rejectWithValue})=>{
  try{
    const response = await axios.post(
      `${baseUrl}/auth/v1/verify-otp?email=${verifyData.email}&otp=${verifyData.otp}`
    );
    return response.data;
  }catch(error){
    return rejectWithValue(error.response.data);
  }
})




const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError: (state)=>{
      state.error = null;
    }
    },
    extraReducers: (builder) => {
        builder
          //login reducers
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.username;
            state.token = action.payload.token;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          //register reducers
          .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
          }).addCase(registerUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload.email;
          }).addCase(registerUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
          })
          //verify user reducers
          .addCase(verifyUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
          }).addCase(verifyUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload.username;
            state.token = action.payload.token;
          }).addCase(verifyUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
          });
    }
});


export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;