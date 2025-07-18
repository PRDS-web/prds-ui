import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Boy from '../../assets/boyWithoutBG.png';
import { useState } from 'react';
import { Grid3x3 } from '@mui/icons-material';
import { Card, MenuItem, Select, TextField } from '@mui/material';

export default function Profile() {
  const [isImageFailed, setIsImageFailed] = useState(false);
  const { name, picture, email } = useSelector((state) => state.user.users);
  const [gender, setGender] = useState('NA');
  const common = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };
  const commonJob = {fontSize: ['0.8rem', '0.7rem' ,'1.0rem']}
  return (
    <Container maxWidth={false} disableGutters sx={{ mt: '3.5%' }}>
      <Box
        component="main"
        sx={{
          backgroundColor: 'rgba(17, 55, 67, 0.73)',
          height: ['15vh', '30vh'],
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'start',
        }}
      >
        <Avatar
          variant="square"
          alt={name || 'User Profile'}
          src={(isImageFailed || picture=='' || picture !=null) ? Boy : picture}
          //   onLoad={() => }
          onError={() => setIsImageFailed(true)}
          sx={{
            height: ['80px', '120px'],
            width: ['80px', '120px'],
            marginLeft: ['3%'],
            position: 'absolute',
            top: ['10%', '28%'],
            border: '4px solid white',
            borderRadius: '3px',
            fontWeight: 'bold',
            fontSize: '3rem',
            backgroundColor: 'white',
          }}
        />
        <Box
          component="p"
          sx={{
            marginLeft: ['28%', '25%' ,'20%', '15%'],
            color: 'white',
            fontWeight: 'bold',
            fontSize: ['1.6rem', '2rem'],
            marginBottom: '1.1%',
          }}
        >
          {name}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(173, 216, 230, 0.6)',
          height: ['20vh', '13vh'],
          display: 'flex',
          flexDirection: 'row',
          justifyContent: {md: 'end', xs: 'center', sm: 'end'},
          alignItems: 'center',
        }}
      >
        <Box sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component='p' sx={commonJob}>Total Opening</Box>
        </Box>
        <Box ml={2} sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component='p' sx={commonJob}>Total Opening</Box>
        </Box>
        <Box ml={2} sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component='p' sx={commonJob}>Total Opening</Box>
        </Box>
        <Box m={2} sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component='p' sx={commonJob}>Total Opening</Box>
        </Box>
      </Box>
      <Box
        m="2%"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          variant="elevation"
          sx={{
            height: ['42vh','70vh'],
            width: '70vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            columnGap: '120px',
          }}
        >
          <Box
            width="75%"
            height="100%"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <TextField
              type="Text"
              value={name}
              label="Name"
              autoFocus
              required
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              type="email"
              value={email}
              label="Email"
              autoFocus
              required
              fullWidth
              disabled
              variant="outlined"
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <TextField
                type="text"
                value="NA"
                label="Github"
                autoFocus
                fullWidth
                disabled
                variant="outlined"
              />
              <Select
                labelId="dropdown-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label='Gender'
                fullWidth
                variant="outlined"
                disabled>
                <MenuItem value="Male" defaultValue='Na'>Male</MenuItem>
                <MenuItem value="Female">Backend</MenuItem>
              </Select>
            </Box>
            <TextField
              label="LinkedIn"
              type="text"
              value="NA"
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
