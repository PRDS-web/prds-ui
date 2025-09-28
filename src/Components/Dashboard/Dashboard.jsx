import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  ThemeProvider,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Reply as ReplyIcon,
  Send as SendIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  PersonAddAlt as PersonAddAltIcon,
  RemoveCircle as RemoveCircleIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { resetIsSuccess, resetIsError, getAllUsers } from '../../Slice/UserLoginSlice';

// Enhanced mock data for modern dashboard
const mockStats = {
  totalUsers: 1247,
  totalEmails: 89,
  totalCompanies: 156,
  growthRate: 12.5,
  newUsersToday: 23,
  newUsersThisWeek: 156,
  newUsersThisMonth: 423,
  contactRequestsToday: 12,
  contactRequestsThisWeek: 67,
  contactRequestsThisMonth: 234,
  jobOpportunities: 45,
  activeJobs: 23,
  completedJobs: 156,
  revenue: 45678,
  conversionRate: 8.2,
  avgResponseTime: '2.3h',
  customerSatisfaction: 4.8,
};

const mockQuickStats = [
  {
    title: 'Total Revenue',
    value: '$45,678',
    change: '+12.5%',
    changeType: 'positive',
    icon: <TrendingUpIcon />,
    color: 'success',
  },
  {
    title: 'Conversion Rate',
    value: '8.2%',
    change: '+2.1%',
    changeType: 'positive',
    icon: <AssessmentIcon />,
    color: 'primary',
  },
  {
    title: 'Avg Response Time',
    value: '2.3h',
    change: '-0.5h',
    changeType: 'positive',
    icon: <EmailIcon />,
    color: 'info',
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    changeType: 'positive',
    icon: <PeopleIcon />,
    color: 'warning',
  },
];

const mockRecentUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Tech Corp',
    country: 'United States',
    status: 'active',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    company: 'Design Studio',
    country: 'Canada',
    status: 'active',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=2',
    joinDate: '2024-01-14',
    lastActive: '1 hour ago',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    company: 'Marketing Plus',
    country: 'United Kingdom',
    status: 'pending',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joinDate: '2024-01-13',
    lastActive: '3 days ago',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    company: 'Innovation Labs',
    country: 'Australia',
    status: 'active',
    role: 'moderator',
    avatar: 'https://i.pravatar.cc/150?img=4',
    joinDate: '2024-01-12',
    lastActive: '5 hours ago',
  },
];

const mockContactRequests = [
  {
    id: 1,
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    company: 'Digital Solutions',
    country: 'Germany',
    message:
      'I would like to discuss a potential partnership for our upcoming project. We are looking for innovative technology solutions.',
    status: 'unread',
    time: '5 minutes ago',
    priority: 'high',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    company: 'Creative Agency',
    country: 'Spain',
    message:
      'We are interested in your services and would like to schedule a consultation call to discuss our requirements.',
    status: 'read',
    time: '1 hour ago',
    priority: 'medium',
  },
  {
    id: 3,
    name: 'David Chen',
    email: 'david.chen@example.com',
    company: 'Tech Innovations',
    country: 'Singapore',
    message:
      'Looking for collaboration opportunities in the Asian market. Would appreciate if you could share more details.',
    status: 'unread',
    time: '3 hours ago',
    priority: 'high',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    company: 'Startup Hub',
    country: 'Netherlands',
    message:
      'We are a new startup and would love to learn more about your platform and how it can help us grow.',
    status: 'read',
    time: '6 hours ago',
    priority: 'low',
  },
];

const mockRecentActivities = [
  {
    id: 1,
    action: 'New user registration',
    user: 'John Doe',
    time: '2 minutes ago',
    type: 'registration',
  },
  {
    id: 2,
    action: 'Contact form submitted',
    user: 'Jane Smith',
    time: '15 minutes ago',
    type: 'contact',
  },
  {
    id: 3,
    action: 'Profile updated',
    user: 'Mike Johnson',
    time: '1 hour ago',
    type: 'profile',
  },
  {
    id: 4,
    action: 'Company information updated',
    user: 'Sarah Wilson',
    time: '2 hours ago',
    type: 'company',
  },
];

