import React from 'react';
import PublicIcon from '@mui/icons-material/Public';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
  Stack,
} from '@mui/material';
import {
  ExpandMore,
  Code,
  Star,
  TrendingUp,
  People,
  Security,
  Support,
  Rocket,
} from '@mui/icons-material';
import CountUp from 'react-countup';

// Company statistics
const companyStats = [
  {
    icon: <People sx={{ fontSize: 40, color: '#2196f3' }} />,
    number: 50,
    label: 'Team Members',
  },
  {
    icon: <Code sx={{ fontSize: 40, color: '#4caf50' }} />,
    number: 200,
    label: 'Projects Completed',
  },
  {
    icon: <Star sx={{ fontSize: 40, color: '#ff9800' }} />,
    number: 98,
    label: 'Client Satisfaction',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: '#9c27b0' }} />,
    number: 5,
    label: 'Years Experience',
  },
];

// Team members
const teamMembers = [
  {
    name: 'Mohit Mishra',
    role: 'CEO & Founder',
    avatar: '',
    bio: 'Visionary leader with 15+ years in tech industry',
    expertise: ['Strategy', 'Leadership', 'Innovation'],
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    avatar: 'MC',
    bio: 'Technical expert specializing in scalable architectures',
    expertise: ['Architecture', 'Cloud', 'DevOps'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    avatar: 'ER',
    bio: 'Creative director focused on user experience',
    expertise: ['UX/UI', 'Design Systems', 'Research'],
  },
  {
    name: 'David Kim',
    role: 'Lead Developer',
    avatar: 'DK',
    bio: 'Full-stack developer passionate about clean code',
    expertise: ['React', 'Node.js', 'Python'],
  },
];

// FAQ data
const faqData = [
  {
    question: 'What services does your company offer?',
    answer:
      'We offer comprehensive software development services including web development, mobile app development, QA testing, and multi-language support. Our team specializes in modern technologies like React, Node.js, and more.',
  },
  {
    question: 'How long does it typically take to complete a project?',
    answer:
      'Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We always provide detailed timelines during project planning and keep you updated throughout development.',
  },
  {
    question: 'What services does Pradetra provide?',
    answer:(
      <>
        We specialize in <b>human-in-the-loop AI solutions</b>, including: 
        <ul style={{marginLeft: '17px'}}>
         <li style={{fontWeight: 'bold'}}>Data Collection (speech, text, image, video, survey, research-based data)</li>
         <li style={{fontWeight: 'bold'}}> Transcription & Translation (multi-lingual, domain-specific) </li>
         <li style={{fontWeight: 'bold'}}> Data Annotation (text, audio, image, video, intent & entity labeling)</li>
         <li style={{fontWeight: 'bold'}}> Testing & QA (manual, functional, and AI model evaluation)</li>
          <li style={{fontWeight: 'bold'}}> Model Evaluation & Validation (chatbots, ASR, LLMs, NLP systems)</li>
        </ul>
      </>
    ),

  },
  {
    question: 'Can you collect data globally?',
    answer: (
      <>
      Yes. We have a <b> diverse vendor and contributor network across 50+ countries</b>, enabling us to collect <b>region-specific, accent-specific, and culturally relevant datasets </b> at scale.
      </>
    )
  },
  {
    question: 'Do you handle sensitive or large-scale enterprise projects?',
    answer: (
      <>
       Absolutely. Our team has experience managing,<b> enterprise-grade data pipelines </b>, ensuring <b>security, confidentiality (NDA-compliant), and scalability </b> for projects of <b>10K+ hours of speech or millions of images.</b>
      </>
    ),
  },
  {
    question: 'Can you work with existing systems and integrate them?',
    answer:(
      <>
        Absolutely! <b>We specialize</b> in system integration and can work with your existing infrastructure, databases, and third-party services. We ensure seamless integration while maintaining data integrity and system stability.
      </>
    ),
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'We offer flexible pricing models including fixed-price projects, time-and-materials, and retainer agreements. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after understanding your requirements.',
  },
  {
    question: 'How do you ensure quality in data and annotation?',
     answer:(
      <>
        We follow a <b>multi-layer validation framework:</b>, 
        <ol style={{marginLeft: '27px'}}>
         <li style={{fontWeight: 'bold'}}>Contributor Training & Guidelines</li>
         <li style={{fontWeight: 'bold'}}>In-Platform QA Checks</li>
         <li style={{fontWeight: 'bold'}}>Human Review by Senior Annotators</li>
         <li style={{fontWeight: 'bold'}}>Automated Consistency Checks</li>
          <li style={{fontWeight: 'bold'}}>Final Audit Report</li>
        </ol>
        This ensures <b>99% accuracy</b> in delivered datasets.
      </>
    ),
  },
  {
    question: 'Can Pradetra support research and academic institutions?',
    answer:(
      <>
        Yes. We frequently work with <b> universities, research labs, and non-profits </b> to provide <b>custom datasets, surveys, opinion studies, and research-driven data </b> aligned with their study requirements.
      </>
    ),
  },
  {
    question: "What makes Pradetra different from competitors?",
    answer:(
      <>
        <ul style={{marginLeft: '17px'}}>
         <li style={{fontWeight: 'bold'}}>Global scalability with trusted vendors</li>
         <li style={{fontWeight: 'bold'}}>Human + AI hybrid workflows for faster delivery </li>
         <li style={{fontWeight: 'bold'}}>Custom-tailored solutions instead of one-size-fits-all</li>
         <li style={{fontWeight: 'bold'}}>Strong ethics in AI: fairness, inclusion, and privacy-first approach</li>
         <li style={{fontWeight: 'bold'}}>End-to-end service: from raw data to insights</li>
        </ul>
      </>
    )
  },
  {
    question: "How can I start a project with Pradetra?",
    answer:(
      <>
      Simply reach out to us at 📧 <a href="mailto:info@pradetra.com">info@pradetra.com</a>  with your requirements. Our team will provide a <b>custom proposal </b> including:
        <ul style={{marginLeft: '17px'}}>
         <li style={{fontWeight: 'bold'}}>Approach & methodology</li>
         <li style={{fontWeight: 'bold'}}>Timeline & milestones </li>
        </ul>
      </>
    )
  },
];
const ourCoreValue = [
  {
    icon: <Code sx={{ fontSize: 40, color: '#2196f3' }} />,
    title: 'Innovation',
    description:
      'We constantly explore new technologies and approaches to deliver cutting-edge solutions.',
  },
  {
    icon: <People sx={{ fontSize: 40, color: '#4caf50' }} />,
    title: 'Collaboration',
    description:
      'We believe the best results come from working closely with our clients and team members.',
  },
  {
    icon: <Security sx={{ fontSize: 40, color: '#ff9800' }} />,
    title: 'Quality',
    description:
      'We maintain the highest standards in every line of code and every design decision.',
  },
  {
    icon: <Support sx={{ fontSize: 40, color: '#9c27b0' }} />,
    title: 'Customer Focus',
    description:
      'Your success is our success. We are committed to exceeding your expectations.',
  },
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
    mode: mode,
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
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '5rem' },
              fontWeight: 800,
              mb: 3,
            }}
          >
            About Pradetra Service
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 6,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.45rem' },
              lineHeight: 1.4,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            At Pradetra, we are more than just a service provider. We are your
            strategic partner in human-in-the-loop AI, data services, and
            digital transformation. Our passionate team of developers, data
            experts, QA testers, and innovators work tirelessly to help
            organizations build smarter, safer, and more inclusive technologies
          </Typography>
        </Container>
      </Box>

      {/* Company Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: 'wrap' }}>
          {companyStats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                width: '35%',
                height: '35%',
                flex: '1 1 250px',
                margin: '1%',
                p: 3,
                textAlign: 'center',
                boxShadow: 6,
                borderRadius: 3,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                cursor: 'pointer',
                transition: 'transform 0.9s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{stat.icon}</Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: colors.text,
                  mb: 1,
                }}
              >
                <CountUp key={index} start={0} end={stat.number} delay={0}>
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />{' '}
                      {stat.label == 'Client Satisfaction' ? '%' : '+'}
                    </div>
                  )}
                </CountUp>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Card>
          ))}
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: colors.paper,
          boxShadow: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ md: 12 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 700,
                    color: colors.text,
                    mb: 4,
                  }}
                >
                  Our Story
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                Founded on 11 November 2024 Pradetra began with a clear vision:
                to deliver world class AI and data solutions through a
                human-centric lens. Rooted in New Delhi, our journey started
                with a passionate team that believed high-quality data services
                shouldn't be reserved for elite tech firms.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                At Pradetra, we hold firm to the belief that intelligent
                technology is built through collaboration, precision, and
                cultural integrity. Every project we undertake whether it's
                multilingual transcription, image/audio annotation, AI model
                evaluation, or curated research data—is driven by craftsmanship
                and a commitment to excellence.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                Though we're relatively young, our progress speaks volumes. In
                less than a year, we've completed an impressive number of client
                engagements, launched scalable workflows, and earned trust
                across industries especially in AI development and research
                domains.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
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
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::before': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Rocket sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: colors.text }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  To accelerate the future of
                  <b> Artificial Intelligence and Digital Innovation </b> by
                  delivering 
                  <b> high quality, culturally diverse, and human verified data </b>
                  that powers smarter, safer, and more ethical technologies
                  worldwide.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    justifyContent: 'center',
                  }}
                >
                  <PublicIcon
                    sx={{ fontSize: 40, color: '#2a55d7ff', mr: 2 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: colors.text }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                  }}
                >
                  To be recognized as a
                  <b> global leader in human-in-the-loop AI services</b>,
                  trusted by enterprises, research institutions, and governments
                  to provide
                  <b> scalable data solutions, rigorous testing, and impactful
                    insights 
                  </b>
                  {' '}that shape the next generation of intelligent systems.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 3,
                    justifyContent: 'center',
                  }}
                >
                  <Star sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: colors.text }}
                  >
                    Our Core Values
                  </Typography>
                </Box>
                <Box sx={{ maxWidth: '100%', mx: 'auto', py: 4 }}>
                  <Stack spacing={4}>
                    <Box>
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        We deliver <b>enterprise-grade precision</b> through <b>multi-step validation</b> and <b>advanced tooling</b>, ensuring every dataset and annotation meets the highest standards. With a <b>global network spanning 50+ countries</b>, we scale <b>data collection</b>, <b>transcription</b>, and <b>testing projects</b> swiftly and efficiently. By combining <b>cutting-edge AI</b>, <b>automation frameworks</b>, and <b>human expertise</b>, we build <b>future-ready data pipelines</b> tailored to your goals—always with a <b>client-centric</b>, <b>ethical approach</b> that champions <b>fairness</b>, <b>inclusivity</b>, and <b>bias-aware solutions</b>.

                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Our Core Values
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textSecondary,
                fontSize: '1.25rem',
              }}
            >
              The principles that guide everything we do
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {ourCoreValue.map((value, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                      boxShadow: isLightMode ? 4 : 6,
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>{value.icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: colors.text,
                      mb: 2,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      {/* <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.paper }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textSecondary,
                fontSize: '1.25rem',
              }}
            >
              The talented individuals behind our success
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                    cursor: 'pointer',
                    transition: 'transform 0.9s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      // boxShadow: 6,
                      boxShadow: isLightMode ? 5 : 7,
                    },
                    // transition: 'all 0.3s ease',
                    // '&:hover': {
                    //   transform: 'translateY(-5px)',

                    // },
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
                      fontWeight: 600,
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: colors.text,
                      mb: 1,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#667eea',
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textSecondary,
                      mb: 3,
                      lineHeight: 1.5,
                    }}
                  >
                    {member.bio}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'center',
                    }}
                  >
                    {member.expertise.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        sx={{
                          // backgroundColor: `${colors.primary}20`,
                          // color: colors.primary,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textSecondary,
                fontSize: '1.25rem',
              }}
            >
              Find answers to common questions about our services
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {faqData.map((faq, index) => (
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
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore sx={{ color: colors.textSecondary }} />
                    }
                    sx={{
                      '&:hover': {
                        backgroundColor:
                          colors.action?.hover ||
                          (isLightMode ? '#f5f5f5' : '#2a2a2a'),
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: colors.text,
                        fontSize: '1rem',
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body2"
                      sx={{
                        // color: colors.textSecondary,
                        lineHeight: 1.6,
                      }}
                    >
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
                : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: colors.text,
                mb: 3,
              }}
            >
              Ready to Start Your Project?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textSecondary,
                fontSize: '1.25rem',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Let's discuss how we can help bring your ideas to life with our
              expert development services.
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
                href='/service'
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
                    boxShadow: 4,
                  },
                  transition: 'all 0.3s ease',
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
                    backgroundColor: colors.action?.hover,
                  },
                  transition: 'all 0.3s ease',
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
