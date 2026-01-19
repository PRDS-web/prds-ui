//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createJob, getJobs, updateJob } from '../Service/ApiService';

export const createNewJob = createAsyncThunk(
  '/createJob',
  async (jobDetails, { rejectWithValue }) => {
    const response = await createJob(jobDetails);
    console.log('Response from createJob:', response);
    // Check if response indicates an error (has message property or status indicates error)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getAllJobs = createAsyncThunk(
  '/getAllJobs',
  async (_, { rejectWithValue }) => {  
    const response = await getJobs();
    console.log('Response from getJobs:', response);
    // Check if response indicates an error (has message property or status indicates error)
     if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
    }
);
export const updateExistingJob = createAsyncThunk(
  '/updateJob',
  async (updatedDetails, { rejectWithValue }) => {
    const response = await updateJob(updatedDetails);
    console.log('Response from updateJob:', response);
    // Check if response indicates an error (has message property or status indicates error)
    if (response.status < 200 || response.status >= 300) {  
      return rejectWithValue(response);
    }
    return response;
  }
);


const jobSlice = createSlice({
  name: 'Job',
  initialState: {
    Job: {},
    Jobs: [],
    isJobsLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewJob.pending, (state) => {
        state.isJobsLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createNewJob.fulfilled, (state, action) => {
        state.isJobsLoading = false;
        state.isRedirect = false;
        state.Jobs = [];
        state.Job = action.payload?.job || {};
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = 'Job created successfully';
      })
      .addCase(createNewJob.rejected, (state, action) => {
        state.isJobsLoading = false;
        state.isRedirect = true;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.Job = {};
      })
      .addCase(getAllJobs.pending, (state) => {
        state.isJobsLoading = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
        state.Jobs = [];
        state.Job = {};
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isJobsLoading = false;
        state.isRedirect = false;
        state.Jobs = action.payload?.jobs || [''];
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.Job = {};
        state.successMessage = 'Jobs fetched successfully';
      }).addCase(getAllJobs.rejected, (state, action) => {
        state.isJobsLoading = false;
        state.isRedirect = true;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.Jobs = [];
        state.Job = {};
      }).addCase(updateExistingJob.pending, (state) => {
        state.isUpdating = true;
        state.isRedirect = false;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateExistingJob.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isRedirect = false;
        state.Job = action.payload?.job || {};
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = 'Job updated successfully';
      }).addCase(updateExistingJob.rejected, (state, action) => {
        state.isUpdating = false;
        state.isRedirect = true;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message;
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.Job = {};
      });
  },
});

export const { resetIsSuccess, resetIsError} = jobSlice.actions;

export default jobSlice.reducer;