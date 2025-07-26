import {
  Container,
  Box,
  Typography,
  Fade,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import HighQuality from '../../assets/High-Quality.png';
import QATesting from '../../assets/QA-Testing.png';
import Accurate from '../../assets/Accurate_Multili.png';
import CustomWeb from '../../assets/web.png';

export default function Service() {
  // const [visible, setVisible] = useState([false, false, false, false]);
  // const sectionRefs = useRef([]);

  // const cardData = [
  //   {
  //     title: 'High-Quality Data Annotation Services',
  //     image: HighQuality,
  //     alt: 'High Quality',
  //     description:
  //       'High-quality data annotation services are essential for training accurate AI models. Our team ensures precise and reliable annotations, enhancing the performance of your machine learning algorithms.',
  //   },
  //   {
  //     title: 'QA Testing Services',
  //     image: QATesting,
  //     alt: 'QA Testing',
  //     description:
  //       'QA testing services are vital for ensuring software quality. We perform rigorous manual and automated testing. Every feature is validated for performance and reliability. Our team detects bugs and inconsistencies early in the cycle. Security and user experience are tested across platforms.',
  //   },
  //   {
  //     title: 'Accurate Multilingual Transcription Services',
  //     image: Accurate,
  //     alt: 'Accurate Multilingual Transcription',
  //     description:
  //       'Accurate multilingual transcription is key for global communication. We deliver precise transcriptions across diverse languages. Our team ensures clarity and cultural relevance in every word.',
  //   },
  //   {
  //     title: 'Custom Web and Mobile Application Development',
  //     image: CustomWeb,
  //     alt: 'Custom Web and Mobile Application Development',
  //     description:
  //       'Custom web and mobile application development services are tailored to meet the unique needs of businesses. Our team works closely with clients to design and implement solutions.',
  //   },
  // ];

  // useEffect(() => {
  //   const observers = sectionRefs.current.map((ref, idx) => {
  //     if (!ref) return null;
  //     return new window.IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           setVisible((prev) => {
  //             const updated = [...prev];
  //             updated[idx] = true;
  //             return updated;
  //           });
  //         }
  //       },
  //       { threshold: 0.1 }
  //     );
  //   });

  //   sectionRefs.current.forEach((ref, idx) => {
  //     if (ref && observers[idx]) observers[idx].observe(ref);
  //   });

  //   return () => {
  //     observers.forEach((observer, idx) => {
  //       if (observer && sectionRefs.current[idx])
  //         observer.unobserve(sectionRefs.current[idx]);
  //     });
  //   };
  // }, []);

  // return (
  //   <Container
  //     component="main"
  //     sx={{
  //       width: '100%',
  //       mt: '40px',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: 4,
  //     }}
  //   >
  //     {cardData.map((card, index) => (
  //       <Fade in={visible[index]} timeout={1500} key={index}>
  //         <Card
  //           ref={(el) => (sectionRefs.current[index] = el)}
  //           sx={{
  //             display: 'flex',
  //             flexDirection: { xs: 'column', md: 'row' },
  //             alignItems: 'center',
  //             gap: 3,
  //             width: '100%',
  //             boxShadow: 4,
  //             borderRadius: 3,
  //             background: 'rgba(255,255,255,0.97)',
  //             p: { xs: 2, md: 4 },
  //             minHeight: 220,
  //           }}
  //         >
  //           <CardMedia
  //             component="img"
  //             image={card.image}
  //             alt={card.alt}
  //             sx={{
  //               objectFit: 'fill',
  //               width: { xs: '100%', md: 220 },
  //               height: { xs: 160, md: 220 },
  //               boxShadow: 2,
  //               borderRadius: 2,
  //               backgroundColor: 'rgba(0, 0, 0, 0.6)',
  //             }}
  //             loading="lazy"
  //           />
  //           <CardContent sx={{ flex: 1 }}>
  //             <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
  //               {card.title}
  //             </Typography>
  //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //               {card.description}
  //               <li>Image and Video Annotation</li>
  //               <li>Text and Audio Annotation</li>
  //               <li>Specialised Data Tagging</li>
  //               <li>Object Recognition and Segmentation</li>
  //             </Typography>
  //           </CardContent>
  //         </Card>
  //       </Fade>
  //     ))}
  //   </Container>
  // );
}
