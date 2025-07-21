//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../Service/ApiService';

export const fetchUser = createAsyncThunk(
  '/fetchUser',
  async (userDetails, { rejectWithValue }) => {
    const response = await getUserInfo(userDetails);
    console.log('Response from getUserInfo:', response);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
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
    successMessage: null,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      const persistedState = JSON.parse(localStorage.getItem('persist:root'));
      delete persistedState.user;
      localStorage.setItem('persist:root', JSON.stringify(persistedState));
      state.users = {};
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
    },
    resetIsError: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
    resetIsSuccess: (state) => {
      state.isSuccess = false;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRedirect = true;
        state.users = action.payload;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = 'Login Successfully Completed';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRedirect = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload?.message || 'Login Failed';
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.users = {};
      });
  },
});

export const { logout, resetIsSuccess, resetIsError } = userSlice.actions;

export default userSlice.reducer;
