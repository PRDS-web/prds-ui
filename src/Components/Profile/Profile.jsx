import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Boy from '../../assets/boyWithoutBG.png';
import { useEffect, useState } from 'react';
import {
  Alert,
  Backdrop,
  Card,
  CircularProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Snackbar,
} from '@mui/material';
import { fetchProfile } from '../../Slice/ProfileSlice';
import { logout } from '../../Slice/UserLoginSlice';
import { Navigate } from 'react-router';
import { resetIsSuccess, resetIsError, resetRedirect } from '../../Slice/ProfileSlice';

export default function Profile() {
  const [isImageFailed, setIsImageFailed] = useState(false);
  const {
    name = 'User',
    picture = '',
    email = '',
    role = '',
    country = '',
    skills = [],
    linkedIn = '',
    mobileNumber = '',
    github = '',
    loggedInType = '',
    createdAt = '',
    updatedAt = '',
  } = useSelector((state) => state.profile.users);
  const { isLoading, isSuccess, isError, isRedirect, errorMessage, successMessage } =
    useSelector((state) => state.profile);
  const handleOnClose = () => {
    if (isSuccess) {
      dispatch(resetIsSuccess());
    } else if (isError) {
      dispatch(resetIsError());
    }
  };
  const dispatch = useDispatch();
  const [gender, setGender] = useState('NA');
  const common = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: [0, 0, 1],
  };
  const commonJob = { fontSize: ['0.8rem', '0.7rem', '1.0rem'] };

  useEffect(() => {
    if (isRedirect) {
      dispatch(logout());
      dispatch(resetRedirect());
      return;
    }
    console.log('Fetching profile data...');
    dispatch(fetchProfile()); // Fetch profile data on component mount
  }, [isRedirect,dispatch]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ marginTop: ['3.5%', '3%', '3.5%'] }}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isRedirect && <Navigate to="/" />}
      <Snackbar
        open={isSuccess || isError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleOnClose}
      >
        <Alert
          severity={isSuccess ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isSuccess ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
      <Box
        component="main"
        sx={{
          backgroundColor: 'rgba(17, 55, 67, 0.73)',
          height: ['15vh', '25vh', '30vh'],
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'start',
        }}
      >
        <Avatar
          variant="square"
          alt={name || 'User Profile'}
          src={
            isImageFailed || picture == '' || picture == null ? Boy : picture
          }
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
            marginLeft: ['28%', '25%', '20%', '15%'],
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
          justifyContent: { md: 'end', xs: 'center', sm: 'end' },
          alignItems: 'center',
          gap: [1, 1, 2],
        }}
      >
        <Box sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component="p" sx={commonJob}>
            Total Opening
          </Box>
        </Box>
        <Box sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component="p" sx={commonJob}>
            Total Opening
          </Box>
        </Box>
        <Box sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component="p" sx={commonJob}>
            Total Opening
          </Box>
        </Box>
        <Box sx={common}>
          <p style={{ fontWeight: 'bold' }}> 23</p>
          <Box component="p" sx={commonJob}>
            Total Opening
          </Box>
        </Box>
      </Box>
      <Box
        m="2%"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          variant="elevation"
          sx={{
            height: '100%',
            padding: '30px',
            width: '75%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            columnGap: '120px',
          }}
        >
          <Box
            width={{ sm: "100%", md: "75%" }}
            height="100%"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <TextField
                type="text"
                value={
                  createdAt ? new Date(createdAt).toLocaleString() : 'N/A'
                }
                label="Created At"
                required
                fullWidth
                disabled
                variant="outlined"
              />
              <TextField
                type="text"
                value={
                  updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'
                }
                label="Updated At"
                required
                fullWidth
                disabled
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: { xs: 2, sm: 3, md: 4 },
                flexDirection: { xs: 'column', sm: 'row' },
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
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: { xs: 2, sm: 3, md: 4 },
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                type="text"
                value={github}
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
                label="Gender"
                fullWidth
                input={<OutlinedInput label="Gender" />}
                variant="outlined"
                disabled
              >
                <MenuItem value="NA">None of Selected</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Backend</MenuItem>
              </Select>
            </Box>
            <TextField
              label="LinkedIn"
              type="text"
              value={linkedIn}
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Mobile Number"
              type="text"
              value={mobileNumber}
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Country"
              type="text"
              value={country}
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Role"
              type="text"
              value={role}
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Skills"
              type="text"
              value={skills.toString()}
              autoFocus
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Logged In Type"
              type="text"
              value={loggedInType}
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
