import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarMonthIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { createNewJob, resetIsSuccess, updateExistingJob } from '../../Slice/JobSlice';

export default function JobOpportunity({ jobs, isLoading, handleTabChange }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [viewJobDetail, setViewJobDetail] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [editedJob, setEditedJob] = useState(null);
  const [skillsInput, setSkillsInput] = useState('');

  const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    jobDescription: '',
    country: '',
    jobLocation: '',
    jobType: 'Full-time',
    jobStatus: 'Active',
    lastdateToApply: dayjs().add(30, 'days').format('YYYY-MM-DD'),
    skillsRequired: [],
    appliedCandidates: [],
  });
  const { successMessage, isSuccess } = useSelector((state) => state.jobstore);

  const textFieldStyles = {
    '& .MuiInputLabel-root': {
      color: 'inherit',
    },

    // Label color when focused (moves up)
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'inherit',
    },

    // Border color (default)
    '& .MuiOutlinedInput-root fieldset': {
      borderColor: 'inherit',
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: 'inherit',
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
      color: 'inherit',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
      color: 'inherit',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      color: 'inherit',
    },
  };
  const handeUpdateJob = () => {
    dispatch(updateExistingJob(newJob));
  }
  const handleViewJob = (job) => {
    setNewJob(JSON.parse(JSON.stringify(job)));
    setEditedJob(JSON.parse(JSON.stringify(job)));
    setSkillsInput(job.skillsRequired?.join(', ') || '');
    setViewJobDetail(true);
  };

  const handleCreateJobOpen = () => {
    setNewJob({
      jobTitle: '',
      jobDescription: '',
      country: '',
      jobLocation: '',
      jobType: 'Full-time',
      jobStatus: 'Active',
      lastdateToApply: dayjs().add(30, 'days').format('YYYY-MM-DD'),
      skillsRequired: [],
      appliedCandidates: [],
    });
    setSkillsInput('');
    setCreateJobDialogOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
       dispatch(resetIsSuccess());
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSuccess, dispatch]);

  const handleDisableJobButton = () => {
    if (
      viewJobDetail &&
      newJob.jobTitle == editedJob.jobTitle &&
      newJob.jobType == editedJob.jobType &&
      newJob.country == editedJob.country &&
      newJob.jobLocation == editedJob.jobLocation &&
      newJob.jobStatus == editedJob.jobStatus &&
      newJob.lastdateToApply == editedJob.lastdateToApply &&
      newJob.jobDescription == editedJob.jobDescription &&
      JSON.stringify(newJob.skillsRequired) ==
        JSON.stringify(editedJob.skillsRequired)
    ) {
      return true;
    } else if (
      !viewJobDetail &&
      (!newJob.jobTitle ||
        !newJob.jobDescription ||
        !newJob.country ||
        !newJob.jobLocation ||
        newJob.skillsRequired.length === 0)
    ) {
      return true;
    }
    return false;
  };

  const handleNewJobInputChange = (field, value) => {
    setNewJob((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewJobSkillsChange = (skillsString) => {
    setSkillsInput(skillsString);
    const skillsArray = skillsString
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill !== '');
    setNewJob((prev) => ({
      ...prev,
      skillsRequired: skillsArray,
    }));
  };

  const handleCreateJobSubmit = () => {
    dispatch(createNewJob(newJob));
    setNewJob({
      jobTitle: '',
      jobDescription: '',
      country: '',
      jobLocation: '',
      jobType: 'Full-time',
      jobStatus: 'Active',
      lastdateToApply: dayjs().add(30, 'days').format('YYYY-MM-DD'),
      skillsRequired: [],
      appliedCandidates: [],
    });
    setSkillsInput('');
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Job Opportunities ({jobs.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<BusinessIcon />}
            onClick={handleCreateJobOpen}
          >
            Create New Job
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Required Skill</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 200,
                      }}
                    >
                      <CircularProgress size={50} color="inherit" />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {job.jobTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.jobDescription}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{job.skillsRequired.join(', ')}</TableCell>
                  <TableCell>{job.country}</TableCell>
                  <TableCell>
                    <Chip label={job.jobType} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={job.appliedCandidates.length}
                      size="small"
                      color="info"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={job.jobStatus}
                      size="small"
                      color={job.jobStatus === 'Active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(job.lastdateToApply).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleViewJob(job)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Create Job Dialog */}
      <Dialog
        open={viewJobDetail || createJobDialogOpen}
        onClose={() => setViewJobDetail(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            color: theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
            maxHeight: '90vh',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
              py: 2,
              px: 2,
              borderRadius: '12px 12px 0 0',
              margin: -2,
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon sx={{ color: 'inherit', fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{ color: 'inherit', fontWeight: 'bold' }}
              >
                Create New Job
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                setViewJobDetail(false);
                setCreateJobDialogOpen(false);
                if(isJobSaved){
                  setIsJobSaved(false);
                  handleTabChange(null, 4);
                }
              }}
              sx={{ color: 'inherit' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Snackbar
            open={isSuccess}
            autoHideDuration={2800}
            onClose={() => {dispatch(resetIsSuccess()); setIsJobSaved(true);}}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={() => {dispatch(resetIsSuccess()); setIsJobSaved(true);}}
              severity="success"
              sx={{ width: '100%' }}
            >
              {successMessage || 'Operation completed successfully'}
            </Alert>
          </Snackbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              required
              label="Job Title"
              value={newJob.jobTitle}
              sx={textFieldStyles}
              onChange={(e) =>
                handleNewJobInputChange('jobTitle', e.target.value)
              }
              variant="outlined"
              placeholder="e.g. Senior React Developer"
            />

            <TextField
              fullWidth
              required
              label="Job Description"
              value={newJob.jobDescription}
              onChange={(e) =>
                handleNewJobInputChange('jobDescription', e.target.value)
              }
              variant="outlined"
              sx={textFieldStyles}
              multiline
              rows={3}
              placeholder="Enter detailed job description"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  required
                  sx={textFieldStyles}
                  value={newJob.country}
                  onChange={(e) =>
                    handleNewJobInputChange('country', e.target.value)
                  }
                  variant="outlined"
                  placeholder="e.g. New York, USA"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  required
                  sx={textFieldStyles}
                  value={newJob.jobLocation}
                  onChange={(e) =>
                    handleNewJobInputChange('jobLocation', e.target.value)
                  }
                  variant="outlined"
                  placeholder="e.g. Noida, Delhi"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={textFieldStyles}>Job Type</InputLabel>
                  <Select
                    value={newJob.jobType}
                    label="Job Type"
                    sx={textFieldStyles}
                    onChange={(e) =>
                      handleNewJobInputChange('jobType', e.target.value)
                    }
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Temporary">Temporary</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={textFieldStyles}>Job Status</InputLabel>
                  <Select
                    value={newJob.jobStatus}
                    label="Job Status"
                    sx={textFieldStyles}
                    onChange={(e) =>
                      handleNewJobInputChange('jobStatus', e.target.value)
                    }
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Application Deadline"
                  type="date"
                  sx={textFieldStyles}
                  value={dayjs(newJob.lastdateToApply).format('YYYY-MM-DD')}
                  onChange={(e) =>
                    handleNewJobInputChange('lastdateToApply', e.target.value)
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              sx={textFieldStyles}
              required
              label="Required Skills (comma separated)"
              value={skillsInput}
              onChange={(e) => handleNewJobSkillsChange(e.target.value)}
              variant="outlined"
              multiline
              rows={2}
              placeholder="e.g. React, JavaScript, Node.js, MongoDB"
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.50',
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'grey.600' : 'grey.200'}`,
            gap: 1,
            p: 2,
          }}
        >
          <Box sx={{ flex: 1 }} />
          <Button
            onClick={() => {
              setCreateJobDialogOpen(false);
              setViewJobDetail(false);
              if(isJobSaved){
                setIsJobSaved(false);
                handleTabChange(null, 4);
              
              }
            }}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'inherit',
              color: 'inherit',
              borderColor: 'inherit',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={viewJobDetail?handeUpdateJob:handleCreateJobSubmit}
            variant="contained"
            disabled={handleDisableJobButton()}
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'success.dark',
              },
            }}
          >
            {viewJobDetail ? 'Update Job' : 'Create Job'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
