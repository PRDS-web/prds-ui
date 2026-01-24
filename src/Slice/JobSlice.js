//userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createJob, getJobs, updateJob, applyForJob, appliedJobs } from '../Service/ApiService';

export const createNewJob = createAsyncThunk(
  '/createJob',
  async (jobDetails, { rejectWithValue }) => {
    const response = await createJob(jobDetails);
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
    // Check if response indicates an error (has message property or status indicates error)
    if (response.status < 200 || response.status >= 300) {  
      return rejectWithValue(response);
    }
    return response;
  }
);

export const applyForTheJob = createAsyncThunk(
  '/applyForJob',
  async (applicationDetails, { rejectWithValue }) => {
    // Implement the API call for applying to a job
    const response = await applyForJob(applicationDetails);
    // Check if response indicates an error (has message property or status indicates error)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getAppliedJobs = createAsyncThunk(
  '/getAppliedJobs',
  async (_, { rejectWithValue }) => {
    // Implement the API call for fetching applied jobs
    const response = await appliedJobs();
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
    updateJobApplicationStatus: (state, action) => {
      const { jobId, userId } = action.payload;
      const job = state.Jobs.find(j => j._id === jobId);
      if (job && !job.appliedCandidates.includes(userId)) {
        job.appliedCandidates.push(userId);
      }
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
      builder.addCase(getAllJobs.pending, (state) => {
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
      })
      builder.addCase(updateExistingJob.pending, (state) => {
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
      builder.addCase(applyForTheJob.pending, (state) => {
        state.isJobsLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(applyForTheJob.fulfilled, (state, action) => {
        state.isJobsLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.successMessage = action.payload?.message || 'Applied for the job successfully';
      }).addCase(applyForTheJob.rejected, (state, action) => {
        state.isJobsLoading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload?.message || 'Failed to apply for the job';
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.Jobs = [];
      });
      builder.addCase(getAppliedJobs.pending, (state) => {
        state.isJobsLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.isJobsLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.errorMessage = null;
        state.isError = false;
        state.Jobs = action.payload?.applications || [];
        state.successMessage = 'Applied jobs fetched successfully';
      }).addCase(getAppliedJobs.rejected, (state, action) => {
        state.isJobsLoading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload?.message || 'Failed to fetch applied jobs';
        state.successMessage = null;
        state.isSuccess = false;
        state.isError = true;
        state.Jobs = [];
      });
  },
});

export const { resetIsSuccess, resetIsError, updateJobApplicationStatus } = jobSlice.actions;

export default jobSlice.reducer;