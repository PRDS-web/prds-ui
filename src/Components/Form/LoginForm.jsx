import  {useState} from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginForm() {
  const [value, setValue] = useState('1');
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode);
  const commanTextField = {
    borderColor: 'black',
    '& label': {
      color: 'inherit', // Label color
    },
    '& label.Mui-focused': {
      color: 'inherit', // Focused label color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit', // Default border
      },
      '&:hover fieldset': {
        borderColor: 'inherit', // Hover border
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit', // Focused border
      },
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '80vh',
        margin: '2%',
      }}
    >
      <Box sx={{ margin: '2%', width: {xs: '100%', md: '40%'}, height: {xs: '60%', md: '80%'},
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"}}>
        <TabContext value={value}>
          <Box
            // sx={{ borderBottom: 1, color: 'inherit', borderColor: 'divider' }}
            sx={{
              color: 'inherit',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'lightblue',
              borderRadius: '10px',
            }}
          >
            <TabList
              onChange={handleChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'full-size-kana',
                  fontWeight: 'bold',
                  color: 'inherit',
                  '&.Mui-selected': {
                    color: 'inherit',
                    backgroundColor: isLightMode? 'white': 'black',
                    borderRadius: '5px'

                  },
                },
              }}
            >
              <Tab label="Sign in " value="1" />
              <Tab label="Sign up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  m: 1,
                  width: '100%',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Email Id"
                defaultValue=""
                sx={commanTextField}
              />
              <TextField
                id="outlined-password-input"
                required
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={commanTextField}
              />
              <Box
                width="100%"
                sx={{
                  display: 'flex',
                  gap: 1,
                  margin: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: {xs: 'wrap'}
                }}
              >
                <Button
                  width="50%"
                  variant="contained"
                  size="medium"
                  color="success"
                >
                  Login
                </Button>
                <Button
                  width="50%"
                  variant="contained"
                  size="medium"
                  color="error"
                >
                  Reset Password
                </Button>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log('JWT Token:', credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
