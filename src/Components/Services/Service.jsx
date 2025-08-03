import React, { useState, useRef } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Avatar,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Code,
  Language,
  BugReport,
  PhoneAndroid,
  Web,
  Star,
  ArrowForward,
  CheckCircle
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#c1c1c1 #f1f1f1',
        },
      },
    },
  },
});

const services = [
  {
    id: 0,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android with cutting-edge technologies.',
    icon: <PhoneAndroid sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization'],
    color: '#2196f3',
    detailedDescription: 'We specialize in creating high-performance mobile applications that deliver exceptional user experiences. Our team of expert developers uses the latest technologies and best practices to build apps that stand out in the competitive app market.',
    detailedFeatures: [
      'Cross-platform development with React Native and Flutter',
      'Native iOS development with Swift and Objective-C',
      'Native Android development with Kotlin and Java',
      'App Store and Google Play Store optimization',
      'Push notification implementation',
      'Offline functionality and data synchronization',
      'Third-party API integration',
      'App performance optimization and testing'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS']
  },
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with the latest frameworks and technologies.',
    icon: <Web sx={{ fontSize: 40, color: '#4caf50' }} />,
    features: ['React.js', 'Node.js', 'Full-Stack', 'Progressive Web Apps'],
    color: '#4caf50',
    detailedDescription: 'Our web development services focus on creating scalable, secure, and user-friendly web applications. We build everything from simple landing pages to complex enterprise solutions that drive business growth.',
    detailedFeatures: [
      'Frontend development with React.js, Vue.js, and Angular',
      'Backend development with Node.js, Python, and PHP',
      'Database design and optimization (MySQL, PostgreSQL, MongoDB)',
      'RESTful API development and integration',
      'Progressive Web App (PWA) development',
      'E-commerce platform development',
      'Content Management System (CMS) development',
      'Website maintenance and support'
    ],
    technologies: ['React.js', 'Node.js', 'Vue.js', 'Angular', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'QA Testing',
    description: 'Comprehensive quality assurance and testing services to ensure flawless software delivery.',
    icon: <BugReport sx={{ fontSize: 40, color: '#ff9800' }} />,
    features: ['Automated Testing', 'Manual Testing', 'Performance Testing', 'Security Testing'],
    color: '#ff9800',
    detailedDescription: 'Quality assurance is crucial for successful software delivery. Our QA team ensures your applications are bug-free, performant, and secure through comprehensive testing methodologies.',
    detailedFeatures: [
      'Automated testing with Selenium, Cypress, and Jest',
      'Manual testing and exploratory testing',
      'Performance testing and load testing',
      'Security testing and vulnerability assessment',
      'Mobile app testing on various devices',
      'Cross-browser compatibility testing',
      'API testing and integration testing',
      'User acceptance testing (UAT)'
    ],
    technologies: ['Selenium', 'Cypress', 'Jest', 'JMeter', 'Postman', 'Appium']
  },
  {
    id: 3,
    title: 'Multi-Language',
    description: 'Internationalization and localization services for global market reach.',
    icon: <Language sx={{ fontSize: 40, color: '#9c27b0' }} />,
    features: ['i18n Implementation', 'Translation Services', 'Cultural Adaptation', 'RTL Support'],
    color: '#9c27b0',
    detailedDescription: 'Expand your global reach with our comprehensive internationalization and localization services. We help you adapt your applications for international markets with cultural sensitivity and technical precision.',
    detailedFeatures: [
      'Internationalization (i18n) implementation',
      'Professional translation services in 50+ languages',
      'Cultural adaptation and localization',
      'Right-to-left (RTL) language support',
      'Currency and date format localization',
      'Content management for multiple languages',
      'SEO optimization for international markets',
      'Cultural compliance and legal requirements'
    ],
    technologies: ['React-i18next', 'Vue-i18n', 'Angular i18n', 'Crowdin', 'Lokalise']
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'Vibe-coding-service delivered our mobile app ahead of schedule with exceptional quality. Highly recommended!',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'CTO, Digital Solutions',
    content: 'Their web development team is incredibly skilled. Our new platform has increased user engagement by 300%.',
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager, InnovateCorp',
    content: 'The QA testing services helped us identify critical issues before launch. Outstanding attention to detail.',
    avatar: 'ER'
  }
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Service() {
  const [selectedTab, setSelectedTab] = useState(0);
  const servicesRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              mb: 3
            }}>
              Professional Coding Services
            </Typography>
            <Typography variant="h5" component="h2" sx={{ 
              mb: 6, 
              opacity: 0.9, 
              fontSize: { xs: '1.25rem', md: '1.75rem' },
              lineHeight: 1.4
            }}>
              Transforming ideas into exceptional digital experiences
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={scrollToServices}
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                fontSize: '1.2rem',
                px: 6,
                py: 2,
                borderRadius: 3,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-3px)',
                  boxShadow: 6
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Services Section with Left Side Vertical Tabs */}
        <Box ref={servicesRef} sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                Our Services
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Comprehensive solutions for all your digital needs
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 3, md: 4 },
              height: { xs: 'auto', lg: '700px' },
              alignItems: 'stretch'
            }}>
              {/* Left Side Vertical Tabs */}
              <Box sx={{ 
                width: { xs: '100%', lg: '380px' },
                backgroundColor: 'background.paper',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: { xs: '400px', lg: 'none' }
              }}>
                <Box sx={{ 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  p: 3, 
                  textAlign: 'center',
                  borderBottom: '2px solid #34495e',
                  flexShrink: 0
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Choose Your Service
                  </Typography>
                </Box>
                <Tabs
                  orientation="vertical"
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    borderRight: '3px solid',
                    borderRightColor: 'divider',
                    flex: 1,
                    '& .MuiTab-root': {
                      minHeight: { xs: '80px', lg: '100px' },
                      maxHeight: { xs: '80px', lg: '100px' },
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      padding: { xs: '12px 16px', lg: '20px 24px' },
                      borderBottom: '2px solid',
                      borderBottomColor: 'divider',
                      backgroundColor: 'background.paper',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      },
                      '&.Mui-selected': {
                        backgroundColor: `${services[selectedTab].color}15`,
                        color: services[selectedTab].color,
                        fontWeight: 600,
                        borderLeft: `4px solid ${services[selectedTab].color}`
                      },
                      '&:not(:last-child)::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: '1px',
                        backgroundColor: 'divider',
                        opacity: 0.5
                      }
                    }
                  }}
                >
                  {services.map((service) => (
                    <Tab
                      key={service.id}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ 
                            mr: { xs: 2, lg: 3 },
                            p: { xs: 0.5, lg: 1 },
                            borderRadius: 2,
                            backgroundColor: selectedTab === service.id ? `${service.color}20` : 'action.hover'
                          }}>
                            {React.cloneElement(service.icon, { 
                              sx: { 
                                fontSize: { xs: 24, lg: 32 }, 
                                color: selectedTab === service.id ? service.color : 'text.secondary' 
                              } 
                            })}
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle1" sx={{ 
                              fontWeight: selectedTab === service.id ? 700 : 600, 
                              mb: { xs: 0.5, lg: 1 },
                              color: selectedTab === service.id ? service.color : 'text.primary',
                              fontSize: { xs: '0.9rem', lg: '1rem' }
                            }}>
                              {service.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              lineHeight: 1.3,
                              display: 'block',
                              fontSize: { xs: '0.75rem', lg: '0.85rem' }
                            }}>
                              {service.description.substring(0, { xs: 50, lg: 70 })}...
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>

              {/* Right Side Content Area */}
              <Box sx={{ 
                flex: 1,
                backgroundColor: 'background.paper',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: 'divider',
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column'
              }}>
              
              {/* Mobile Content Area */}
              <Box sx={{ 
                display: { xs: 'block', lg: 'none' },
                mt: 3
              }}>
                <Paper sx={{ 
                  p: { xs: 3, sm: 4 },
                  borderRadius: 3,
                  boxShadow: 2,
                  border: '2px solid',
                  borderColor: 'divider'
                }}>
                  {/* Service Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 3,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: `${services[selectedTab].color}15`,
                    borderBottom: `3px solid ${services[selectedTab].color}`
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      backgroundColor: 'background.paper',
                      mr: 3,
                      boxShadow: 1
                    }}>
                      {services[selectedTab].icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700, 
                        color: services[selectedTab].color,
                        mb: 1,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                      }}>
                        {services[selectedTab].title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        lineHeight: 1.5,
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}>
                        {services[selectedTab].description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Detailed Description */}
                  <Typography variant="body1" sx={{ 
                    mb: 4, 
                    lineHeight: 1.7, 
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    color: 'text.primary',
                    fontWeight: 500
                  }}>
                    {services[selectedTab].detailedDescription}
                  </Typography>

                  <Divider sx={{ my: 3, borderWidth: 2, borderColor: 'divider' }} />

                  {/* Key Features */}
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    color: services[selectedTab].color, 
                    fontWeight: 700,
                    borderBottom: `2px solid ${services[selectedTab].color}20`,
                    pb: 1,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}>
                    Key Features
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    {services[selectedTab].detailedFeatures.map((feature, index) => (
                      <Box key={index} sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        backgroundColor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <CheckCircle sx={{ 
                          color: services[selectedTab].color, 
                          fontSize: 24, 
                          mr: 2, 
                          mt: 0.5,
                          flexShrink: 0
                        }} />
                        <Typography variant="body2" sx={{ 
                          lineHeight: 1.6,
                          fontWeight: 500,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 3, borderWidth: 2, borderColor: 'divider' }} />

                  {/* Technologies */}
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    color: services[selectedTab].color, 
                    fontWeight: 700,
                    borderBottom: `2px solid ${services[selectedTab].color}20`,
                    pb: 1,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}>
                    Technologies We Use
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1, 
                    mb: 4,
                    p: 2,
                    backgroundColor: 'background.default',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    {services[selectedTab].technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: `${services[selectedTab].color}20`,
                          color: services[selectedTab].color,
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          py: 1,
                          px: 1,
                          border: `1px solid ${services[selectedTab].color}30`
                        }}
                      />
                    ))}
                  </Box>

                  {/* Call to Action */}
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 3,
                    backgroundColor: `${services[selectedTab].color}10`,
                    borderRadius: 3,
                    border: `2px solid ${services[selectedTab].color}30`
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      color: services[selectedTab].color, 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}>
                      Ready to get started with {services[selectedTab].title}?
                    </Typography>
                    <Button
                      variant="contained"
                      size="medium"
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: services[selectedTab].color,
                        px: 3,
                        py: 1.5,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 2,
                        '&:hover': {
                          backgroundColor: services[selectedTab].color,
                          opacity: 0.9,
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      Get Quote
                    </Button>
                  </Box>
                </Paper>
              </Box>
                <Box sx={{ 
                  backgroundColor: `${services[selectedTab].color}20`, 
                  p: 4,
                  borderBottom: `3px solid ${services[selectedTab].color}`,
                  flexShrink: 0
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 3, 
                      backgroundColor: 'white',
                      mr: 4,
                      boxShadow: 2
                    }}>
                      {services[selectedTab].icon}
                    </Box>
                    <Box>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 700, 
                        color: services[selectedTab].color,
                        mb: 2
                      }}>
                        {services[selectedTab].title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ 
                        lineHeight: 1.6,
                        fontSize: '1.2rem'
                      }}>
                        {services[selectedTab].description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: { xs: 3, md: 5 }, 
                  flex: 1, 
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '10px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'background.default',
                    borderRadius: '5px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'divider',
                    borderRadius: '5px',
                    '&:hover': {
                      background: 'text.secondary'
                    }
                  }
                }}>
                  {/* Detailed Description */}
                  <Typography variant="h6" sx={{ 
                    mb: 4, 
                    lineHeight: 1.8, 
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    color: 'text.primary',
                    fontWeight: 500
                  }}>
                    {services[selectedTab].detailedDescription}
                  </Typography>

                  <Divider sx={{ my: 4, borderWidth: 2, borderColor: 'divider' }} />

                  {/* Key Features */}
                  <Typography variant="h4" sx={{ 
                    mb: 4, 
                    color: services[selectedTab].color, 
                    fontWeight: 700,
                    borderBottom: `3px solid ${services[selectedTab].color}20`,
                    pb: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    Key Features
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: 6 }}>
                    {services[selectedTab].detailedFeatures.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          p: { xs: 2, md: 3 },
                          borderRadius: 3,
                          backgroundColor: 'background.default',
                          border: '2px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            transform: 'translateY(-2px)',
                            boxShadow: 2
                          }
                        }}>
                          <CheckCircle sx={{ 
                            color: services[selectedTab].color, 
                            fontSize: 32, 
                            mr: 3, 
                            mt: 0.5 
                          }} />
                          <Typography variant="body1" sx={{ 
                            lineHeight: 1.7,
                            fontWeight: 500,
                            fontSize: '1.1rem'
                          }}>
                            {feature}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 6, borderWidth: 3, borderColor: 'divider' }} />

                  {/* Technologies */}
                  <Typography variant="h4" sx={{ 
                    mb: 4, 
                    color: services[selectedTab].color, 
                    fontWeight: 700,
                    borderBottom: `3px solid ${services[selectedTab].color}20`,
                    pb: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    Technologies We Use
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: { xs: 1, md: 2 }, 
                    mb: 6,
                    p: { xs: 2, md: 3 },
                    backgroundColor: 'background.default',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'divider'
                  }}>
                    {services[selectedTab].technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        sx={{
                          backgroundColor: `${services[selectedTab].color}20`,
                          color: services[selectedTab].color,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          py: 2,
                          px: 2,
                          border: `2px solid ${services[selectedTab].color}30`,
                          '&:hover': {
                            backgroundColor: `${services[selectedTab].color}30`,
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    ))}
                  </Box>

                  {/* Call to Action */}
                  <Box sx={{ 
                    textAlign: 'center',
                    p: { xs: 3, md: 4 },
                    backgroundColor: `${services[selectedTab].color}10`,
                    borderRadius: 4,
                    border: `3px solid ${services[selectedTab].color}30`
                  }}>
                    <Typography variant="h5" sx={{ 
                      mb: 3, 
                      color: services[selectedTab].color, 
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}>
                      Ready to get started with {services[selectedTab].title}?
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: services[selectedTab].color,
                        px: { xs: 4, md: 6 },
                        py: { xs: 2, md: 3 },
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        fontWeight: 700,
                        borderRadius: 4,
                        boxShadow: 4,
                        '&:hover': {
                          backgroundColor: services[selectedTab].color,
                          opacity: 0.9,
                          transform: 'translateY(-3px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      Get Quote for {services[selectedTab].title}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                What Our Clients Say
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Trusted by leading companies worldwide
              </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                  <Paper
                    sx={{
                      p: 3,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, backgroundColor: '#2196f3' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default Service;
