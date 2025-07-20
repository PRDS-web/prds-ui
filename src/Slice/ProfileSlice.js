//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileInfo } from '../Service/ApiService';

export const fetchProfile = createAsyncThunk(
  '/fetchProfile',
  // here we don't need any parameters, so we can pass an _ underscore
  // to indicate that we are not using the first parameter
  async (_, { rejectWithValue }) => {
    const response = await getProfileInfo();
    console.log('Response from getProfileInfo:', response);
    if (response.status > 210) {
      console.log('Error fetching profile');
      return rejectWithValue(response);
    }
    return response;
  }
);

const profileSlice = createSlice({
  name: 'profile',
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
    resetIsError: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
    resetIsSuccess: (state) => {
      state.isSuccess = false;
      state.successMessage = null;
    },
    resetRedirect: (state) => {
      state.isRedirect = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRedirect = false;
        state.users = action.payload;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = 'Profile fetched successfully';
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isRedirect = true;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.users = {};
      });
  },
});

export const { resetIsSuccess, resetIsError,resetRedirect } = profileSlice.actions;

export default profileSlice.reducer;
