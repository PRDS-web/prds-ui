import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contactUs } from '../Service/ApiService';

export const contactUser = createAsyncThunk(
  '/contact',
  async (userInfo, { rejectWithValue }) => {
    const response = await contactUs(userInfo);
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: {
    isLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(contactUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage =
          action.payload?.message || 'Contact Successfully Completed';
      })
      .addCase(contactUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message || 'Contact Failed';
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { resetIsSuccess, resetIsError } = enquirySlice.actions;

export default enquirySlice.reducer;
