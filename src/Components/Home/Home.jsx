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
      title: 'Consultation',
      desc: 'We brainstorm solutions, share insights, and align expectations.',
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
      title: 'Planning',
      desc: 'We architect scalable, secure workflows and immersive UI/UX.',
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
      title: 'Execution',
      desc: 'We build, test, and deliver with pixel precision and tech finesse.',
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
      title: 'Review',
      desc: 'We iterate, refine, and validate results for maximum impact.',
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
        'We deliver intelligent data annotation that fuels AI systems with precision, scalability, and industry grade structure designed to accelerate your ML pipelines and unlock deeper insights with greater accuracy.',
      icon: <DataObjectIcon sx={{ color: 'white' }} />,
    },
    {
      title: 'Global Transcription',
      discription:
        'Our transcription specialists convert multilingual audio into crystal clear, time-synced text with linguistic accuracy empowering global communication and content accessibility.',
      icon: <TranslateIcon sx={{ color: 'white' }} />,
    },
    {
      title: 'App Crafting Studio',
      discription:
        'We engineer custom web and mobile applications tailored to modern users scalable, performant, and crafted to deliver delightful UI experiences across devices, with seamless integrations',
      icon: <DeveloperModeIcon sx={{ color: 'white' }} />,
    },
    {
      title: 'Precision QA Testing',
      discription:
        'We test digital products with meticulous attention to detail—offering manual and automated workflows that ensure reliability, responsiveness, and user trust, while minimizing risk, strengthening quality',
      icon: <BugReportIcon sx={{ color: 'white' }} />,
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

      <Fade in={svgVisible} timeout={1500}>
        <Container maxWidth={false} disableGutters ref={svgRef}>
          {!isMobile ? (
            <Box
              ref={serviceRef}
              component="svg"
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            >
              <path
                d="M0,150 C700,200 1200,0 1200,100 L1200,600 L0,600 Z"
                fill="rgba(7, 91, 122, 0.6)"
              />
              <foreignObject x="0" y="0" width="100%" height="800">
                <Box
                  xmlns="http://www.w3.org/1999/xhtml"
                  sx={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    py: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 4,
                      textAlign: 'center',
                      fontSize: { xs: '1.8rem', md: '2.0rem' },
                    }}
                  >
                    Precision RLHF for Advanced AI Models
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 3,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {cardData.map((card, idx) => (
                      <Card
                        key={idx}
                        sx={{
                          width: { xs: '100%', md: 340 },
                          boxShadow: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          borderRadius: 3,
                          background: (theme) => theme.palette.background.paper,
                          mb: { xs: 2, md: 0 },
                        }}
                      >
                        <CardContent>
                          {card.icon}
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {card.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.9rem',
                              height: '30%',
                            }}
                          >
                            {card.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </foreignObject>
            </Box>
          ) : (
            <Box ref={serviceRef} sx={{ py: 4, width: '100%' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  textAlign: 'center',
                  fontSize: '2rem',
                }}
              >
                Precision RLHF for Advanced AI Models
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {cardData.map((card, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      width: '80%',
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 3,
                      background: (theme) => theme.palette.background.paper,
                      mb: 2,
                    }}
                  >
                    <CardContent>
                      {card.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        {card.content}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </Fade>
      <Box
        sx={{
          mt: '2%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: (theme) =>
            theme.palette.mode == 'dark'
              ? 'linear-gradient(358deg, rgba(22, 22, 42, 1) 7%, rgba(35, 35, 49, 1) 67%, rgba(21, 31, 34, 1) 88%)'
              : 'linear-gradient(358deg,rgba(78, 78, 145, 1) 7%, rgba(141, 141, 184, 1) 67%, rgba(108, 155, 166, 1) 88%);',
        }}
      >
        <Typography
          fontWeight={800}
          fontSize={{ xs: 25, md: 50 }}
          mt={4}
          color="white"
          fontFamily="cursive"
        >
          Services
        </Typography>
        <Typography
          fontWeight={800}
          fontSize={{ xs: 28, md: 50 }}
          color="white"
          fontFamily={'cursive'}
        >
          Our Experties
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            width: '90%',
            mt: '25px', // background: '#020024'
            height: 'auto',
            overflow: 'visible',
          }}
        >
          <Grid container spacing={2}>
            {serviceCard.map((service, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <Card
                  sx={{
                    width: '96%',
                    height: '95%',
                    mx: 'auto',
                    p: 3,
                    textAlign: 'center',
                    boxShadow: 6,
                    borderRadius: 3,
                    backgroundImage: `url(${BGIMG})`,
                    filter:
                      theme.palette.mode == 'dark'
                        ? 'brightness(40%) contrast(100%)'
                        : 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.9s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: '#ff9800',
                      mx: 'auto',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {service.icon}
                  </Box>

                  <CardContent sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                      color="black"
                    >
                      {service.title}
                    </Typography>

                    <Typography variant="body2" color="black" >
                      {service.discription}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography component={'a'} mt={5} mb={5} href="/service" color="white">
          See Our Services
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '15px',
          flexDirection: 'column',
          //background: 'linear-gradient(338deg, rgba(141, 141, 184, 1) 25%, rgba(108, 155, 166, 1) 40%, rgba(93, 93, 186, 1) 76%)'
        }}
      >
        <Typography
          component={'p'}
          fontWeight={800}
          sx={{ fontSize: ['40px', '40px']  }}
          fontStyle={'inherit'}
          fontFamily="cursive"
        >
          WorkFlow
        </Typography>
        <Typography mt={3} sx={{ fontSize: ['25px'] }} fontFamily="cursive">
          🎯End-to-End Excellence
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={-1}
          sx={{ width: '100%', marginTop: '5%' }}
        >
          {steps.map((step, i) => (
            <Step key={i}>
              <StepLabel
               icon= {step.icon}
              >    
                  <Typography variant="h6" fontWeight="bold" mt={1} sx={{fontSize: {xs: 15}}}>
                  {step.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" fontSize={13}>
                  {step.desc}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Contact ref={contactRef} />
    </>
  );
}
