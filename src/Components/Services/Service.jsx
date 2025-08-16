import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  CssBaseline,
  Tabs,
  Tab,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Code,
  Language,
  BugReport,
  PhoneAndroid,
  Web,
  Star,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';

const services = [
  {
    id: 0,
    title: 'App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android with cutting-edge technologies.',
    icon: <PhoneAndroid sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: [
      'React Native',
      'Flutter',
      'Native iOS/Android',
      'App Store Optimization',
    ],
    color: '#2196f3',
    detailedDescription:
      'We specialize in creating high-performance mobile applications that deliver exceptional user experiences. Our team of expert developers uses the latest technologies and best practices to build apps that stand out in the competitive app market.',
    detailedFeatures: [
      'Cross-platform development with React Native and Flutter',
      'Native iOS development with Swift and Objective-C',
      'Native Android development with Kotlin and Java',
      'App Store and Google Play Store optimization',
      'Push notification implementation',
      'Offline functionality and data synchronization',
      'Third-party API integration',
      'App performance optimization and testing',
    ],
    technologies: [
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin',
      'Firebase',
      'AWS',
    ],
  },
  {
    id: 1,
    title: 'Web Development',
    description:
      'Modern, responsive web applications built with the latest frameworks and technologies.',
    icon: <Web sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: ['React.js', 'Node.js', 'Full-Stack', 'Progressive Web Apps'],
    color: '#2196f3',
    detailedDescription:
      'Our web development services focus on creating scalable, secure, and user-friendly web applications. We build everything from simple landing pages to complex enterprise solutions that drive business growth.',
    detailedFeatures: [
      'Frontend development with React.js, Vue.js, and Angular',
      'Backend development with Node.js, Python, and PHP',
      'Database design and optimization (MySQL, PostgreSQL, MongoDB)',
      'RESTful API development and integration',
      'Progressive Web App (PWA) development',
      'E-commerce platform development',
      'Content Management System (CMS) development',
      'Website maintenance and support',
    ],
    technologies: [
      'React.js',
      'Node.js',
      'Vue.js',
      'Angular',
      'MongoDB',
      'PostgreSQL',
    ],
  },
  {
    id: 2,
    title: 'QA Testing',
    description:
      'Comprehensive quality assurance and testing services to ensure flawless software delivery.',
    icon: <BugReport sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: [
      'Automated Testing',
      'Manual Testing',
      'Performance Testing',
      'Security Testing',
    ],
    color: '#2196f3',
    detailedDescription:
      'Quality assurance is crucial for successful software delivery. Our QA team ensures your applications are bug-free, performant, and secure through comprehensive testing methodologies.',
    detailedFeatures: [
      'Automated testing with Selenium, Cypress, and Jest',
      'Manual testing and exploratory testing',
      'Performance testing and load testing',
      'Security testing and vulnerability assessment',
      'Mobile app testing on various devices',
      'Cross-browser compatibility testing',
      'API testing and integration testing',
      'User acceptance testing (UAT)',
    ],
    technologies: [
      'Selenium',
      'Cypress',
      'Jest',
      'JMeter',
      'Postman',
      'Appium',
    ],
  },
  {
    id: 3,
    title: 'Multi-Language',
    description:
      'Internationalization and localization services for global market reach.',
    icon: <Language sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: [
      'i18n Implementation',
      'Translation Services',
      'Cultural Adaptation',
      'RTL Support',
    ],
    color: '#2196f3',
    detailedDescription:
      'Expand your global reach with our comprehensive internationalization and localization services. We help you adapt your applications for international markets with cultural sensitivity and technical precision.',
    detailedFeatures: [
      'Internationalization (i18n) implementation',
      'Professional translation services in 50+ languages',
      'Cultural adaptation and localization',
      'Right-to-left (RTL) language support',
      'Currency and date format localization',
      'Content management for multiple languages',
      'SEO optimization for international markets',
      'Cultural compliance and legal requirements',
    ],
    technologies: [
      'React-i18next',
      'Vue-i18n',
      'Angular i18n',
      'Crowdin',
      'Lokalise',
    ],
  },
  {
    id: 4,
    title: 'AI & Data Solutions',
    description:
      'End-to-end human-in-the-loop services to power AI/ML workflows.',
    icon: <Language sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: [
      'i18n Implementation',
      'Translation Services',
      'Cultural Adaptation',
      'RTL Support',
    ],
    color: '#2196f3',
    detailedDescription:
      'We provide end-to-end human-in-the-loop AI services that help organizations build smarter and more reliable systems. Our solutions ensure data accuracy, scalability, and cultural relevance across industries.',
    detailedFeatures: [
      'Data collection (Text, Audio, Video, Image)',
      'Annotation (NER, bounding box, sentiment, speech, medical)',
      'Transcription (verbatim, clean, timestamped)',
      'Synthetic data generation',
      'Data collection (Text, Audio, Video, Image)',
      'Annotation (NER, bounding box, sentiment, speech, medical)',
      'Transcription (verbatim, clean, timestamped)',
    ],
    technologies: [
      'Whisper',
      'Label Studio',
      'OpenAI Eval',
      'Python',
      'Scrapy',
      'TruthfulQA / MMLU',
      'Dynabench'
    ],
  },
   {
    id: 5,
    title: 'LLM & Model Services',
    description:
      'Optimizing and evaluating Large Language Models.',
    icon: <Language sx={{ fontSize: 40, color: '#2196f3' }} />,
    features: [
      'i18n Implementation',
      'Translation Services',
      'Cultural Adaptation',
      'RTL Support',
    ],
    color: '#2196f3',
    detailedDescription:
      'We provide end-to-end human-in-the-loop AI services that help organizations build smarter and more reliable systems. Our solutions ensure data accuracy, scalability, and cultural relevance across industries.',
    detailedFeatures: [
      'Prompt engineering & fine-tuning',
      'Custom dataset creation',
      'Hallucination & truthfulness checks',
      'Bias & fairness evaluation',
      'Automated evaluation pipelines',
      'Benchmark scoring (MMLU, TruthfulQA)',
      'Enterprise LLM deployment support',
      'Continuous improvement feedback loop'
    ],
    technologies: [
      'Whisper',
      'Label Studio',
      'OpenAI Eval',
      'Python',
      'Scrapy',
      'TruthfulQA / MMLU',
      'Dynabench'
    ],
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content:
      'Vibe-coding-service delivered our mobile app ahead of schedule with exceptional quality. Highly recommended!',
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, Digital Solutions',
    content:
      'Their web development team is incredibly skilled. Our new platform has increased user engagement by 300%.',
    avatar: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager, InnovateCorp',
    content:
      'The QA testing services helped us identify critical issues before launch. Outstanding attention to detail.',
    avatar: 'ER',
  },
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Service() {
  const [selectedTab, setSelectedTab] = useState(0);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode);
  const mode = useSelector((state) => state.DarkLightMode.mode);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Dynamic colors based on theme
  const getThemeColors = () => ({
    primary: theme.palette.primary.main,
    background: theme.palette.background.default,
    paper: theme.palette.background.paper,
    text: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.divider,
    action: theme.palette.action,
    mode: mode,
  });

  const colors = getThemeColors();

  return (
    <Box sx={{ flexGrow: 1 }} mt={6}>
      <Box
        sx={{
          background: isLightMode
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          color: 'white',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3.8rem' },
              fontWeight: 600,
              mb: 3,
              textAlign: 'center',
            }}
          >
            Empowering Innovation with Human-Centered Technology Solutions
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 6,
              opacity: 0.9,
              fontSize: { xs: '1.25rem', md: '1.75rem' },
              lineHeight: 1.4,
            }}
          >
            Innovative Services to Power AI, Technology, and Business
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={scrollToServices}
              sx={{
                backgroundColor: 'white',
                color: isLightMode ? '#667eea' : '#2c3e50',
                fontSize: '1.2rem',
                px: 3,
                py: 1,
                borderRadius: 3,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: isLightMode ? '#f5f5f5' : '#e8e8e8',
                  transform: 'translateY(-3px)',
                  boxShadow: 6,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Section with Left Side Vertical Tabs */}
      <Box
        ref={servicesRef}
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: isLightMode ? '#f8f9fa' : '#1a1a1a',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                color: colors.text,
              }}
            >
              Our Services
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: colors.textSecondary,
              }}
            >
              Comprehensive solutions for all your digital needs
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 3, md: 4 },
              height: { xs: 'auto', lg: '700px' },
              alignItems: 'stretch',
            }}
          >
            {/* Left Side Vertical Tabs */}
            <Box
              sx={{
                width: { xs: '100%', lg: '380px' },
                backgroundColor: colors.paper,
                borderRadius: 3,
                boxShadow: isLightMode ? 3 : 6,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: colors.divider,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: { xs: '400px', lg: 'none' },
              }}
            >
              <Box
                sx={{
                  backgroundColor: isLightMode ? '#2c3e50' : '#1a1a1a',
                  color: 'white',
                  p: 3,
                  textAlign: 'center',
                  borderBottom: `2px solid ${isLightMode ? '#34495e' : '#333'}`,
                  flexShrink: 0,
                }}
              >
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
                  borderRightColor: colors.divider,
                  flex: 1,
                  '& .MuiTab-root': {
                    minHeight: { xs: '80px', lg: '100px' },
                    maxHeight: { xs: '80px', lg: '100px' },
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    padding: { xs: '12px 16px', lg: '20px 24px' },
                    borderBottom: '2px solid',
                    borderBottomColor: colors.divider,
                    backgroundColor: colors.paper,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    color: colors.text,
                    '&:hover': {
                      backgroundColor:
                        colors.action?.hover ||
                        (isLightMode ? '#f5f5f5' : '#2a2a2a'),
                    },
                    '&.Mui-selected': {
                      backgroundColor: `${services[selectedTab].color}15`,
                      color: services[selectedTab].color,
                      fontWeight: 600,
                      borderLeft: `4px solid ${services[selectedTab].color}`,
                    },
                    '&:not(:last-child)::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      right: '10%',
                      height: '1px',
                      backgroundColor: colors.divider,
                      opacity: 0.5,
                    },
                  },
                }}
              >
                {services.map((service) => (
                  <Tab
                    key={service.id}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Box
                          sx={{
                            mr: { xs: 2, lg: 3 },
                            p: { xs: 0.5, lg: 1 },
                            borderRadius: 2,
                            backgroundColor:
                              selectedTab === service.id
                                ? `${service.color}20`
                                : isLightMode
                                  ? '#f5f5f5'
                                  : '#2a2a2a',
                          }}
                        >
                          {React.cloneElement(service.icon, {
                            sx: {
                              fontSize: { xs: 24, lg: 32 },
                              color:
                                selectedTab === service.id
                                  ? service.color
                                  : colors.textSecondary,
                            },
                          })}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight:
                                selectedTab === service.id ? 700 : 600,
                              mb: { xs: 0.5, lg: 1 },
                              color:
                                selectedTab === service.id
                                  ? service.color
                                  : colors.text,
                              fontSize: { xs: '0.9rem', lg: '1rem' },
                            }}
                          >
                            {service.title}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* Right Side Content Area */}
            <Box
              sx={{
                flex: 1,
                backgroundColor: colors.paper,
                borderRadius: 3,
                boxShadow: isLightMode ? 3 : 6,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: colors.divider,
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
              }}
            >
              {/* Mobile Content Area */}
              <Box
                sx={{
                  display: { xs: 'block', lg: 'none' },
                  mt: 3,
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    boxShadow: isLightMode ? 2 : 4,
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.paper,
                  }}
                >
                  {/* Service Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: `${services[selectedTab].color}15`,
                      borderBottom: `3px solid ${services[selectedTab].color}`,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: colors.paper,
                        mr: 3,
                        boxShadow: 1,
                      }}
                    >
                      {services[selectedTab].icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: services[selectedTab].color,
                          mb: 1,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}
                      >
                        {services[selectedTab].title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          color: colors.textSecondary,
                        }}
                      >
                        {services[selectedTab].description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Detailed Description */}
                  <Typography
                    sx={{
                      mb: 4,
                      lineHeight: 1.7,
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      color: colors.text,
                      fontWeight: 100,
                    }}
                  >
                    {services[selectedTab].detailedDescription}
                  </Typography>

                  <Divider
                    sx={{ my: 3, borderWidth: 2, borderColor: colors.divider }}
                  />

                  {/* Key Features */}
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: services[selectedTab].color,
                      fontWeight: 700,
                      borderBottom: `2px solid ${services[selectedTab].color}20`,
                      pb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      textAlign: 'center',
                    }}
                  >
                    ✨ Key Features
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    {services[selectedTab].detailedFeatures.map(
                      (feature, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            backgroundColor: colors.paper,
                            border: `2px solid ${services[selectedTab].color}20`,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '2px',
                              backgroundColor: services[selectedTab].color,
                              transform: 'scaleX(0)',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              backgroundColor: `${services[selectedTab].color}08`,
                              transform: 'translateY(-1px)',
                              boxShadow: `0 2px 8px ${services[selectedTab].color}30`,
                              borderColor: services[selectedTab].color,
                              '&::before': {
                                transform: 'scaleX(1)',
                              },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              p: 0.5,
                              borderRadius: '50%',
                              backgroundColor: `${services[selectedTab].color}15`,
                              mr: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: 28,
                              height: 28,
                              flexShrink: 0,
                            }}
                          >
                            <CheckCircle
                              sx={{
                                color: services[selectedTab].color,
                                fontSize: 16,
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              lineHeight: 1.4,
                              fontWeight: 500,
                              fontSize: { xs: '0.85rem', sm: '0.9rem' },
                              color: colors.text,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>

                  <Divider
                    sx={{ my: 3, borderWidth: 2, borderColor: colors.divider }}
                  />

                  {/* Technologies */}
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: services[selectedTab].color,
                      fontWeight: 700,
                      borderBottom: `2px solid ${services[selectedTab].color}20`,
                      pb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Technologies We Use
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 4,
                      p: 2,
                      backgroundColor: colors.background,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: colors.divider,
                    }}
                  >
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
                          border: `1px solid ${services[selectedTab].color}30`,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Call to Action */}
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      backgroundColor: `${services[selectedTab].color}10`,
                      borderRadius: 3,
                      border: `2px solid ${services[selectedTab].color}30`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        color: services[selectedTab].color,
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                      }}
                    >
                      Ready to get started with {services[selectedTab].title}?
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: services[selectedTab].color,
                        px: 2,
                        py: 1,
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 1,
                        '&:hover': {
                          backgroundColor: services[selectedTab].color,
                          opacity: 0.9,
                          transform: 'translateY(-1px)',
                          boxShadow: 2,
                        },
                      }}
                    >
                      Get Quote
                    </Button>
                  </Box>
                </Paper>
              </Box>
              <Box
                sx={{
                  backgroundColor: `${services[selectedTab].color}20`,
                  p: 4,
                  borderBottom: `3px solid ${services[selectedTab].color}`,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: colors.paper,
                      mr: 4,
                      boxShadow: 2,
                    }}
                  >
                    {services[selectedTab].icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: services[selectedTab].color,
                        mb: 0.4,
                      }}
                    >
                      {services[selectedTab].title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        lineHeight: 1.6,
                        fontSize: '1.0rem',
                        color: colors.textSecondary,
                      }}
                    >
                      {services[selectedTab].description}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  flex: 1,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: colors.background,
                    borderRadius: '5px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: colors.divider,
                    borderRadius: '5px',
                    '&:hover': {
                      background: colors.textSecondary,
                    },
                  },
                }}
              >
                {/* Detailed Description */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: { xs: '0.8rem', md: '1rem' },
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  {services[selectedTab].detailedDescription}
                </Typography>

                <Divider
                  sx={{ my: 4, borderWidth: 2, borderColor: colors.divider }}
                />

                {/* Key Features */}
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: services[selectedTab].color,
                    fontWeight: 700,
                    borderBottom: `3px solid ${services[selectedTab].color}20`,
                    pb: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    textAlign: 'center',
                  }}
                >
                  ✨ Key Features
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 6 }}>
                  {services[selectedTab].detailedFeatures.map(
                    (feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            p: { xs: 1, md: 1 },
                            borderRadius: 3,
                            backgroundColor: colors.paper,
                            border: `2px solid ${services[selectedTab].color}20`,
                            transition: 'all 0.4s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: 'auto',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '3px',
                              backgroundColor: services[selectedTab].color,
                              transform: 'scaleX(0)',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              backgroundColor: `${services[selectedTab].color}08`,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 4px 15px ${services[selectedTab].color}30`,
                              borderColor: services[selectedTab].color,
                              '&::before': {
                                transform: 'scaleX(1)',
                              },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: '50%',
                              backgroundColor: `${services[selectedTab].color}15`,
                              mr: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: 36,
                              height: 30,
                              flexShrink: 0,
                            }}
                          >
                            <CheckCircle
                              sx={{
                                color: services[selectedTab].color,
                                fontSize: 20,
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                lineHeight: 1.5,
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                color: colors.text,
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )
                  )}
                </Grid>

                <Divider
                  sx={{ my: 6, borderWidth: 3, borderColor: colors.divider }}
                />

                {/* Technologies */}
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: services[selectedTab].color,
                    fontWeight: 700,
                    borderBottom: `3px solid ${services[selectedTab].color}20`,
                    pb: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Technologies We Use
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: 1, md: 2 },
                    mb: 6,
                    p: { xs: 2, md: 3 },
                    backgroundColor: colors.background,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: colors.divider,
                  }}
                >
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
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Call to Action */}
          <Box
            sx={{
              textAlign: 'center',
              mt: 5,
              p: { xs: 3, md: 4 },
              backgroundColor: `${services[selectedTab].color}10`,
              borderRadius: 4,
              border: `3px solid ${services[selectedTab].color}30`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: services[selectedTab].color,
                fontWeight: 700,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Ready to get started with {services[selectedTab].title}?
            </Typography>
            <Button
              variant="contained"
              size="medium"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: services[selectedTab].color,
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: services[selectedTab].color,
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              Get Quote for {services[selectedTab].title}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: colors.background,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                background: isLightMode
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #3498db 0%, #9b59b6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              💬 What Our Clients Say
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                mt: 2,
                color: colors.textSecondary,
              }}
            >
              Trusted by leading companies worldwide
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: 4,
                    boxShadow: isLightMode
                      ? '0 4px 20px rgba(0,0,0,0.1)'
                      : '0 4px 20px rgba(0,0,0,0.3)',
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.paper,
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: isLightMode
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #3498db 0%, #9b59b6 100%)',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isLightMode
                        ? '0 12px 40px rgba(0,0,0,0.15)'
                        : '0 12px 40px rgba(0,0,0,0.4)',
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      mb: 3,
                      justifyContent: 'center',
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: '#ffc107',
                          fontSize: { xs: 18, md: 22 },
                          mx: 0.5,
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      flexGrow: 1,
                      lineHeight: 1.7,
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      fontStyle: 'italic',
                      textAlign: 'center',
                      color: colors.text,
                      position: 'relative',
                      '&::before': {
                        fontSize: '3rem',
                        color: isLightMode ? '#667eea' : '#3498db',
                        position: 'absolute',
                        top: -10,
                        left: -5,
                        opacity: 0.3,
                      },
                      '&::after': {
                        fontSize: '3rem',
                        color: isLightMode ? '#667eea' : '#3498db',
                        position: 'absolute',
                        bottom: -20,
                        right: -5,
                        opacity: 0.3,
                      },
                    }}
                  >
                    {testimonial.content}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: colors.divider,
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 3,
                        backgroundColor: isLightMode ? '#667eea' : '#3498db',
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          color: colors.text,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                        }}
                      >
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
  );
}

export default Service;
