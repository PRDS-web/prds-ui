import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  Chip,
  Fade,
  Card,
  CardContent,
  useMediaQuery,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTheme } from '@emotion/react';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useEffect, useRef, useState } from 'react';
import Contact from '../Contact us/Contact';
import BGIMG from '../../assets/Card-BG.jpg';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TranslateIcon from '@mui/icons-material/Translate';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import {
  EmojiObjects,
  Handshake,
  DesignServices,
  RocketLaunch,
  Reviews,
  Star
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const teamImages = [
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/34.jpg',
  'https://randomuser.me/api/portraits/men/15.jpg',
  'https://randomuser.me/api/portraits/women/60.jpg',
  'https://randomuser.me/api/portraits/men/17.jpg',
  'https://randomuser.me/api/portraits/women/28.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
];

// const navLinks = ['Work', 'Services', 'Pricing', 'Contact'];

export default function Home() {
  const theme = useTheme();
  const [svgVisible, setSvgVisible] = useState(false);
  const svgRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const steps = [
    {
      icon: (
        <Handshake
          sx={{
            color: theme.palette.mode == 'dark' ? 'white' : 'dark',
            fontSize: [20, 50],
          }}
        />
      ),
      title: 'Discovery & Consultation',
      desc: 'We understand your AI/data needs, analyze requirements, and design a custom solution strategy that aligns with your business goals.',
      fontSize: [20,50],
    },
    {
      icon: (
        <DesignServices
          sx={{
            color: theme.palette.mode == 'dark' ? 'white' : 'dark',
            fontSize: [20,50],
          }}
        />
      ),
      title: 'Project Planning',
      desc: 'We create detailed project roadmaps, establish quality standards, and set up secure data pipelines with clear milestones and deliverables.',
    },
    {
      icon: (
        <RocketLaunch
          sx={{
            color: theme.palette.mode == 'dark' ? 'white' : 'dark',
            fontSize: [20,50],
          }}
        />
      ),
      title: 'Execution & Delivery',
      desc: 'Our global team executes data collection, annotation, or development work with continuous quality monitoring and regular progress updates.',
    },
    {
      icon: (
        <Reviews
          sx={{
            color: theme.palette.mode == 'dark' ? 'white' : 'dark',
            fontSize: [20,50],
          }}
        />
      ),
      title: 'Quality Assurance & Handover',
      desc: 'We conduct rigorous testing, validation, and quality checks before delivering the final solution with comprehensive documentation and support.',
    },
  ];

  const chipData = [
    {
      label: 'Testing',
      icon: <BugReportIcon />,
      variant: 'outlined',
      size: 'small',
    },
    {
      label: 'Development',
      icon: <CodeIcon />,
      variant: 'outlined',
      size: 'small',
    },
    {
      label: 'Speed & Security',
      icon: <LockIcon />,
      variant: 'outlined',
      size: 'small',
    },
    {
      label: 'Happy Customer',
      icon: <EmojiEmotionsIcon />,
      variant: 'outlined',
      size: 'small',
    },
  ];

  useEffect(() => {
    const currentSvg = svgRef.current;
    const svgObserver = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setSvgVisible(true);
      },
      { threshold: 0.2 }
    );
    if (currentSvg) svgObserver.observe(currentSvg);

    return () => {
      if (currentSvg) svgObserver.unobserve(currentSvg);
    };
  }, []);

  useEffect(() => {
    if (location.hash === '#contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (location.hash === '#services') {
      serviceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);
  const cardData = [
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: 'inherit', mb: 1 }} />,
      title: 'Refine AI Behaviour',
      content:
        'Our Reinforcement Learning from Human Feedback (RLHF) services enable your AI models to learn and adapt based on nuanced human preferences.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: 'inherit', mb: 1 }} />,
      title: 'Expert Human Input',
      content:
        'We leverage a skilled team to provide high-quality human feedback, crucial for fine-tuning complex AI algorithms and improving decision-making capabilities.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'inherit', mb: 1 }} />,
      title: 'Drive Model Improvement',
      content:
        'Through iterative feedback loops, we help AI research labs and tech startups significantly enhance model performance, safety, and ethical considerations.',
    },
  ];

  const serviceCard = [
    {
      title: 'Smart Data Tagging',
      discription:
        'We deliver intelligent data annotation that fuels AI systems with precision, scalability, and industry grade structure designed to accelerate your ML pipelines and unlock deeper insights.',
      icon: <DeveloperModeIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Global Transcription',
      discription:
        'Our transcription specialists convert multilingual audio into crystal clear, time-synced text with linguistic accuracy empowering global communication and content accessibility.',
      icon: <TranslateIcon />,
    },
    {
      title: 'App Crafting Studio',
      discription:
        'We engineer custom web and mobile applications tailored to modern users scalable, performant, and crafted to deliver delightful UI experiences across devices, with seamless integrations',
      icon: <DeveloperModeIcon />,
    },
    {
      title: 'Precision QA Testing',
      discription:
        'We test digital products with meticulous attention to detail—offering manual and automated workflows that ensure reliability, responsiveness, and user trust, while minimizing risk, strengthening quality',
      icon: <BugReportIcon />,
    },
  ];

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]');
    const prevCanonical = document.querySelector('link[rel="canonical"]');
    document.title = 'Pradetra | Smart tech. Real people. Real impact.';
    if (prevDesc) {
      prevDesc.setAttribute(
        'content',
        'Pradetra is a leading technology company delivering RLHF, data annotation, QA testing, transcription, and bespoke app development.'
      );
    }
    if (prevCanonical) {
      prevCanonical.setAttribute('href', 'https://pradetra.com/');
    }
    return () => {
      document.title = prevTitle;
      if (prevCanonical) prevCanonical.setAttribute('href', 'https://pradetra.com/');
    };
  }, []);

  return (
    <>
      <Box
        // them
        sx={{
          bgcolor: theme.palette.background.default,
          height: 'auto',
          width: '100%',
          marginTop: '20px',
        }}
      >
        <Container
          maxWidth="md"
          sx={{ pt: { xs: 8, md: 14 }, pb: 8, textAlign: 'center' }}
        >
          <Stack
            direction="row"
            spacing={-2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            {teamImages.map((img, idx) => (
              <Avatar
                key={idx}
                src={img}
                sx={{
                  width: 64,
                  height: 64,
                  border: '3px solid #fff',
                  boxShadow: 2,
                  zIndex: teamImages.length - idx,
                }}
              />
            ))}
          </Stack>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
              fontSize: { xs: '2.2rem', md: '3.1rem' },
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            Smart tech. Real people,{' '}
            <Box component="span" sx={{ color: '#0e5b6eff' }}>
              Real impact. <br /> Pradetra leads.
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 400,
              mb: 5,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            Pradetra is a leading technology company dedicated to enhancing
            artificial intelligence through comprehensive human-in-the-loop
            services and bespoke development.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            {chipData.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                icon={chip.icon}
                variant={chip.variant}
                size={chip.size}
                sx={{
                  backgroundColor: 'rgba(173, 216, 230, 0.6)',
                  p: 2,
                  borderRadius: 6,
                }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              serviceRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            sx={{
              bgcolor: theme.palette.background.primary,
              borderRadius: 2,
              fontWeight: 600,
              px: 4,
              py: 1.5,
              padding: '8px',
              boxShadow: 2,
              textTransform: 'none',
              fontSize: ['0.8rem','1.1rem'],
              mt: 4,
              '&:hover': { bgcolor: '#0e5b6eff' },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              contactRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            sx={{
              bgcolor: theme.palette.background.primary,
              borderRadius: 2,
              fontWeight: 600,
              px: 4,
              py: 1.5,
             padding: '8px',
              // paddingBottom: '5px',
              // paddingLeft: '7px',
              boxShadow: 2,
              textTransform: 'none',
              fontSize: ['0.8rem','1.1rem'],
              mt: 4,
              ml: 4,
              '&:hover': { bgcolor: '#0e5b6eff' },
            }}
          >
            Contact us
          </Button>
        </Container>
      </Box>

      {/* Company Overview Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: theme.palette.background.paper,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
              }}
            >
              What We Do
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              We bridge the gap between artificial intelligence and human expertise, 
              delivering comprehensive solutions that make AI systems smarter, safer, and more reliable.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DataObjectIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  AI & Data Solutions
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  Data collection, annotation, and validation services that power 
                  machine learning models with high-quality, culturally diverse datasets.
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TranslateIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  Global Services
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  Multilingual transcription, translation, and localization services 
                  across 150+ languages with native speaker expertise.
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DeveloperModeIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  Custom Development
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  Bespoke web and mobile applications, QA testing, and enterprise 
                  solutions tailored to your specific business needs.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced RLHF Section */}
      <Box
        ref={serviceRef}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(14, 91, 110, 0.15) 0%, rgba(14, 91, 110, 0.05) 50%, rgba(14, 91, 110, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(14, 91, 110, 0.08) 0%, rgba(14, 91, 110, 0.03) 50%, rgba(14, 91, 110, 0.08) 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(14, 91, 110, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(14, 91, 110, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(14, 91, 110, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2.2rem', md: '3.2rem' },
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  mb: 3,
                  background: `linear-gradient(45deg, ${theme.palette.text.primary}, #0e5b6eff)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Precision RLHF for Advanced AI Models
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400,
                  mb: 4,
                  maxWidth: '900px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Transform your AI models with human-in-the-loop feedback that ensures 
                ethical, accurate, and contextually aware responses.
              </Typography>
              <Box
                sx={{
                  width: 100,
                  height: 4,
                  bgcolor: '#0e5b6eff',
                  mx: 'auto',
                  borderRadius: 2,
                }}
              />
            </Box>

            <Grid container spacing={4}>
              {cardData.map((card, idx) => (
                <Grid size={{ xs: 12, md: 4 }} key={idx}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 0,
                      textAlign: 'center',
                      borderRadius: 4,
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid',
                      borderColor: theme.palette.divider,
                      background: theme.palette.background.paper,
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, #0e5b6eff, #ff9800)`,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 50px rgba(14, 91, 110, 0.2)',
                        borderColor: '#0e5b6eff',
                        '&::before': {
                          transform: 'scaleX(1)',
                        },
                        '& .rlhf-icon': {
                          transform: 'scale(1.1)',
                          bgcolor: '#ff9800',
                        },
                        '& .rlhf-title': {
                          color: '#0e5b6eff',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box
                        className="rlhf-icon"
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: '#0e5b6eff',
                          mx: 'auto',
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 8px 20px rgba(14, 91, 110, 0.3)',
                        }}
                      >
                        {card.icon}
                      </Box>

                      <Typography
                        className="rlhf-title"
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 3,
                          color: theme.palette.text.primary,
                          transition: 'color 0.3s ease',
                          fontSize: { xs: '1.3rem', md: '1.5rem' },
                        }}
                      >
                        {card.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      >
                        {card.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </Container>
        </Box>
      {/* Enhanced Services Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(14, 91, 110, 0.1) 0%, rgba(14, 91, 110, 0.05) 50%, rgba(14, 91, 110, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(14, 91, 110, 0.05) 0%, rgba(14, 91, 110, 0.02) 50%, rgba(14, 91, 110, 0.05) 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(14, 91, 110, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14, 91, 110, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: theme.palette.text.primary,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.text.primary}, #0e5b6eff)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Services
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: 400,
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Comprehensive solutions that power the future of AI and technology
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                bgcolor: '#0e5b6eff',
                mx: 'auto',
                borderRadius: 2,
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {serviceCard.map((service, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                <Card
                  sx={{
                    height: '350px',
                    p: 0,
                    textAlign: 'center',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    background: theme.palette.background.paper,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, #0e5b6eff, #ff9800)`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px rgba(14, 91, 110, 0.2)',
                      borderColor: '#0e5b6eff',
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                      '& .service-icon': {
                        transform: 'scale(1.1)',
                        bgcolor: '#ff9800',
                      },
                      '& .service-title': {
                        color: '#0e5b6eff',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                      className="service-icon"
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        bgcolor: '#0e5b6eff',
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 16px rgba(14, 91, 110, 0.3)',
                      }}
                    >
                      {service.icon}
                    </Box>

                    <Typography
                      className="service-title"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: theme.palette.text.primary,
                        transition: 'color 0.3s ease',
                        fontSize: { xs: '1.2rem', md: '1.3rem' },
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                      }}
                    >
                      {service.discription}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="contained"
              size="large"
              href="/service"
              sx={{
                bgcolor: '#0e5b6eff',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(14, 91, 110, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#0a4a5a',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 32px rgba(14, 91, 110, 0.4)',
                },
              }}
            >
              Explore All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
              }}
            >
              Why Choose Pradetra?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              We combine cutting-edge technology with human expertise to deliver 
              solutions that are both innovative and reliable.
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                bgcolor: '#0e5b6eff',
                mx: 'auto',
                borderRadius: 2,
              }}
            />
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <GroupIcon sx={{ fontSize: 30, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Global Network
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our diverse vendor and contributor network spans 50+ countries, 
                    enabling us to collect region-specific, accent-specific, and 
                    culturally relevant datasets at scale.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LockIcon sx={{ fontSize: 30, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Enterprise Security
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We maintain the highest security standards with NDA compliance, 
                    enterprise-grade data pipelines, and strict confidentiality 
                    protocols for sensitive projects.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 30, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Quality Assurance
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    Our multi-layer validation framework ensures 99% accuracy with 
                    contributor training, automated checks, human review, and 
                    final audit reports.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '2px solid',
                  borderColor: theme.palette.divider,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4,
                    borderColor: '#0e5b6eff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: '#0e5b6eff',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EmojiEmotionsIcon sx={{ fontSize: 30, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Ethical AI Focus
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    We champion fairness, inclusivity, and bias-aware solutions, 
                    ensuring your AI systems are built with ethical considerations 
                    and cultural sensitivity.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Process Section - Simplified */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: theme.palette.background.paper,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
              }}
            >
              Our Process
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              We follow a streamlined approach that ensures quality, efficiency, and client satisfaction at every step.
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                bgcolor: '#0e5b6eff',
                mx: 'auto',
                borderRadius: 2,
              }}
            />
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#0e5b6eff',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 3,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Contact ref={contactRef} />
    </>
  );
}
