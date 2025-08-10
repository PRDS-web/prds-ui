import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  LocationOn,
  ArrowBack,
  AccountBalance,
  Security,
  Notifications,
  Language,
  Visibility,
  VisibilityOff,
  Lock,
  CreditCard,
  Business,
  School,
  Work,
  CalendarToday,
  LinkedIn,
  GitHub,
  Twitter,
} from '@mui/icons-material';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [skill,setSkill] = useState('');
  const [profileData, setProfileData] = useState({
    // General Info
    name: 'John Doe',
    email: 'john.doe@example.com',
    country: 'United States',
    mobile: '+1 (555) 123-4567',
    avatar: 'https://via.placeholder.com/150/2196f3/ffffff?text=JD',
    bio: 'Professional Full-Stack Developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    website: 'https://johndoe.dev',

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
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    console.log("I have data", field);
     
    if(field == 'skills'){
      console.log("I have value", value);
      if(value=='' || value == undefined || value ==null){
        return;
      }
      let sk = [...profileData.skills];
      sk.push(value);
      profileData.skills = sk;
      setSkill('');
      return;
    }
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            justifyContent: 'space-evenly',
          }}
        >
          <Person sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
                Shivendra Kuma
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
          }}
        >
          <Email sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Phone sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
                value={editData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.mobile}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      {/*  
      <Grid item xs={12}>
        <Box sx={{ 
          p: 3,
          borderRadius: 2,
          backgroundColor: 'background.default',
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
            Bio
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              value={editData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              variant="outlined"
              multiline
              rows={3}
              sx={{ mt: 1 }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: 'text.primary', mt: 0.5, lineHeight: 1.6 }}>
              {profileData.bio}
            </Typography>
          )}
        </Box>
      </Grid> */}
    </Grid>
  );

  const handleDelete = (index) => {
    let sk = [...profileData.skills];
    sk.splice(index,1);
    profileData.skills = sk;
    console.log("delete the value", sk);
  };
  const renderBankingInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <AccountBalance sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CreditCard sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Business sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CreditCard sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Manage your security settings and privacy preferences to keep your
          account safe.
        </Alert>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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

      <Grid item xs={12}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Notification Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Work sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Person sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <School sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <School sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
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
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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
            {profileData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
                onDelete={isEditing ?()=> handleDelete(index) : ''}
                // deleteIcon={<DoneIcon />}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderSocialLinks = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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
                value={editData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}
              >
                {profileData.linkedin}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
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
              src={profileData.avatar}
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
              👤 {profileData.name}
            </Typography>
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
              border: '2px solid',
              borderColor: 'divider',
              overflow: 'hidden',
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
              }}
            >
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
                  },
                }}
              >
                {tabLabels.map((tab, index) => (
                  <Tab
                    key={index}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {tab.icon}
                        <Typography sx={{ ml: 1, fontSize: '0.9rem' }}>
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

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                p: 3,
                borderTop: '2px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default',
              }}
            >
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
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
                    startIcon={<Save />}
                    onClick={handleSave}
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
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
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
