import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import {
  ExpandMore,
  Code,
  Web,
  PhoneAndroid,
  BugReport,
  Language,
  Star,
  TrendingUp,
  People,
  Security,
  Support,
  Rocket,
  CheckCircle,
  Business,
  School,
  Work,
  LocationOn,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Twitter
} from '@mui/icons-material';

// Company statistics
const companyStats = [
  { icon: <People sx={{ fontSize: 40, color: '#2196f3' }} />, number: '50+', label: 'Team Members' },
  { icon: <Code sx={{ fontSize: 40, color: '#4caf50' }} />, number: '200+', label: 'Projects Completed' },
  { icon: <Star sx={{ fontSize: 40, color: '#ff9800' }} />, number: '98%', label: 'Client Satisfaction' },
  { icon: <TrendingUp sx={{ fontSize: 40, color: '#9c27b0' }} />, number: '5+', label: 'Years Experience' }
];

// Team members
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    avatar: 'SJ',
    bio: 'Visionary leader with 15+ years in tech industry',
    expertise: ['Strategy', 'Leadership', 'Innovation']
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    avatar: 'MC',
    bio: 'Technical expert specializing in scalable architectures',
    expertise: ['Architecture', 'Cloud', 'DevOps']
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    avatar: 'ER',
    bio: 'Creative director focused on user experience',
    expertise: ['UX/UI', 'Design Systems', 'Research']
  },
  {
    name: 'David Kim',
    role: 'Lead Developer',
    avatar: 'DK',
    bio: 'Full-stack developer passionate about clean code',
    expertise: ['React', 'Node.js', 'Python']
  }
];

// FAQ data
const faqData = [
  {
    question: "What services does your company offer?",
    answer: "We offer comprehensive software development services including web development, mobile app development, QA testing, and multi-language support. Our team specializes in modern technologies like React, Node.js, Flutter, and more."
  },
  {
    question: "How long does it typically take to complete a project?",
    answer: "Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We always provide detailed timelines during project planning and keep you updated throughout development."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer comprehensive post-launch support including maintenance, updates, bug fixes, and feature enhancements. We have various support packages to meet your ongoing needs and ensure your application continues to perform optimally."
  },
  {
    question: "What technologies do you use for development?",
    answer: "We use cutting-edge technologies including React.js, Node.js, Flutter, Python, and cloud platforms like AWS and Azure. Our tech stack is chosen based on project requirements to ensure optimal performance, scalability, and maintainability."
  },
  {
    question: "How do you ensure code quality and security?",
    answer: "We follow industry best practices including code reviews, automated testing, security audits, and continuous integration. Our development process includes multiple testing phases and we adhere to OWASP security guidelines to protect your applications."
  },
  {
    question: "Can you work with existing systems and integrate them?",
    answer: "Absolutely! We specialize in system integration and can work with your existing infrastructure, databases, and third-party services. We ensure seamless integration while maintaining data integrity and system stability."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing models including fixed-price projects, time-and-materials, and retainer agreements. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after understanding your requirements."
  },
  {
    question: "Do you provide project management and communication?",
    answer: "Yes, we assign a dedicated project manager to every project who serves as your single point of contact. We use modern project management tools and provide regular updates, milestone reports, and transparent communication throughout the project."
  },
  {
    question: "Can you help with app store optimization and deployment?",
    answer: "Yes, we provide end-to-end support including app store optimization, deployment, and post-launch marketing strategies. We help you navigate app store guidelines and optimize your app for better visibility and downloads."
  },
  {
    question: "What happens if I'm not satisfied with the final product?",
    answer: "Customer satisfaction is our priority. We work closely with you throughout development to ensure the final product meets your expectations. If issues arise, we provide revisions and fixes until you're completely satisfied with the result."
  }
];

