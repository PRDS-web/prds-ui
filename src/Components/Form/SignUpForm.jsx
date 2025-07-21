import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import {
  OAuthifyProvider,
  GitHubLoginButton,
  GoogleLoginButton,
  GoogleIcon,
  GithubIcon,
} from 'oauthify';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  color: 'white',
  boxShadow:
    'hsla(180, 90%, 15%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(189, 63%, 6%, 0.50) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
  ...theme.applyStyles('light', {
    boxShadow:
      'hsla(189, 86%, 20%, 0.50) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    backgroundColor: '#085457cf',
  }),
}));

const Container = styled(MuiContainer)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: 'lightBlack',
  }),
  ...theme.applyStyles('light', {
    backgroundColor: '#056269',
  }),
}));

export default function SignUpForm() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const commanTextField = {
    '& label': {
      color: 'white', // Label color
    },
    '& label.Mui-focused': {
      color: 'inherit', // Focused label color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Default border
      },
      '&:hover fieldset': {
        borderColor: 'white', // Hover border
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Focused border
      },
      '& input': {
        color: 'white', // Text color while typing
      },
    },
  };

  const handleGoogleSuccessLogin = (googleLoginInfo) => {
    console.log(googleLoginInfo);
  };
  const handleGoogleFailureLogin = (googleLoginInfo) => {
    console.log(googleLoginInfo);
  };
  const handleGithubLoginSuccess = (githubLoginInfo) => {
    console.log(githubLoginInfo);
  };
  const handleGithubLoginFailure = (githubLoginInfo) => {
    console.log(githubLoginInfo);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Container maxWidth={false} sx={{ height: '100vh' }}>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: '100%',
            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Welcome To PRDS
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            color: 'white',
            backgroundColor: 'inherit',
          }}
        >
          <GoogleLoginButton
            clientId="878291443758-klfu3caf4hnvj23vu5i5lgfj93g8gsh9.apps.googleusercontent.com"
            redirectUri="http://localhost:5173/"
            onSuccess={handleGoogleSuccessLogin}
            onFailure={handleGoogleFailureLogin}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: 2,
                height: '37px',
                alignItems: 'center',
                alignContent: 'space-between',
                justifyContent: 'center',
                color: 'inherit',
                backgroundColor: 'inherit',
                cursor: 'pointer',
              }}
            >
              <GoogleIcon size={16} />
              Sign up with Google
            </Box>
          </GoogleLoginButton>

          <GitHubLoginButton
            clientId={import.meta.env.VITE_GITHUB_CLIENT_ID}
            redirectUri="http://localhost:5173/"
            onSuccess={handleGithubLoginSuccess}
            onFailure={handleGithubLoginFailure}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: 2,
                height: '37px',
                alignItems: 'center',
                alignContent: 'space-between',
                justifyContent: 'center',
                color: 'inherit',
                backgroundColor: 'inherit',
                cursor: 'pointer',
              }}
            >
              <GithubIcon size={16} />
              Sign up with GitHub
            </Box>
          </GitHubLoginButton>
        </Box>
        <Divider>or</Divider>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              label="Email Id"
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={commanTextField}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              sx={commanTextField}
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              sx={commanTextField}
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            You already have an account?{' '}
            <span>
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center', color: 'white' }}
              >
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
