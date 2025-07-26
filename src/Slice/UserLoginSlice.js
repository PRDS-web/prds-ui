//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo, signUpUser, loginUser, logoutUser } from '../Service/ApiService';

export const fetchUser = createAsyncThunk(
  '/fetchUser',
  async (userInfo, { rejectWithValue }) => {
    const response = await getUserInfo(userInfo);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const registerUser = createAsyncThunk(
  '/registerUser',
  async (userDetails, { rejectWithValue }) => {
    const response = await signUpUser(userDetails);
    console.log('Response from signUpUser:', response);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const userLogout = createAsyncThunk(
  '/logout',
  async (userDetails, { rejectWithValue }) => {
    const response = await logoutUser(userDetails);
    console.log('Response from signUpUser:', response);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const signInUser = createAsyncThunk(
  '/signInUser',
  async (userDetails, { rejectWithValue }) => {
    const response = await loginUser(userDetails);
    console.log('Response from signInUser:', response);
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
    isSignedUp: false,
    isLoggedOut: false
  },
  reducers: {
    resetIsError: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
    resetIsSuccess: (state) => {
      state.isSuccess = false;
      state.successMessage = null;
    }
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

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
        state.isSignedUp = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = {};
        state.isLoggedIn = false;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.isSignedUp = true;
        state.successMessage = action.payload?.message || 'Sign Up Successfully Completed';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload?.message || 'Sign Up Failed';
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.isSignedUp = false;
        state.users = {};
      });

    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
      state.isRedirect = false;
      state.errorMessage = null;
      state.successMessage = null;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.isLoggedOut = false;
      state.isError = false;
    })
    .addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRedirect = true;
      state.users = action.payload;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isLoggedOut = false;
      state.isError = false;
      state.successMessage = 'Login Successfully Completed';
    })
    .addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.errorMessage = action.payload?.message || 'Login Failed';
      state.successMessage = null;
      state.isSuccess = false;
      state.isLoggedOut = false;
      state.isError = true;
      state.users = {};
    });
    builder.addCase(userLogout.pending, (state, action) =>{
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;

    }).addCase(userLogout.fulfilled,(state,action)=>{
      localStorage.removeItem("persist:root");
      state.users = {};
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.errorMessage = null;
      state.successMessage = action.payload?.message || 'User Logged out';
      state.isSuccess = false;
      state.isError = false;

    }).addCase(userLogout.rejected,(state, action)=>{
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Something Went Wrong';
      state.isError = false;
    })
  },
});

export const { resetIsSuccess, resetIsError } = userSlice.actions;

export default userSlice.reducer;
