import {
  Container,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Fade,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import HighQuality from '../../assets/High-Quality.png';
import QATesting from '../../assets/QA-Testing.png';
import Accurate from '../../assets/Accurate_Multili.png';
import CustomWeb from '../../assets/web.png';

export default function Service() {
  const [visible, setVisible] = useState(Array(6).fill(false));
  const gridRefs = useRef([]);
  const cardData = [{
    title: 'High-Quality Data Annotation Services',
    image: HighQuality,
    height: 270,
    alt: 'High Quality',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    description:
      'High-quality data annotation services are essential for training accurate AI models. Our team ensures precise and reliable annotations, enhancing the performance of your machine learning algorithms.',
  },
  {
    title: 'QA Testing Services',
    image: QATesting,
    alt: 'QA Testing',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 270,
    description:
      "QA testing services are vital for ensuring software quality. We perform rigorous manual and automated testing. Every feature is validated for performance and reliability. Our team detects bugs and inconsistencies early in the cycle. Security and user experience are tested across platforms.",
  },
  {
    title: 'Accurate Multilingual Transcription Services',
    image: Accurate,
    alt: 'Accurate Multilingual Transcription',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 270,
    description:
      'Accurate multilingual transcription is key for global communication. We deliver precise transcriptions across diverse languages. Our team ensures clarity and cultural relevance in every word.',
  },
  {
    title: 'Custom Web and Mobile Application Development',
    image: CustomWeb,
    alt: 'Custom Web and Mobile Application Development',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 270,
    description:
      'Custom web and mobile application development services are tailored to meet the unique needs of businesses. Our team works closely with clients to design and implement solutions.',
  }];

  useEffect(() => {
    const observers = gridRefs.current.map((ref, idx) => {
      if (!ref) return null;
      return new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          }
        },
        { threshold: 0.1 }
      );
    });

    gridRefs.current.forEach((ref, idx) => {
      if (ref && observers[idx]) observers[idx].observe(ref);
    });

    return () => {
      observers.forEach((observer, idx) => {
        if (observer && gridRefs.current[idx]) observer.unobserve(gridRefs.current[idx]);
      });
    };
  }, []);

  return (
    <Container component="main" sx={{ width: '100%' }}>
      <Box
        component="p"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.7rem',
          padding: '20px',
          fontWeight: 'bold',
        }}
      >
        What we offer
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {cardData.map((card, index) => (
          <Grid
            item
            xs={4}
            key={index}
            ref={(el) => (gridRefs.current[index] = el)}
          >
            <Fade in={visible[index]} timeout={1500} >
              <Card sx={{ maxWidth: 260, height: '50%' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.alt}
                    sx={{ objectFit: 'fill', height: card.height, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}