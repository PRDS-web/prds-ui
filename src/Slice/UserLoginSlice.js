//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../Service/ApiService';

export const fetchUsersAsync = createAsyncThunk(
  '/fetchUser',
  async (userDetails) => {
    console.log('call make to user', userDetails);
    const response = await getUserInfo(userDetails);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
    isLoading: false,
    isRedirect: false,
    isLoggedIn: false,
    errorMessage: null,
    successMessage: null
  },
  reducers: {
    logout: (state) =>{
    state.users= {},
    state.isLoading =false,
    state.isRedirect = false,
    state.isLoggedIn = false,
    state.errorMessage = null,
    state.successMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRedirect = true;
        state.users = action.payload;
        state.isLoggedIn = true,
        state.successMessage = 'Login Successfully Completed'
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isRedirect = false;
         state.isLoggedIn = false,
        state.errorMessage = action.error.message;
        state.successMessage = null;
      });
  },

});

export const { logout } = userSlice.actions;

export default userSlice.reducer;