export default function AboutUs() {
  const theme = useTheme();
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode);
  const mode = useSelector((state) => state.DarkLightMode.mode);

  // Dynamic colors based on theme
  const getThemeColors = () => ({
    primary: theme.palette.primary.main,
    background: theme.palette.background.default,
    paper: theme.palette.background.paper,
    text: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.divider,
    action: theme.palette.action,
    mode: mode
  });

  const colors = getThemeColors();

  return (
    <Box sx={{ flexGrow: 1 }} mt={6}>
      {/* Hero Section */}
      <Box
        sx={{
          background: isLightMode 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          color: 'white',
          height: '70vh',
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
            About Vibe Coding Service
          </Typography>
          <Typography variant="h5" component="h2" sx={{ 
            mb: 6, 
            opacity: 0.9, 
            fontSize: { xs: '1.25rem', md: '1.75rem' },
            lineHeight: 1.4,
            maxWidth: '800px',
            mx: 'auto'
          }}>
            We are a passionate team of developers, designers, and innovators dedicated to transforming ideas into exceptional digital experiences
          </Typography>
        </Container>
      </Box>

      {/* Company Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {companyStats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: isLightMode ? 3 : 6,
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.paper,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isLightMode ? 6 : 8
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: colors.text,
                    mb: 1
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: colors.textSecondary,
                    fontWeight: 500
                  }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.paper }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ md:12 }}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ 
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: colors.text,
                mb: 4
              }}>
                Our Story
              </Typography>
              </Box>
              <Typography variant="body1" sx={{ 
                mb: 3, 
                lineHeight: 1.8, 
                fontSize: '1.1rem',
                color: colors.textSecondary
              }}>
                Founded in 2019, Vibe Coding Service began with a simple mission: to make exceptional software development accessible to businesses of all sizes. What started as a small team of passionate developers has grown into a full-service digital agency.
              </Typography>
              <Typography variant="body1" sx={{ 
                mb: 3, 
                lineHeight: 1.8, 
                fontSize: '1.1rem',
                color: colors.textSecondary
              }}>
                We believe that great software is built through collaboration, innovation, and attention to detail. Every project we undertake is an opportunity to push boundaries and create something extraordinary.
              </Typography>
              <Typography variant="body1" sx={{ 
                lineHeight: 1.8, 
                fontSize: '1.1rem',
                color: colors.textSecondary
              }}>
                Today, we're proud to have delivered over 200 successful projects and built lasting relationships with clients across various industries.
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md:12 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: isLightMode ? 4 : 6,
                  border: '2px solid',
                  borderColor: colors.divider,
                  backgroundColor: colors.background,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                  },
                  '&:hover::before': {
                    transform: 'scaleX(1)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                  <Rocket sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: colors.text }}>
                    Our Mission
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.7, 
                  color: colors.textSecondary,
                  mb: 3
                }}>
                  To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <Star sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: colors.text }}>
                    Our Vision
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  lineHeight: 1.7, 
                  color: colors.textSecondary
                }}>
                  To be the leading technology partner for businesses seeking digital transformation and innovation.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: colors.text
            }}>
              Our Core Values
            </Typography>
            <Typography variant="h6" sx={{ 
              color: colors.textSecondary,
              fontSize: '1.25rem'
            }}>
              The principles that guide everything we do
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <Code sx={{ fontSize: 40, color: '#2196f3' }} />,
                title: 'Innovation',
                description: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.'
              },
              {
                icon: <People sx={{ fontSize: 40, color: '#4caf50' }} />,
                title: 'Collaboration',
                description: 'We believe the best results come from working closely with our clients and team members.'
              },
              {
                icon: <Security sx={{ fontSize: 40, color: '#ff9800' }} />,
                title: 'Quality',
                description: 'We maintain the highest standards in every line of code and every design decision.'
              },
              {
                icon: <Support sx={{ fontSize: 40, color: '#9c27b0' }} />,
                title: 'Customer Focus',
                description: 'Your success is our success. We are committed to exceeding your expectations.'
              }
            ].map((value, index) => (
              <Grid size={{xs: 12, sm: 6, md:3 }} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: isLightMode ? 2 : 4,
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.paper,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isLightMode ? 4 : 6
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 600, 
                    color: colors.text,
                    mb: 2
                  }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: colors.textSecondary,
                    lineHeight: 1.6
                  }}>
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.paper }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: colors.text
            }}>
              Meet Our Team
            </Typography>
            <Typography variant="h6" sx={{ 
              color: colors.textSecondary,
              fontSize: '1.25rem'
            }}>
              The talented individuals behind our success
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid size={{xs: 12, sm: 6, md:3 }}  key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: isLightMode ? 3 : 5,
                    border: '2px solid',
                    borderColor: colors.divider,
                    backgroundColor: colors.background,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isLightMode ? 5 : 7
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 3,
                      backgroundColor: '#667eea',
                      fontSize: '2rem',
                      fontWeight: 600
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: colors.text,
                    mb: 1
                  }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#667eea',
                    fontWeight: 500,
                    mb: 2
                  }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: colors.textSecondary,
                    mb: 3,
                    lineHeight: 1.5
                  }}>
                    {member.bio}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {member.expertise.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.primary,
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: colors.text
            }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" sx={{ 
              color: colors.textSecondary,
              fontSize: '1.25rem'
            }}>
              Find answers to common questions about our services
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {faqData.slice(0, 5).map((faq, index) => (
                <Accordion
                  key={index}
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
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: colors.textSecondary }} />}
                    sx={{
                      '&:hover': {
                        backgroundColor: colors.action?.hover || (isLightMode ? '#f5f5f5' : '#2a2a2a')
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.text,
                      fontSize: '1rem'
                    }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ 
                      color: colors.textSecondary,
                      lineHeight: 1.6
                    }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              {faqData.slice(5, 10).map((faq, index) => (
                <Accordion
                  key={index + 5}
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
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: colors.textSecondary }} />}
                    sx={{
                      '&:hover': {
                        backgroundColor: colors.action?.hover || (isLightMode ? '#f5f5f5' : '#2a2a2a')
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: colors.text,
                      fontSize: '1rem'
                    }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ 
                      color: colors.textSecondary,
                      lineHeight: 1.6
                    }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact CTA Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.paper }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              boxShadow: isLightMode ? 4 : 6,
              border: '2px solid',
              borderColor: colors.divider,
              backgroundColor: colors.background,
              background: isLightMode 
                ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: colors.text,
              mb: 3
            }}>
              Ready to Start Your Project?
            </Typography>
            <Typography variant="h6" sx={{ 
              color: colors.textSecondary,
              fontSize: '1.25rem',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Let's discuss how we can help bring your ideas to life with our expert development services.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#667eea',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: '#5a6fd8',
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: colors.divider,
                  color: colors.text,
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: colors.text,
                    backgroundColor: colors.action?.hover
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
