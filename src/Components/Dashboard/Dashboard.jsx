import React, { useState } from 'react';
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
  Badge,
  Tabs,
  Tab,
  LinearProgress,
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
} from '@mui/icons-material';


// Enhanced mock data for demonstration
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
};

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
    message: 'I would like to discuss a potential partnership for our upcoming project. We are looking for innovative technology solutions.',
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
    message: 'We are interested in your services and would like to schedule a consultation call to discuss our requirements.',
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
    message: 'Looking for collaboration opportunities in the Asian market. Would appreciate if you could share more details.',
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
    message: 'We are a new startup and would love to learn more about your platform and how it can help us grow.',
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
  monthlyUserGrowth: [423, 456, 489, 512, 534, 567, 589, 612, 634, 667, 689, 712],
  monthlyContactGrowth: [234, 256, 278, 301, 323, 345, 367, 389, 412, 434, 456, 478],
  timeLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const Dashboard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

  const filteredUsers = mockRecentUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: '50%',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your platform today.
        </Typography>
      </Box>

      {/* Enhanced Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers.toLocaleString()}
            icon={<PeopleIcon sx={{ color: 'primary.main' }} />}
            color="primary"
            subtitle={`+${mockStats.growthRate}% from last month`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Users Today"
            value={mockStats.newUsersToday}
            icon={<PeopleIcon sx={{ color: 'success.main' }} />}
            color="success"
            subtitle={`${mockStats.newUsersThisWeek} this week`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Contact Requests"
            value={mockStats.contactRequestsToday}
            icon={<EmailIcon sx={{ color: 'warning.main' }} />}
            color="warning"
            subtitle={`${mockStats.contactRequestsThisWeek} this week`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Jobs"
            value={mockStats.activeJobs}
            icon={<BusinessIcon sx={{ color: 'info.main' }} />}
            color="info"
            subtitle={`${mockStats.jobOpportunities} total opportunities`}
          />
        </Grid>
      </Grid>

      {/* Additional Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'success.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStats.newUsersThisMonth}
              </Typography>
              <Typography variant="body2" color="success.dark">
                New Users This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'warning.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStats.contactRequestsThisMonth}
              </Typography>
              <Typography variant="body2" color="warning.dark">
                Contact Requests This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'info.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStats.completedJobs}
              </Typography>
              <Typography variant="body2" color="info.dark">
                Completed Jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'error.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStats.growthRate}%
              </Typography>
              <Typography variant="body2" color="error.dark">
                Monthly Growth Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Overview" icon={<DashboardIcon />} />
          <Tab label="Users" icon={<PeopleIcon />} />
          <Tab label="Contact Requests" icon={<EmailIcon />} />
          <Tab label="Job Opportunities" icon={<BusinessIcon />} />
          <Tab label="Analytics" icon={<AssessmentIcon />} />
          <Tab label="Activities" icon={<NotificationsIcon />} />
        </Tabs>

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
                                <Typography variant="body2" color="text.secondary">
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
                            <Avatar sx={{ bgcolor: 'grey.100', color: 'text.secondary' }}>
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
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
                 <Button variant="contained" startIcon={<PersonAddIcon />}>
                   Add User
                 </Button>
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
                             <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                             <Box>
                               <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                 {user.name}
                               </Typography>
                               <Typography variant="caption" color="text.secondary">
                                 {user.email}
                               </Typography>
                             </Box>
                           </Box>
                         </TableCell>
                         <TableCell>
                           <Chip
                             label={user.role}
                             size="small"
                             color={user.role === 'admin' ? 'error' : user.role === 'moderator' ? 'warning' : 'default'}
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
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                   Contact Requests ({mockContactRequests.length})
                 </Typography>
                 <Box sx={{ display: 'flex', gap: 2 }}>
                   <Chip label={`${mockContactRequests.filter(c => c.status === 'unread').length} Unread`} color="warning" />
                   <Chip label={`${mockContactRequests.filter(c => c.priority === 'high').length} High Priority`} color="error" />
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
                             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                               {contact.name}
                             </Typography>
                             <Typography variant="caption" color="text.secondary">
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
                             color={contact.priority === 'high' ? 'error' : contact.priority === 'medium' ? 'warning' : 'success'}
                           />
                         </TableCell>
                         <TableCell>
                           <Chip
                             label={contact.status}
                             size="small"
                             color={contact.status === 'unread' ? 'warning' : 'success'}
                           />
                         </TableCell>
                         <TableCell>{contact.time}</TableCell>
                         <TableCell>
                           <Box sx={{ display: 'flex', gap: 1 }}>
                             <Button
                               size="small"
                               variant="outlined"
                               startIcon={<EmailIcon />}
                               onClick={() => {
                                 // Handle contact reply
                                 console.log('Reply to:', contact.email);
                               }}
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
               {/* Job Opportunities Header */}
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
                             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                               {job.title}
                             </Typography>
                             <Typography variant="caption" color="text.secondary">
                               {job.salary}
                             </Typography>
                           </Box>
                         </TableCell>
                         <TableCell>{job.company}</TableCell>
                         <TableCell>{job.location}</TableCell>
                         <TableCell>
                           <Chip label={job.type} size="small" variant="outlined" />
                         </TableCell>
                         <TableCell>
                           <Chip label={job.applications} size="small" color="info" />
                         </TableCell>
                         <TableCell>
                           <Chip
                             label={job.status}
                             size="small"
                             color={job.status === 'active' ? 'success' : 'default'}
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

                     {tabValue === 4 && (
             <Grid container spacing={3}>
               {/* Daily New Users Chart */}
               <Grid item xs={12} md={6}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                       Daily New Users (Last 14 Days)
                     </Typography>
                     <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
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
                     <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
                       {mockChartData.dailyContactRequests.map((value, index) => (
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
                       ))}
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
                     <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
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
                     <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1 }}>
                       {mockChartData.monthlyContactGrowth.map((value, index) => (
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
                       ))}
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
                           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                             <Typography variant="body2">{country}</Typography>
                             <Typography variant="body2" color="text.secondary">
                               {mockChartData.countryUsers[index]}
                             </Typography>
                           </Box>
                           <LinearProgress
                             variant="determinate"
                             value={(mockChartData.countryUsers[index] / 320) * 100}
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
                         <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                           <Typography variant="h4" color="success.dark" sx={{ fontWeight: 'bold' }}>
                             {mockStats.newUsersToday}
                           </Typography>
                           <Typography variant="body2" color="success.dark">
                             New Users Today
                           </Typography>
                         </Box>
                       </Grid>
                       <Grid item xs={6}>
                         <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                           <Typography variant="h4" color="warning.dark" sx={{ fontWeight: 'bold' }}>
                             {mockStats.contactRequestsToday}
                           </Typography>
                           <Typography variant="body2" color="warning.dark">
                             Contact Requests Today
                           </Typography>
                         </Box>
                       </Grid>
                       <Grid item xs={6}>
                         <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                           <Typography variant="h4" color="info.dark" sx={{ fontWeight: 'bold' }}>
                             {mockStats.newUsersThisWeek}
                           </Typography>
                           <Typography variant="body2" color="info.dark">
                             New Users This Week
                           </Typography>
                         </Box>
                       </Grid>
                       <Grid item xs={6}>
                         <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                           <Typography variant="h4" color="error.dark" sx={{ fontWeight: 'bold' }}>
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

                     {tabValue === 5 && (
             <Card>
               <CardContent>
                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                   System Activities
                 </Typography>
                 <List>
                   {mockRecentActivities.map((activity) => (
                     <React.Fragment key={activity.id}>
                       <ListItem>
                         <ListItemAvatar>
                           <Avatar sx={{ bgcolor: 'grey.100', color: 'text.secondary' }}>
                             {getActivityIcon(activity.type)}
                           </Avatar>
                         </ListItemAvatar>
                         <ListItemText
                           primary={activity.action}
                           secondary={
                             <Box>
                               <Typography variant="body2" color="text.secondary">
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
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Add New User
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Send Newsletter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  System Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Platform Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                      {mockStats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {mockStats.totalEmails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Messages
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                      {mockStats.totalCompanies}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Companies
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
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
    </Box>
  );
};

export default Dashboard;
