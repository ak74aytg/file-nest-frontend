import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";


//Thunk for login user
export const loginUser = createAsyncThunk("auth/loginUser",
    async (loginData, { isRejectedWithValue }) => {
        try {
          const response = await axios.post(
            `${baseUrl}/auth/v1/login`,
            loginData
          );
          return response.data;
        } catch (error) {
          return isRejectedWithValue(error.response.data);
        }
    }
);




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
    },
    extraReducers: (builder) => {
        builder
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
          });
    }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;