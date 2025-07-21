import Box from '@mui/material/Box';
import home from '../../assets/home.png';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import { useRef, useEffect, useState } from 'react';
import { Avatar, Card, ThemeProvider } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // Refine AI Behaviour
import GroupIcon from '@mui/icons-material/Group'; // Expert Human Input
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Drive Model Improvement
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Home() {
  const [mainVisible, setMainVisible] = useState(false);
  const [svgVisible, setSvgVisible] = useState(false);
  const mainRef = useRef(null);
  const svgRef = useRef(null);
  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const mainObserver = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setMainVisible(true);
      },
      { threshold: 0.2 }
    );
    const svgObserver = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setSvgVisible(true);
      },
      { threshold: 0.2 }
    );
    if (mainRef.current) mainObserver.observe(mainRef.current);
    if (svgRef.current) svgObserver.observe(svgRef.current);

    return () => {
      if (mainRef.current) mainObserver.unobserve(mainRef.current);
      if (svgRef.current) svgObserver.unobserve(svgRef.current);
    };
  }, []);

  const cardData = [
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: 'inherit', mb: 1 }} />,
      title: 'Refine AI Behaviour',
      content:
        'Our Reinforcement Learning from Human Feedback (RLHF) services enable your AI models to learn and adapt based on nuanced human preferences, resulting in more aligned and robust systems.',
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

  return (
    <>
      <Fade in={mainVisible} timeout={1200}>
        <Container
          ref={mainRef}
          maxWidth="md"
          sx={{
            backgroundColor: 'inherit',
            display: 'flex',
            alignItems: { md: 'start', xs: 'center' },
            justifyContent: 'center',
            gap: '20%',
            marginTop: '4%',
            flexDirection: { md: 'row', xs: 'column-reverse' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              component="p"
              sx={{ fontSize: { xs: '1.4rem', md: '2.2rem', fontWeight: 'bold' } }}
            >
              Pradetra: Empowering AI with Human-Centred Solutions
            </Box>
            <p
              style={{
                fontSize: { sm: '0.7rem', md: '1rem' },
                textAlign: 'start',
              }}
            >
              Pradetra is a leading technology company dedicated to enhancing
              artificial intelligence through comprehensive human-in-the-loop
              services and bespoke development.
            </p>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                marginTop: '3%',
                flexWrap: 'wrap',
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
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: '75%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              variant="rounded"
              src={home}
              sx={{ width: ['120%', '175%'], height: ['120%', '175%'] }}
            />
          </Box>
        </Container>
      </Fade>
      <Fade in={svgVisible} timeout={1500}>
        <Container maxWidth={false} disableGutters ref={svgRef}>
          {!isMobile ? (
            <Box
              component="svg"
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              sx={{
                width: '100%',
                height: 600,
                display: 'block',
              }}
            >
              <path
                d="M0,150 C700,200 1200,0 1200,100 L1200,600 L0,600 Z"
                fill="rgba(173, 216, 230, 0.6)"
              />
              <foreignObject x="0" y="0" width="1200" height="800">
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
                      fontSize: { xs: '2rem', md: '2.5rem' },
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
                            sx={{ color: 'text.secondary' }}
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
            <Box sx={{ py: 4, width: '100%' }}>
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
    </>
  );
}
export default Home;
