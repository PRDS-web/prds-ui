import {useEffect, useState} from 'react';
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
import ForgotPassword from './ForgotPassword';
import MuiContainer from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import {
  OAuthifyProvider,
  GitHubLoginButton,
  GoogleLoginButton,
  GoogleIcon,
  GithubIcon,
  useOAuthify,
} from 'oauthify';
import { CircularProgress, Backdrop, Alert,Snackbar } from '@mui/material';
import { Navigate } from 'react-router';
import { fetchUsersAsync } from '../../Slice/UserLoginSlice';

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

export default function LoginForm() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { onSuccess, onFailure } = useOAuthify();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

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
  useEffect(() => {
    // console.log(onSuccess);
    if (onSuccess == 'undefined' || onSuccess == null) return;
    async function handleAuthRedirect() {
      setLoading(true);
      setRedirect(false);
      dispatch(fetchUsersAsync(onSuccess.code));
      await new Promise((res) => setTimeout(res, 1000));
      setLoading(false);
      setRedirect(true);
      
    }
    handleAuthRedirect();
  }, [onSuccess,dispatch]);
  useEffect(() => {
    // console.log(onFailure)
    handleGoogleFailureLogin();
    setLoading(true);
       new Promise((res) => setTimeout(res, 1000));
      setLoading(false);
    if (onFailure == 'undefined' || onFailure == null) return;
    async function handleAuthRedirect() {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      setLoading(false);  
    }
    handleAuthRedirect();
  }, [onFailure]);
  // const handleGoogleSuccessLogin = (googleLoginInfo) =>{
  //   console.log(googleLoginInfo)
  // }

  const handleGoogleFailureLogin = () =>{
    // console.log(googleLoginInfo)
  }
  // const handleGithubLoginSuccess = (githubLoginInfo) =>{
  //   console.log(githubLoginInfo);
  // }
  // const handleGithubLoginFailure = (githubLoginInfo) => {
  //   console.log(githubLoginInfo);
  // }
  const handleClickOpen = (error) => {
    console.log(error);
    setOpen(true);
  };

  // React.useEffect(() => {
  //   handleGoogleSuccessLogin();
  // }, [onSuccess]);

  // React.useEffect(() => {
  //   handleFailure();
  // }, [onFailure]);
  const handleClose = (error) => {
    console.log(error);
    setOpen(false);
  };

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
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        {redirect && <Navigate to="/" />}
        <Snackbar
          open={loading}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
            Login Successful!
          </Alert>
        </Snackbar>

      </Backdrop>

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
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            redirectUri={`${window.location.origin}/oauthify-redirect`}
            // onSuccess={handleGoogleSuccessLogin}
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
              Sign in with Google
            </Box>
          </GoogleLoginButton>

          <GitHubLoginButton
            clientId={import.meta.env.VITE_GITHUB_CLIENT_ID}
              redirectUri="https://prds-ui.vercel.app/"
              // onSuccess={handleSuccess}
              // onFailure={handleFailure}
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
              Sign in with GitHub
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              {/* <FormLabel htmlFor="password">Password</FormLabel> */}
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ color: 'primery' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
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
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{
                  color: 'white',
                }}
              />
            }
            label="Remember me"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center', color: 'white' }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
