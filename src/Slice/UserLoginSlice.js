import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo, signUpUser, loginUser, logoutUser, getAllUser, forgotPassword, resetPassword, verifyUserTokenApi, getBankingInfo, getBankingHistory, updateBankDetails } from '../Service/ApiService';
import { REHYDRATE } from 'redux-persist';


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

export const verifyUserToken = createAsyncThunk(
  '/verifyUserToken',
  async (token, { rejectWithValue }) => { 
    const response = await verifyUserTokenApi(token);
    console.log('Response from verifyUserTokenApi:', response);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getBankingDetails = createAsyncThunk(
  '/getBankingDetails',
  async (_, { rejectWithValue }) => {
    const response = await getBankingInfo();
    if (response?.status && (response.status < 200 || response.status >= 300)) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getBankingHistoryDetails = createAsyncThunk(
  '/getBankingHistoryDetails',
  async (_, { rejectWithValue }) => {
    const response = await getBankingHistory();
    if (response?.status && (response.status < 200 || response.status >= 300)) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const updateBankingDetails = createAsyncThunk(
  '/updateBankingDetails',
  async (bankingData, { rejectWithValue }) => {
    const response = await updateBankDetails(bankingData);
    if (response?.status && (response.status < 200 || response.status >= 300)) {
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

export const getAllUsers = createAsyncThunk(
  '/getAllUsers',
  async (_, { rejectWithValue }) => {
    const response = await getAllUser();
    console.log('Response from getAllUser:', response);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const forgotPasswords = createAsyncThunk(
  '/forgotPassword',
  async (request, { rejectWithValue }) => {
    const response = await forgotPassword(request);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const resetPasswords = createAsyncThunk(
  '/resetPassword',
  async (request, { rejectWithValue }) => {
    const response = await resetPassword(request);
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
    isLoggedOut: false,
    bankingDetails: {},
    bankingHistory: [],
    isBankingUpdating: false,
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
    builder.addCase(REHYDRATE, (state) => {
      state.isLoading = false;
    });
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
    builder.addCase(userLogout.pending, (state) =>{
      state.isLoading = false;
      state.isRedirect = false;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;

    }).addCase(userLogout.fulfilled,(state,action)=>{
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
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = 'Users fetched successfully';
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = {};
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to fetch users';
      state.isError = true;
    });
    builder.addCase(forgotPasswords.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(forgotPasswords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = action.payload?.message || 'Password reset successfully';
    })
    .addCase(forgotPasswords.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to reset password';
      state.isError = true;
    });
    builder.addCase(resetPasswords.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(resetPasswords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = action.payload?.message || 'Password reset successfully';
    })
    .addCase(resetPasswords.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to reset password';
      state.isError = true;
    });
    builder.addCase(verifyUserToken.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(verifyUserToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = action.payload?.message || 'User verified successfully';
    })
    .addCase(verifyUserToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to verify user';
      state.isError = true;
    });
    builder.addCase(getBankingDetails.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
      state.bankingDetails = {};
    })
    .addCase(getBankingDetails.fulfilled, (state, action) => {
      const payload = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = payload?.message || 'Banking details fetched successfully';
      state.bankingDetails = payload?.bankingDetails || {};
    })
    .addCase(getBankingDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to fetch banking details';
      state.isError = true;
      state.bankingDetails = {};
    })
    builder.addCase(getBankingHistoryDetails.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.isSuccess = false;
      state.isError = false;
      state.bankingHistory = [];
    })
    .addCase(getBankingHistoryDetails.fulfilled, (state, action) => {
      const payload = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = null;
      state.isError = false;
      state.successMessage = payload?.message || 'Banking history fetched successfully';
      const hist = payload?.bankingDetailsHistory ?? payload?.bankingHistory ?? payload?.history;
      state.bankingHistory = Array.isArray(hist) ? hist : [];
    })
    .addCase(getBankingHistoryDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload?.message || 'Failed to fetch banking history';
      state.isError = true;
      state.bankingHistory = [];
    })
    builder.addCase(updateBankingDetails.pending, (state) => {
      state.isBankingUpdating = true;
      state.errorMessage = null;
      state.isError = false;
    })
    .addCase(updateBankingDetails.fulfilled, (state, action) => {
      state.isBankingUpdating = false;
      state.isSuccess = true;
      state.successMessage = action.payload?.message || 'Banking details updated successfully';
      const updated = action.payload?.bankingDetails ?? action.payload;
      if (updated && typeof updated === 'object') {
        state.bankingDetails = updated;
      }
    })
    .addCase(updateBankingDetails.rejected, (state, action) => {
      state.isBankingUpdating = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || 'Failed to update banking details';
    });
  }
});

export const { resetIsSuccess, resetIsError } = userSlice.actions;

export default userSlice.reducer;