const mockJobOpportunities = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    type: 'Full-time',
    status: 'active',
    applications: 23,
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    salary: '$80k - $120k',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'New York',
    type: 'Contract',
    status: 'active',
    applications: 15,
    postedDate: '2024-01-12',
    deadline: '2024-02-12',
    salary: '$60k - $90k',
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'San Francisco',
    type: 'Full-time',
    status: 'closed',
    applications: 45,
    postedDate: '2024-01-05',
    deadline: '2024-02-05',
    salary: '$100k - $150k',
  },
];

const mockChartData = {
  userGrowth: [65, 78, 90, 105, 120, 135, 150],
  monthlyRegistrations: [45, 52, 48, 61, 55, 67, 73],
  countries: ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'India'],
  countryUsers: [320, 180, 150, 120, 95, 85, 75],
  // Enhanced time-based data
  dailyNewUsers: [12, 15, 8, 23, 19, 25, 18, 22, 16, 20, 14, 17, 21, 19],
  dailyContactRequests: [5, 8, 3, 12, 9, 15, 11, 8, 6, 13, 7, 10, 9, 12],
  monthlyUserGrowth: [
    423, 456, 489, 512, 534, 567, 589, 612, 634, 667, 689, 712,
  ],
  monthlyContactGrowth: [
    234, 256, 278, 301, 323, 345, 367, 389, 412, 434, 456, 478,
  ],
  timeLabels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

