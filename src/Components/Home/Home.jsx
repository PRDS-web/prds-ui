import Box from '@mui/material/Box';
import home from '../../assets/home.png';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';

function Home() {
  return (
    <>
      <Container
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
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <Box component='p' sx={{ fontSize: {xs: '2.5rem', md: '3rem'} }}>
            Communicate <br />
            Collaborate <br /> Create
          </Box>
          <p style={{ fontSize: '1.2rem', textAlign: 'start' }}>
            We deliver high-impact data and testing solution to power ai,
            software and global innovation
          </p>
          <Box sx={{ display: 'flex', gap: 1, marginTop: '3%', flexWrap:  'wrap'}} >
            <Chip
              variant="outlined"
              label="Testing"
              avatar={<BugReportIcon />}
            />
            <Chip
              variant="outlined"
              label="Development"
              avatar={<CodeIcon/>}
            />
            <Chip
              variant="outlined"
              label="Speed & Security"
              avatar={<LockIcon />}
            />
            <Chip
              variant="outlined"
              label="Happy Customer"
              avatar={<EmojiEmotionsIcon />}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={home} width="150%" height="150%" />
        </Box>
      </Container>
      <Container maxWidth={false} disableGutters>
        <Box
          component='svg'
          viewBox="0 0 1200 600" // Increased from 200 to 300
          preserveAspectRatio="none"
          sx={{width: {xs: '103%',md: '100%'}}}
        >
          <path
            d="M0,150 C700,200 1200,0 1200,100 L1200,600 L0,600 Z"
            fill="rgba(173, 216, 230, 0.6)" // Light blue with 60% opacity
          />
          <foreignObject x="0" y="0" width="1200" height="800">
            <Box
              xmlns="http://www.w3.org/1999/xhtml"
              sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'  , flexDirection: {md: 'row', xs: 'column'} }}
            >
              <Box
                sx={{
                  width: {md: '50%', xs: '100%' },
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start',
                  fontSize: {md: '2.1rem', xs: '2.9rem' },
                  textAlign: 'center',
                }}
              >
                <p style={{ width: '80%' }}>
                  Precision Development. Bulletproof Testing. Stellar Results.
                </p>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: {xs: '100%', md: '50%'},
                  fontSize: {md: '1.2rem', xs: '1.8rem'},
                  textAlign: 'center'
                }}
              >
                <Box component='p'>
                  We believe software should do more than just function. It should perform flawlessly, delight users, and scale with
                  confidence. Our development process is laser-focused on
                  precision, while our testing protocols ensure every
                  interaction is rock-solid. With us, you don't just ship
                  products, you launch standout experiences.
                </Box>
              </Box>
            </Box>
          </foreignObject>
        </Box>
      </Container>
    </>
  );
}
export default Home;
