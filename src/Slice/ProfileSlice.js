//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileInfo, updateProfileInfo } from '../Service/ApiService';

export const fetchProfile = createAsyncThunk(
  '/fetchProfile',
  // here we don't need any parameters, so we can pass an _ underscore
  // to indicate that we are not using the first parameter
  async (_, { rejectWithValue }) => {
    const response = await getProfileInfo();
    console.log('Response from getProfileInfo:', response);
    
    // Check if response indicates an error (has message property or status indicates error)
    if (response.message || (response.status && response.status >= 400)) {
      console.log('Error fetching profile');
      return rejectWithValue(response);
    }
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  '/updateProfile',
  async (profileData, { rejectWithValue }) => {
    console.log('updateProfile thunk called with:', profileData);
    const response = await updateProfileInfo(profileData);
    console.log('Response from updateProfileInfo:', response);
    
    // Check if response indicates an error (has message property or status indicates error)
    if (response.message || (response.status && response.status >= 400)) {
      console.log('Error detected in updateProfile thunk, rejecting with:', response);
      return rejectWithValue(response);
    }
    console.log('Success in updateProfile thunk, returning:', response);
    return response;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    users: {
      name: '',
      userId: '',
      role: '',
      email: '',
      country: '',
      picture: '',
      skills: [],
      linkedIn: '',
      mobileNumber: '',
      github: '',
      isVerified: false,
      loggedInType: '',
    },
    isLoading: false,
    isUpdating: false,
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
    clearLogout: (state) => {
      state.isRedirect = false;
      console.log("gfhjkkkjhgf")
      const persistedState = JSON.parse(localStorage.getItem('persist:root'));
      if (persistedState?.profile?.users) {
        delete persistedState.profile.users;
      }
      localStorage.setItem('persist:root', JSON.stringify(persistedState));
    },
    updateLocalProfile: (state, action) => {
      state.users = { ...state.users, ...action.payload };
    },
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
      })
      .addCase(updateProfile.pending, (state) => {
        console.log('updateProfile.pending - setting loading state');
        state.isUpdating = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('updateProfile.fulfilled - setting success state with:', action.payload);
        state.isUpdating = false;
        state.users = action.payload;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log('updateProfile.rejected - setting error state with:', action.payload);
        state.isUpdating = false;
        state.errorMessage = action.payload.message;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { resetIsSuccess, resetIsError, resetRedirect, clearLogout, updateLocalProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
