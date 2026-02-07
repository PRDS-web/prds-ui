import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Chip,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  LocationOn,
  AccountBalance,
  Security,
  School,
  Work,
  LinkedIn,
  GitHub,
  Twitter,
  WorkHistory,
  Event,
  CheckCircle
} from '@mui/icons-material';
import { fetchProfile, updateProfile, resetIsSuccess, resetIsError } from '../../Slice/ProfileSlice';
import { getAppliedJobs } from '../../Slice/JobSlice';
import BankingInfo from './BankingInfo';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users, isLoading, isUpdating, isSuccess, isError, errorMessage, successMessage } = useSelector((state) => state.profile);
  const { Jobs } = useSelector((state) => state.jobstore || {});
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [skill, setSkill] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [expandedApplicationId, setExpandedApplicationId] = useState(null);
  const [profileData, setProfileData] = useState({
    // General Info
    name: '',
    email: '',
    country: '',
    mobileNumber: '',
    picture: '',
    bio: 'Professional Full-Stack Developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    website: 'https://johndoe.dev',
    loggedInType: '',
    isVerified: false,
    createdAt: '',
    updatedAt: '',

    // Banking Info
    bankName: 'Chase Bank',
    accountNumber: '**** **** **** 1234',
    routingNumber: '021000021',
    accountType: 'Checking',
    cardType: 'Visa',
    paypalEmail: '',
    upiId: '',

    // Security & Privacy
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    profileVisibility: 'Public',
    dataSharing: false,

    // Professional Info
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
    experience: '5+ years',
    skills: [],
    education: 'Bachelor of Computer Science',
    university: 'MIT',
    graduationYear: '2015',

    // Social Links
    linkedIn: '',
    github: '',
    twitter: 'https://twitter.com/johndoe',
  });

  const [editData, setEditData] = useState({ ...profileData });
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [pendingTabChange, setPendingTabChange] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update local state when Redux state changes
  useEffect(() => {
    if (users && Object.keys(users).length > 0) {
      const updatedProfileData = {
        ...profileData,
        name: users.name || '',
        email: users.email || '',
        country: users.country || '',
        mobileNumber: users.mobileNumber || '',
        picture: users.picture || profileData.picture,
        skills: users.skills || [],
        linkedIn: users.linkedIn || '',
        github: users.github || '',
        loggedInType: users.loggedInType || '',
        isVerified: users.isVerified || false,
        createdAt: users.createdAt || '',
        updatedAt: users.updatedAt || '',
      };
      setProfileData(updatedProfileData);
      setEditData(updatedProfileData);
    }
  }, [users]);

  // Fetch applied jobs when Applied Jobs tab is selected
  useEffect(() => {
    if (selectedTab === 5) {
      dispatch(getAppliedJobs());
    }
  }, [selectedTab, dispatch]);

  // Reset success/error messages
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(resetIsSuccess());
      }, 3000);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(resetIsError());
      }, 5000);
    }
  }, [isSuccess, isError, dispatch]);


  const handleTabChange = (event, newValue) => {
    if (isEditing && hasUnsavedChanges) {
      // Show Material-UI dialog for unsaved changes
      setPendingTabChange(newValue);
      setShowUnsavedChangesDialog(true);
    } else {
      setSelectedTab(newValue);
      setIsEditing(false);
      setHasUnsavedChanges(false);
    }
  };

  const handleConfirmTabChange = () => {
    if (pendingTabChange !== null) {
      setSelectedTab(pendingTabChange);
      setIsEditing(false);
      setHasUnsavedChanges(false);
      setEditData({ ...profileData });
      setPendingTabChange(null);
    }
    setShowUnsavedChangesDialog(false);
  };

  const handleCancelTabChange = () => {
    setPendingTabChange(null);
    setShowUnsavedChangesDialog(false);
  };

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
    setHasUnsavedChanges(false);
  };

  const handleSave = async () => {
    try {
      console.log('Starting profile update...');
      // Prepare data for backend update
      const updateData = {
        name: editData.name,
        email: editData.email,
        country: editData.country,
        mobileNumber: editData.mobileNumber,
        skills: editData.skills,
        linkedIn: editData.linkedIn,
        github: editData.github,
      };

      console.log('Update data:', updateData);
      const result = await dispatch(updateProfile(updateData)).unwrap();
      console.log('Profile update successful:', result);
      
      // Update local state
      setProfileData({ ...editData });
      setIsEditing(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      console.log('Error details:', {
        message: error.message,
        status: error.status,
        data: error.data
      });
      // Error is handled by Redux state
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleInputChange = (field, value) => {
    if (field === 'skills') {
      if (value === '' || value === undefined || value === null) {
        return;
      }
      const updatedSkills = [...editData.skills, value];
      setEditData(prev => ({
        ...prev,
        skills: updatedSkills,
      }));
      setSkill('');
      setHasUnsavedChanges(true);
      return;
    }
    
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleDelete = (index) => {
    const updatedSkills = [...editData.skills];
    updatedSkills.splice(index, 1);
    setEditData(prev => ({
      ...prev,
      skills: updatedSkills,
    }));
    setHasUnsavedChanges(true);
  };

  const tabLabels = [
    { label: 'General Info', icon: <Person /> },
    { label: 'Banking Info', icon: <AccountBalance /> },
    { label: 'Security & Privacy', icon: <Security /> },
    { label: 'Professional Info', icon: <Work /> },
    { label: 'Social Links', icon: <LinkedIn /> },
    { label: 'Applied Jobs', icon: <WorkHistory /> },
  ];

  const renderGeneralInfo = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
            justifyContent: 'space-evenly',
          }}
        >
          <Person sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Full Name
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.name || 'Not provided'}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
            width: '100%',
          }}
        >
          <Email sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Email Address
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                variant="outlined"
                size="small"
                type="email"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.email}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <LocationOn sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Country
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.country}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Phone sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Mobile Number
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.mobileNumber}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderSecurityPrivacy = () => (
    <Grid container spacing={3}>
      <Grid size={{xs: 12, md: 6}}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Manage your security settings and privacy preferences to keep your
          account safe.
        </Alert>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Two-Factor Authentication
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={
                  isEditing ? editData.twoFactorAuth : profileData.twoFactorAuth
                }
                onChange={(e) =>
                  handleInputChange('twoFactorAuth', e.target.checked)
                }
                disabled={!isEditing}
              />
            }
            label="Enable 2FA for enhanced security"
          />
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Profile Visibility
          </Typography>
          {isEditing ? (
            <FormControl fullWidth size="small">
              <Select
                value={editData.profileVisibility}
                onChange={(e) =>
                  handleInputChange('profileVisibility', e.target.value)
                }
              >
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Friends Only">Friends Only</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Chip label={profileData.profileVisibility} color="primary" />
          )}
        </Box>
      </Grid>

        <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Notification Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      isEditing
                        ? editData.emailNotifications
                        : profileData.emailNotifications
                    }
                    onChange={(e) =>
                      handleInputChange('emailNotifications', e.target.checked)
                    }
                    disabled={!isEditing}
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      isEditing
                        ? editData.smsNotifications
                        : profileData.smsNotifications
                    }
                    onChange={(e) =>
                      handleInputChange('smsNotifications', e.target.checked)
                    }
                    disabled={!isEditing}
                  />
                }
                label="SMS Notifications"
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      isEditing
                        ? editData.marketingEmails
                        : profileData.marketingEmails
                    }
                    onChange={(e) =>
                      handleInputChange('marketingEmails', e.target.checked)
                    }
                    disabled={!isEditing}
                  />
                }
                label="Marketing Emails"
              />
            </Grid>
              <Grid size={{xs: 12, md: 6}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      isEditing ? editData.dataSharing : profileData.dataSharing
                    }
                    onChange={(e) =>
                      handleInputChange('dataSharing', e.target.checked)
                    }
                    disabled={!isEditing}
                  />
                }
                label="Data Sharing"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );

  const renderProfessionalInfo = () => (
    <Grid container spacing={3}>
      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Work sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Company
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.company}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Person sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Position
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.position}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <School sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Education
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.education}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <School sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              University
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.university}
                onChange={(e) =>
                  handleInputChange('university', e.target.value)
                }
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.university}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Skills
          </Typography>
          {isEditing && (
            <Box display={'flex'}>
              <TextField   
                value={skill}
                onChange={(e)=> setSkill(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
              <Button 
              onClick={()=> handleInputChange('skills', skill)}
               sx={{px: 2,
                    py: '0.5px',
                    fontWeight: 400,
                    borderRadius: 3,
                    ml: 3,
                    color: 'white',
                    cursor: 'pointer',
                    backgroundColor: 'blue'
                    }}>Add Skill</Button>
            </Box>
          )}
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {editData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
                onDelete={isEditing ? () => handleDelete(index) : undefined}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderSocialLinks = () => (
    <Grid container spacing={3}>
      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <LinkedIn sx={{ mr: 2, color: '#0077b5', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              LinkedIn
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.linkedIn}
                onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.linkedIn}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <GitHub sx={{ mr: 2, color: '#333', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              GitHub
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.github}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid size={{xs: 12, md: 6}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
          }}
        >
          <Twitter sx={{ mr: 2, color: '#1DA1F2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Twitter
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.twitter}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderAppliedJobs = () => {
    const appliedJobs = Jobs && Jobs.length > 0 ? Jobs : [];

    if (!appliedJobs || appliedJobs.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <WorkHistory sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No Applied Jobs Yet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You haven't applied for any jobs yet. Start exploring opportunities!
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        {/* Summary Card */}
        <Card sx={{ 
          mb: 3, 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                  Total Applications
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {appliedJobs.length}
                </Typography>
              </Box>
              <WorkHistory sx={{ fontSize: 60, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#fff', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.palette.mode === 'dark' ? '#444' : '#e0e0e0'}` }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#667eea', width: '20%' }}>Job Title</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#667eea', width: '20%' }}>Location</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#667eea', width: '12%' }}>Job Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#667eea', width: '12%' }}>Salary</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#667eea', width: '16%' }}>Applied Date</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: 700, color: '#667eea', width: '20%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((application, index) => (
                <React.Fragment key={application._id || index}>
                  <tr style={{ borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#444' : '#e0e0e0'}` }}>
                    <td style={{ padding: '16px', width: '20%' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {application.jobDetails?.jobTitle || 'N/A'}
                      </Typography>
                    </td>
                    <td style={{ padding: '16px', width: '20%' }}>
                      <Typography variant="body2">
                        {application.jobDetails?.jobLocation}, {application.jobDetails?.country}
                      </Typography>
                    </td>
                    <td style={{ padding: '16px', width: '12%' }}>
                      <Chip label={application.jobDetails?.jobType || 'N/A'} size="small" />
                    </td>
                    <td style={{ padding: '16px', width: '12%' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
                        {application.jobDetails?.salary || 'N/A'}
                      </Typography>
                    </td>
                    <td style={{ padding: '16px', width: '16%' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : 'N/A'}
                      </Typography>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', width: '20%' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setExpandedApplicationId(
                          expandedApplicationId === (application._id || index) ? null : (application._id || index)
                        )}
                        sx={{ 
                          textTransform: 'none',
                          color: '#667eea',
                          borderColor: '#667eea',
                          '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                        }}
                      >
                        {expandedApplicationId === (application._id || index) ? 'Hide' : 'View'} Details
                      </Button>
                    </td>
                  </tr>

                  {/* Expanded Application Details */}
                  {expandedApplicationId === (application._id || index) && (
                    <tr>
                      <td colSpan={6} style={{ padding: '16px', backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f9f9f9' }}>
                        <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Application Details
                              </Typography>
                            </Grid>

                            {/* Applicant Info */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Full Name
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.firstName} {application.lastName}
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Email
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.email || 'N/A'}
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Phone
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.phoneNumber || 'N/A'}
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Experience
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.experience} years
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                LinkedIn
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.linkedin || 'N/A'}
                              </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Applied Date
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : 'N/A'}
                              </Typography>
                            </Grid>

                            {/* Skills */}
                            {application.skills && application.skills.length > 0 && (
                              <Grid size={{ xs: 12 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                  Skills
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                  {application.skills.map((skill, idx) => (
                                    <Chip
                                      key={idx}
                                      label={skill}
                                      size="small"
                                      sx={{
                                        background: 'rgba(102, 126, 234, 0.2)',
                                        color: '#667eea',
                                        fontWeight: 500
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Grid>
                            )}

                            {/* Job Description */}
                            {application.jobDetails?.jobDescription && (
                              <Grid size={{ xs: 12 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                  Job Description
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                                  {application.jobDetails.jobDescription}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Card>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Card>
      </Box>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderGeneralInfo();
      case 1:
        return <BankingInfo />;
      case 2:
        return renderSecurityPrivacy();
      case 3:
        return renderProfessionalInfo();
      case 4:
        return renderSocialLinks();
      case 5:
        return renderAppliedJobs();
      default:
        return renderGeneralInfo();
    }
  };

  // Show loading state while fetching profile
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 8,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Success/Error Notifications */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => dispatch(resetIsSuccess())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => dispatch(resetIsSuccess())} severity="success" sx={{ width: '100%' }}>
          {successMessage || 'Operation completed successfully'}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={() => dispatch(resetIsError())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => dispatch(resetIsError())} severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'An error occurred while updating the profile'}
        </Alert>
      </Snackbar>

      {/* Unsaved Changes Confirmation Dialog */}
      <Dialog
        open={showUnsavedChangesDialog}
        onClose={handleCancelTabChange}
        aria-labelledby="unsaved-changes-dialog-title"
        aria-describedby="unsaved-changes-dialog-description"
      >
        <DialogTitle id="unsaved-changes-dialog-title">
          Unsaved Changes
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="unsaved-changes-dialog-description">
            You have unsaved changes. Are you sure you want to switch tabs? Your changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelTabChange} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmTabChange} color="error" variant="contained">
            Switch Tab
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f5f5',
          py: 4,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              boxShadow: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Avatar
              src={profileData.picture || 'https://via.placeholder.com/150/2196f3/ffffff?text=JD'}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                border: '4px solid white',
                boxShadow: 3,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              👤 {profileData.name || 'User Profile'}
            </Typography>
            
            {/* Status Chips */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {profileData.loggedInType && (
                <Chip
                  icon={profileData.loggedInType === 'google' ? <span>🔍</span> : 
                        profileData.loggedInType === 'github' ? <span>🐙</span> : 
                        <span>📧</span>}
                  label={`${profileData.loggedInType.charAt(0).toUpperCase() + profileData.loggedInType.slice(1)} Login`}
                  color="primary"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '& .MuiChip-label': {
                      color: 'white',
                    },
                  }}
                />
              )}
              <Chip
                icon={profileData.isVerified ? <span>✅</span> : <span>⚠️</span>}
                label={profileData.isVerified ? 'Verified' : 'Not Verified'}
                color={profileData.isVerified ? 'success' : 'warning'}
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: profileData.isVerified ? '#4caf50' : '#ff9800',
                  '& .MuiChip-label': {
                    color: 'white',
                  },
                }}
              />
            </Box>
            {(profileData.updatedAt || profileData.createdAt) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', opacity: 0.95, mb: 2 }}>
                {profileData.updatedAt && (
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Event sx={{ fontSize: '1rem' }} />
                    Profile updated on {dayjs(profileData.updatedAt).format('DD MMM YYYY, HH:mm')}
                  </Typography>
                )}
                {profileData.createdAt && (
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Event sx={{ fontSize: '1rem' }} />
                    Account created on {dayjs(profileData.createdAt).format('DD MMM YYYY')}
                  </Typography>
                )}
              </Box>
            )}
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}
            >
              Manage your profile settings and preferences
            </Typography>
          </Paper>

          {/* Profile Content */}
          <Paper
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
              border: theme.palette.mode === 'dark' ? '2px solid divider' : '2px solid #e0e0e0',
            }}
          >
            {/* Tabs */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderTop: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderTopColor: theme.palette.mode === 'dark' ? 'transparent' : 'divider',
              }}
            >
              {hasUnsavedChanges && isEditing && (
                <Alert 
                  severity="warning" 
                  sx={{ 
                    position: 'absolute', 
                    top: -50, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                  }}
                >
                  You have unsaved changes. Please save or cancel before switching tabs.
                </Alert>
              )}
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 64,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-selected': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                      fontWeight: 700,
                    },
                    '&:hover': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.08)',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                    height: 3,
                  },
                  '& .MuiTabs-scrollButtons': {
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-disabled': {
                      opacity: 0.3,
                    },
                  },
                }}
              >
                {tabLabels.map((tab, index) => (
                  <Tab
                    key={index}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          color: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          mr: 1,
                          '& .MuiSvgIcon-root': {
                            fontSize: '1.2rem',
                          }
                        }}>
                          {tab.icon}
                        </Box>
                        <Typography sx={{ 
                          ml: 0.5, 
                          fontSize: '0.9rem',
                          color: 'inherit',
                          fontWeight: 'inherit'
                        }}>
                          {tab.label}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* Tab Content */}
            <TabPanel value={selectedTab} index={selectedTab}>
              {renderTabContent()}
            </TabPanel>

            {/* Loading Overlay */}
            {isUpdating && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Updating Profile...
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Action Buttons - hidden on Applied Jobs and Banking Info (BankingInfo has its own Edit/Submit/Cancel) */}
            {selectedTab !== 5 && selectedTab !== 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                p: 3,
                borderTop: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
              }}
            >
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  disabled={isUpdating}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  Edit {tabLabels[selectedTab].label}
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <Save />}
                    onClick={handleSave}
                    disabled={isUpdating}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      boxShadow: 2,
                      backgroundColor: 'success.main',
                      '&:hover': {
                        backgroundColor: 'success.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={isUpdating}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