const Dashboard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [emailFilter, setEmailFilter] = useState('all');
  const [attachments, setAttachments] = useState([]);
  const [ccEmails, setCcEmails] = useState([]);
  const [bccEmails, setBccEmails] = useState([]);
  const [toEmails, setToEmails] = useState([]);
  const [ccInput, setCcInput] = useState('');
  const [bccInput, setBccInput] = useState('');
  const [toInput, setToInput] = useState('');
  const dispatch = useDispatch();
  
  const { users, isError, isLoading, isSuccess, errorMessage, successMessage } =
    useSelector((state) => state.user);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setAttachments([]);
    setCcEmails([]);
    setBccEmails([]);
    setToEmails([]);
    setCcInput('');
    setBccInput('');
    setToInput('');
  };

  const handleCloseEmailDialog = () => {
    setSelectedEmail(null);
    setReplyText('');
    setAttachments([]);
    setCcEmails([]);
    setBccEmails([]);
    setToEmails([]);
    setCcInput('');
    setBccInput('');
    setToInput('');
  };
   useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);
  const handleReply = (email) => {
    console.log('Replying to:', email, 'Message:', replyText);
    console.log('To:', toEmails);
    console.log('Attachments:', attachments);
    console.log('CC:', ccEmails);
    console.log('BCC:', bccEmails);
    // Here you would typically send the reply
    handleCloseEmailDialog();
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const addToEmail = () => {
    if (toInput.trim() && !toEmails.includes(toInput.trim())) {
      setToEmails((prev) => [...prev, toInput.trim()]);
      setToInput('');
    }
  };

  const removeToEmail = (email) => {
    setToEmails((prev) => prev.filter((e) => e !== email));
  };

  const addCcEmail = () => {
    if (ccInput.trim() && !ccEmails.includes(ccInput.trim())) {
      setCcEmails((prev) => [...prev, ccInput.trim()]);
      setCcInput('');
    }
  };

  const removeCcEmail = (email) => {
    setCcEmails((prev) => prev.filter((e) => e !== email));
  };

  const addBccEmail = () => {
    if (bccInput.trim() && !bccEmails.includes(bccInput.trim())) {
      setBccEmails((prev) => [...prev, bccInput.trim()]);
      setBccInput('');
    }
  };

  const removeBccEmail = (email) => {
    setBccEmails((prev) => prev.filter((e) => e !== email));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return <PersonAddIcon fontSize="small" />;
      case 'contact':
        return <EmailIcon fontSize="small" />;
      case 'profile':
        return <EditIcon fontSize="small" />;
      case 'company':
        return <BusinessIcon fontSize="small" />;
      default:
        return <NotificationsIcon fontSize="small" />;
    }
  };

  const filteredUsers = mockRecentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmails = mockContactRequests.filter((email) => {
    if (emailFilter === 'all') return true;
    if (emailFilter === 'unread') return email.status === 'unread';
    if (emailFilter === 'read') return email.status === 'read';
    if (emailFilter === 'high') return email.priority === 'high';
    return true;
  });

  // Modern Stat Card Component
  const ModernStatCard = ({
    title,
    value,
    change,
    changeType,
    icon,
    color,
  }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${theme.palette[color].light} 0%, ${theme.palette[color].main} 100%)`,
        color: theme.palette[color].contrastText,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          transition: 'all 0.3s ease',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 28, color: 'white' } })}
          </Box>
          <Chip
            label={change}
            size="small"
            sx={{
              backgroundColor:
                changeType === 'positive' ? 'success.main' : 'error.main',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
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
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        p: 4,
      }}
    >
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => dispatch(resetIsSuccess())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => dispatch(resetIsSuccess())}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage || 'Operation completed successfully'}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={() => dispatch(resetIsError())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => dispatch(resetIsError())}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage || 'An error occurred while updating the profile'}
        </Alert>
      </Snackbar>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
          >
            Welcome back, Admin! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your platform today.
          </Typography>
        </Box>
      </Box>

      {/* Modern Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockQuickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ModernStatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Additional Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography
                variant="h4"
                color="success.main"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {mockStats.newUsersThisMonth}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New Users This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography
                variant="h4"
                color="warning.main"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {mockStats.contactRequestsThisMonth}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact Requests This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography
                variant="h4"
                color="info.main"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {mockStats.completedJobs}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography
                variant="h4"
                color="error.main"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {mockStats.growthRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Growth Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.50',
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              px: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 64,
                color:
                  theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Tab label="Dashboard Overview" icon={<DashboardIcon />} />
            <Tab label="Users Management" icon={<PeopleIcon />} />
            <Tab label="Contact Requests" icon={<EmailIcon />} />
            <Tab label="Email Inbox" icon={<EmailIcon />} />
            <Tab label="Job Opportunities" icon={<BusinessIcon />} />
            <Tab label="Analytics & Reports" icon={<AssessmentIcon />} />
            <Tab label="System Activities" icon={<NotificationsIcon />} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {/* Recent Users */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Recent Users
                    </Typography>
                    <List>
                      {mockRecentUsers.slice(0, 4).map((user) => (
                        <ListItem key={user.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar src={user.avatar} alt={user.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.name}
                            secondary={
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {user.company} • {user.country}
                                </Typography>
                                <Chip
                                  label={user.status}
                                  size="small"
                                  color={getStatusColor(user.status)}
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Activities */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Recent Activities
                    </Typography>
                    <List>
                      {mockRecentActivities.map((activity) => (
                        <ListItem key={activity.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: 'grey.100',
                                color: 'text.secondary',
                              }}
                            >
                              {getActivityIcon(activity.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={activity.action}
                            secondary={`${activity.user} • ${activity.time}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Box>
              {/* Search and Actions */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <TextField
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 300 }}
                />
              </Box>

              {/* Users Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Active</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              sx={{ mr: 2 }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 'bold' }}
                              >
                                {user.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            size="small"
                            color={
                              user.role === 'admin'
                                ? 'error'
                                : user.role === 'moderator'
                                  ? 'warning'
                                  : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={getStatusColor(user.status)}
                          />
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton size="small" color="secondary">
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
          )}

          {tabValue === 2 && (
            <Box>
              {/* Contact Requests Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Contact Requests ({mockContactRequests.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip
                    label={`${mockContactRequests.filter((c) => c.status === 'unread').length} Unread`}
                    color="warning"
                  />
                  <Chip
                    label={`${mockContactRequests.filter((c) => c.priority === 'high').length} High Priority`}
                    color="error"
                  />
                </Box>
              </Box>

              {/* Contact Requests Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contact</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockContactRequests.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {contact.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.country}</TableCell>
                        <TableCell>
                          <Chip
                            label={contact.priority}
                            size="small"
                            color={
                              contact.priority === 'high'
                                ? 'error'
                                : contact.priority === 'medium'
                                  ? 'warning'
                                  : 'success'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={contact.status}
                            size="small"
                            color={
                              contact.status === 'unread'
                                ? 'warning'
                                : 'success'
                            }
                          />
                        </TableCell>
                        <TableCell>{contact.time}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<EmailIcon />}
                              onClick={() => handleEmailClick(contact)}
                            >
                              Reply
                            </Button>
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tabValue === 3 && (
            <Box>
              {/* Emails Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Inbox ({filteredEmails.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                      value={emailFilter}
                      label="Filter"
                      onChange={(e) => setEmailFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="unread">Unread</MenuItem>
                      <MenuItem value="read">Read</MenuItem>
                      <MenuItem value="high">High Priority</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" startIcon={<RefreshIcon />}>
                    Refresh
                  </Button>
                </Box>
              </Box>

              {/* Emails Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEmails.map((email) => (
                      <TableRow
                        key={email.id}
                        sx={{
                          bgcolor:
                            email.status === 'unread'
                              ? 'action.hover'
                              : 'inherit',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                        onClick={() => handleEmailClick(email)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              src={`https://i.pravatar.cc/150?img=${email.id}`}
                              alt={email.fromName}
                              sx={{ mr: 2, width: 32, height: 32 }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight:
                                    email.status === 'unread'
                                      ? 'bold'
                                      : 'normal',
                                }}
                              >
                                {email.fromName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {email.from}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight:
                                email.status === 'unread' ? 'bold' : 'normal',
                            }}
                          >
                            {email.subject}
                          </Typography>
                        </TableCell>
                        <TableCell>{email.company}</TableCell>
                        <TableCell>
                          <Chip
                            label={email.priority}
                            size="small"
                            color={
                              email.priority === 'high'
                                ? 'error'
                                : email.priority === 'medium'
                                  ? 'warning'
                                  : 'success'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={email.status}
                            size="small"
                            color={
                              email.status === 'unread' ? 'warning' : 'success'
                            }
                          />
                        </TableCell>
                        <TableCell>{email.time}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" color="primary">
                              <ReplyIcon />
                            </IconButton>
                            <IconButton size="small" color="secondary">
                              <VisibilityIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tabValue === 4 && (
            <Box>
              {/* Job Opportunities Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Job Opportunities ({mockJobOpportunities.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<BusinessIcon />}
                  onClick={() => {
                    // Handle create new job
                    console.log('Create new job');
                  }}
                >
                  Create New Job
                </Button>
              </Box>

              {/* Job Opportunities Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Position</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Applications</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockJobOpportunities.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {job.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {job.salary}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Chip
                            label={job.type}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={job.applications}
                            size="small"
                            color="info"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={job.status}
                            size="small"
                            color={
                              job.status === 'active' ? 'success' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{job.deadline}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton size="small" color="secondary">
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
          )}

          {tabValue === 5 && (
            <Grid container spacing={3}>
              {/* Daily New Users Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Daily New Users (Last 14 Days)
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'end',
                        gap: 1,
                      }}
                    >
                      {mockChartData.dailyNewUsers.map((value, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 30,
                            height: `${(value / 25) * 100}%`,
                            bgcolor: 'success.main',
                            borderRadius: '4px 4px 0 0',
                            position: 'relative',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              position: 'absolute',
                              top: -25,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              color: 'text.secondary',
                              fontSize: '10px',
                            }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Daily Contact Requests Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Daily Contact Requests (Last 14 Days)
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'end',
                        gap: 1,
                      }}
                    >
                      {mockChartData.dailyContactRequests.map(
                        (value, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 30,
                              height: `${(value / 15) * 100}%`,
                              bgcolor: 'warning.main',
                              borderRadius: '4px 4px 0 0',
                              position: 'relative',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                position: 'absolute',
                                top: -25,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'text.secondary',
                                fontSize: '10px',
                              }}
                            >
                              {value}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Monthly User Growth Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Monthly User Growth (2024)
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'end',
                        gap: 1,
                      }}
                    >
                      {mockChartData.monthlyUserGrowth.map((value, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 35,
                            height: `${(value / 800) * 100}%`,
                            bgcolor: 'primary.main',
                            borderRadius: '4px 4px 0 0',
                            position: 'relative',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              position: 'absolute',
                              top: -25,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              color: 'text.secondary',
                              fontSize: '10px',
                            }}
                          >
                            {value}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              position: 'absolute',
                              bottom: -20,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              color: 'text.secondary',
                              fontSize: '8px',
                            }}
                          >
                            {mockChartData.timeLabels[index]}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Monthly Contact Growth Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Monthly Contact Requests (2024)
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'end',
                        gap: 1,
                      }}
                    >
                      {mockChartData.monthlyContactGrowth.map(
                        (value, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 35,
                              height: `${(value / 500) * 100}%`,
                              bgcolor: 'info.main',
                              borderRadius: '4px 4px 0 0',
                              position: 'relative',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                position: 'absolute',
                                top: -25,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'text.secondary',
                                fontSize: '10px',
                              }}
                            >
                              {value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                position: 'absolute',
                                bottom: -20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'text.secondary',
                                fontSize: '8px',
                              }}
                            >
                              {mockChartData.timeLabels[index]}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Country Distribution */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Users by Country
                    </Typography>
                    <Box>
                      {mockChartData.countries.map((country, index) => (
                        <Box key={country} sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2">{country}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {mockChartData.countryUsers[index]}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (mockChartData.countryUsers[index] / 320) * 100
                            }
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Stats */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Quick Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            bgcolor: 'success.light',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            color="success.dark"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {mockStats.newUsersToday}
                          </Typography>
                          <Typography variant="body2" color="success.dark">
                            New Users Today
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            bgcolor: 'warning.light',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            color="warning.dark"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {mockStats.contactRequestsToday}
                          </Typography>
                          <Typography variant="body2" color="warning.dark">
                            Contact Requests Today
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            bgcolor: 'info.light',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            color="info.dark"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {mockStats.newUsersThisWeek}
                          </Typography>
                          <Typography variant="body2" color="info.dark">
                            New Users This Week
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            bgcolor: 'error.light',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            color="error.dark"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {mockStats.contactRequestsThisWeek}
                          </Typography>
                          <Typography variant="body2" color="error.dark">
                            Contact Requests This Week
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {tabValue === 6 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  System Activities
                </Typography>
                <List>
                  {users.map((activity) => (
                    <React.Fragment key={activity.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'grey.100',
                              color: 'text.secondary',
                            }}
                          >
                            {getActivityIcon(activity.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.action}
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {activity.user} • {activity.time}
                              </Typography>
                              <Chip
                                label={activity.type}
                                size="small"
                                variant="outlined"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Platform Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {mockStats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      color="success.main"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {mockStats.totalEmails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Messages
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      color="info.main"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {mockStats.totalCompanies}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Companies
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      color="warning.main"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {mockStats.growthRate}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Growth
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Email Dialog */}
      <Dialog
        open={!!selectedEmail}
        onClose={handleCloseEmailDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            color: theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              {selectedEmail?.subject || selectedEmail?.name}
            </Typography>
            <IconButton onClick={handleCloseEmailDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={`https://i.pravatar.cc/150?img=${selectedEmail?.id || 1}`}
              alt={selectedEmail?.fromName || selectedEmail?.name}
            />
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'inherit' }}
              >
                {selectedEmail?.fromName || selectedEmail?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedEmail?.from || selectedEmail?.email}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, color: 'inherit' }}>
            {selectedEmail?.message}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Reply Section */}
          <Typography variant="h6" sx={{ mb: 2, color: 'inherit' }}>
            Reply
          </Typography>

          {/* To Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'inherit' }}>
              To:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {toEmails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  size="small"
                  onDelete={() => removeToEmail(email)}
                  deleteIcon={<RemoveCircleIcon />}
                  sx={{
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                    color:
                      theme.palette.mode === 'dark'
                        ? 'grey.100'
                        : 'text.primary',
                    '& .MuiChip-deleteIcon': {
                      color:
                        theme.palette.mode === 'dark'
                          ? 'grey.400'
                          : 'text.secondary',
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Add To email"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToEmail()}
                sx={{ flexGrow: 1 }}
              />
              <Button
                size="small"
                variant="outlined"
                onClick={addToEmail}
                startIcon={<PersonAddAltIcon />}
                sx={{
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                  color:
                    theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                  '&:hover': {
                    borderColor:
                      theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600',
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
                  },
                }}
              >
                Add To
              </Button>
            </Box>
          </Box>

          {/* CC Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'inherit' }}>
              CC:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {ccEmails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  size="small"
                  onDelete={() => removeCcEmail(email)}
                  deleteIcon={<RemoveCircleIcon />}
                  sx={{
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                    color:
                      theme.palette.mode === 'dark'
                        ? 'grey.100'
                        : 'text.primary',
                    '& .MuiChip-deleteIcon': {
                      color:
                        theme.palette.mode === 'dark'
                          ? 'grey.400'
                          : 'text.secondary',
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Add CC email"
                value={ccInput}
                onChange={(e) => setCcInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCcEmail()}
                sx={{ flexGrow: 1 }}
              />
              <Button
                size="small"
                variant="outlined"
                onClick={addCcEmail}
                startIcon={<PersonAddAltIcon />}
                sx={{
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                  color:
                    theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                  '&:hover': {
                    borderColor:
                      theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600',
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
                  },
                }}
              >
                Add CC
              </Button>
            </Box>
          </Box>

          {/* BCC Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'inherit' }}>
              BCC:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {bccEmails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  size="small"
                  onDelete={() => removeBccEmail(email)}
                  deleteIcon={<RemoveCircleIcon />}
                  sx={{
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                    color:
                      theme.palette.mode === 'dark'
                        ? 'grey.100'
                        : 'text.primary',
                    '& .MuiChip-deleteIcon': {
                      color:
                        theme.palette.mode === 'dark'
                          ? 'grey.400'
                          : 'text.secondary',
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Add BCC email"
                value={bccInput}
                onChange={(e) => setBccInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBccEmail()}
                sx={{ flexGrow: 1 }}
              />
              <Button
                size="small"
                variant="outlined"
                onClick={addBccEmail}
                startIcon={<PersonAddAltIcon />}
                sx={{
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                  color:
                    theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                  '&:hover': {
                    borderColor:
                      theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600',
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
                  },
                }}
              >
                Add BCC
              </Button>
            </Box>
          </Box>

          {/* Reply Message */}
          <TextField
            label="Your Reply"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply here..."
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
                },
                '&:hover fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.500' : 'grey.400',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color:
                  theme.palette.mode === 'dark' ? 'grey.400' : 'text.secondary',
              },
              '& .MuiInputBase-input': {
                color: 'inherit',
              },
            }}
          />

          {/* File Attachments */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'inherit' }}>
              Attachments:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {attachments.map((attachment) => (
                <Chip
                  key={attachment.id}
                  label={`${attachment.name} (${Math.round(attachment.size / 1024)}KB)`}
                  size="small"
                  onDelete={() => removeAttachment(attachment.id)}
                  deleteIcon={<RemoveCircleIcon />}
                  icon={<AttachFileIcon />}
                  sx={{
                    bgcolor:
                      theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                    color:
                      theme.palette.mode === 'dark'
                        ? 'grey.100'
                        : 'text.primary',
                    '& .MuiChip-deleteIcon': {
                      color:
                        theme.palette.mode === 'dark'
                          ? 'grey.400'
                          : 'text.secondary',
                    },
                  }}
                />
              ))}
            </Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              size="small"
              sx={{
                borderColor:
                  theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                color:
                  theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                '&:hover': {
                  borderColor:
                    theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600',
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
                },
              }}
            >
              Attach Files
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                sx={{ display: 'none' }}
                inputProps={{
                  accept:
                    '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.xls,.xlsx,.ppt,.pptx',
                }}
              />
            </Button>
            <Typography
              variant="caption"
              sx={{ display: 'block', mt: 1, color: 'text.secondary' }}
            >
              Supported formats: PDF, DOC, TXT, Images, Excel, PowerPoint
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200'}`,
          }}
        >
          <Button
            startIcon={<SendIcon />}
            variant="contained"
            onClick={() => handleReply(selectedEmail)}
            disabled={!replyText.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:disabled': {
                bgcolor:
                  theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
                color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
              },
            }}
          >
            Send Reply
          </Button>
          <Button
            startIcon={<CloseIcon />}
            onClick={handleCloseEmailDialog}
            variant="outlined"
            sx={{
              borderColor:
                theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
              color:
                theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
              '&:hover': {
                borderColor:
                  theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600',
                bgcolor:
                  theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
