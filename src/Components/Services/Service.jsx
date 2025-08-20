import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
  Chip,
  Avatar,
  Paper,
  Tabs,
  Tab,
  Divider,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from '@mui/material';
import {
  Language,
  BugReport,
  PhoneAndroid,
  Web,
  Star,
  ArrowForward,
  CheckCircle,
  Business,
  MedicalServices,
  Translate,
  ExpandMore,
} from '@mui/icons-material';
import { services, testimonials } from './ServicesData.jsx';


function Service() {
  const [selectedTab, setSelectedTab] = useState(0);
  const servicesRef = useRef(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
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

  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    document.title = 'Services | Pradetra';
    if (desc) desc.setAttribute('content', "Explore Pradetra's services: AI & data solutions (RLHF, annotation, transcription), QA testing, app and web development, multilingual services, and enterprise BPO.");
    if (canonical) canonical.setAttribute('href', 'https://pradetra.com/service');
    return () => { document.title = prevTitle; };
  }, []);

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
              height: { xs: 'auto', lg: '900px' },
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
              { isDesktop && <Tabs
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
                          height: '100vh'
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
              </Tabs>}
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
                flexDirection: 'column'
              }}
            >
              {/* Desktop Content Area */}
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

          {/* Mobile Content Area - Moved outside the hidden container */}
          <Box
            sx={{
              display: { xs: 'block', lg: 'none' },
              mt: 3,
            }}
          >
            {/* Mobile Accordion - Each service as a separate accordion item */}
            <Box sx={{ mt: 2 }}>
              {services.map((service) => (
                <Accordion
                  key={service.id}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: isLightMode ? 2 : 4,
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.paper,
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: '16px 0',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: service.color, fontSize: 28 }} />}
                    sx={{
                      minHeight: '56px',
                      '&:hover': {
                        backgroundColor:
                          colors.action?.hover ||
                          (isLightMode ? '#f5f5f5' : '#2a2a2a'),
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: `${service.color}15`,
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {React.cloneElement(service.icon, {
                          sx: { fontSize: 24, color: service.color }
                        })}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 600,
                          color: service.color,
                          fontSize: { xs: '1.5rem', sm: '1.8rem' },
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    {/* Service Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: `${service.color}15`,
                        borderBottom: `3px solid ${service.color}`,
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
                        {service.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: service.color,
                            mb: 1,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.5,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            color: colors.textSecondary,
                          }}
                        >
                          {service.description}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Service Overview */}
                    <Typography
                      sx={{
                        mb: 4,
                        lineHeight: 1.7,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: colors.text,
                        fontWeight: 100,
                      }}
                    >
                      {service.detailedDescription}
                    </Typography>

                    <Divider sx={{ my: 3, borderWidth: 2, borderColor: colors.divider }} />

                    {/* Key Features */}
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        color: service.color,
                        fontWeight: 700,
                        borderBottom: `2px solid ${service.color}20`,
                        pb: 1,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        textAlign: 'center',
                      }}
                    >
                      ✨ Key Features
                    </Typography>
                    <Box sx={{ mb: 4 }}>
                      {service.detailedFeatures.map((feature, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            backgroundColor: colors.paper,
                            border: `2px solid ${service.color}20`,
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
                              backgroundColor: service.color,
                              transform: 'scaleX(0)',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              backgroundColor: `${service.color}08`,
                              transform: 'translateY(-1px)',
                              boxShadow: `0 2px 8px ${service.color}30`,
                              borderColor: service.color,
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
                              backgroundColor: `${service.color}15`,
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
                                color: service.color,
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
                      ))}
                    </Box>

                    <Divider sx={{ my: 3, borderWidth: 2, borderColor: colors.divider }} />

                    {/* Technologies */}
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        color: service.color,
                        fontWeight: 700,
                        borderBottom: `2px solid ${service.color}20`,
                        pb: 1,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                      }}
                    >
                      🛠️ Technologies We Use
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
                      {service.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: `${service.color}20`,
                            color: service.color,
                            fontWeight: 600,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            py: 1,
                            px: 1,
                            border: `1px solid ${service.color}30`,
                          }}
                        />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Container>  
      </Box>

      {/* Contact CTA Button */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 8 },
          backgroundColor: isLightMode ? '#f8f9fa' : '#1a1a1a',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: colors.divider,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: colors.text,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: colors.textSecondary,
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Have questions about our services or ready to start your project? 
            Our team is here to help you succeed.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              href="/#contact"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: isLightMode ? '#667eea' : '#3498db',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: isLightMode ? '#5a6fd8' : '#2980b9',
                  transform: 'translateY(-2px)',
                  boxShadow: 6,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact Us Now
            </Button>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: colors.textSecondary,
              fontSize: { xs: '0.85rem', md: '0.9rem' },
            }}
          >
           Response within 24 hours • Free consultation • No commitment required
          </Typography>
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
              <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: 'flex' }}>
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
