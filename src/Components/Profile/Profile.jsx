import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  CssBaseline
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
  CreditCard,
  Business,
  School,
  Work,
  LinkedIn,
  GitHub,
  Twitter,
} from '@mui/icons-material';
import { fetchProfile, updateProfile, resetIsSuccess, resetIsError } from '../../Slice/ProfileSlice';

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
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [skill, setSkill] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
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

    // Banking Info
    bankName: 'Chase Bank',
    accountNumber: '**** **** **** 1234',
    routingNumber: '021000021',
    accountType: 'Checking',
    cardType: 'Visa',

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
      };
      setProfileData(updatedProfileData);
      setEditData(updatedProfileData);
    }
  }, [users]);

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

  // Debug logging for state changes
  useEffect(() => {
    console.log('Profile state changed:', {
      isSuccess,
      isError,
      successMessage,
      errorMessage,
      isUpdating
    });
  }, [isSuccess, isError, successMessage, errorMessage, isUpdating]);

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

  const renderBankingInfo = () => (
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
          <AccountBalance sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Bank Name
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.bankName}
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
          <CreditCard sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Account Number
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={editData.accountNumber}
                onChange={(e) =>
                  handleInputChange('accountNumber', e.target.value)
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
                {profileData.accountNumber}
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
          <Business sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Account Type
            </Typography>
            {isEditing ? (
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <Select
                  value={editData.accountType}
                  onChange={(e) =>
                    handleInputChange('accountType', e.target.value)
                  }
                >
                  <MenuItem value="Checking">Checking</MenuItem>
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.accountType}
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
          <CreditCard sx={{ mr: 2, color: theme.palette.mode === 'dark' ? 'primary.main' : '#1976d2', fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Card Type
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
            >
              {profileData.cardType}
            </Typography>
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

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderGeneralInfo();
      case 1:
        return renderBankingInfo();
      case 2:
        return renderSecurityPrivacy();
      case 3:
        return renderProfessionalInfo();
      case 4:
        return renderSocialLinks();
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

            {/* Action Buttons */}
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
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
