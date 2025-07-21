import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { resetIsError, resetIsSuccess } from '../../Slice/UserLoginSlice';
import {
  GitHubLoginButton,
  GoogleLoginButton,
  GoogleIcon,
  GithubIcon,
  useOAuthify,
} from 'oauthify';
import { CircularProgress, Backdrop, Alert, Snackbar } from '@mui/material';
import { Navigate } from 'react-router';
import { fetchUser } from '../../Slice/UserLoginSlice';

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
  const dispatch = useDispatch();
  const {
    isLoading,
    isRedirect,
    successMessage,
    isSuccess,
    errorMessage,
    isError,
  } = useSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(false);

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
      dispatch(fetchUser(onSuccess.code));
    }
    handleAuthRedirect();
  }, [onSuccess, dispatch]);

  // useEffect(() => {
  //   // // console.log(onFailure)
  //   // handleGoogleFailureLogin();
  //   // setLoading(true);
  //   //    new Promise((res) => setTimeout(res, 1000));
  //   //   setLoading(false);
  //   // if (onFailure == 'undefined' || onFailure == null) return;
  //   // async function handleAuthRedirect() {
  //   //   setLoading(true);
  //   //   await new Promise((res) => setTimeout(res, 1000));
  //   //   setLoading(false);
  //   // }
  //   // handleAuthRedirect();
  // }, [onFailure]);
  // const handleGoogleSuccessLogin = (googleLoginInfo) =>{
  //   console.log(googleLoginInfo)
  // }

  const handleGoogleFailureLogin = () => {
    // console.log(googleLoginInfo)
  };
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

  useEffect(() => {
    handleGoogleFailureLogin();
  }, [onFailure]);
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

  const handleOnClose = () => {
    if (isSuccess) {
      dispatch(resetIsSuccess());
    } else {
      dispatch(resetIsError());
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    if (isSignUp && password.value !== confirmPassword.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password does not match.');
      return false;
    }

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
    <Container maxWidth={false} sx={{ height: '100vh', overflowY: 'auto' }}>
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
            redirectUri={`${window.location.origin}/oauthify-redirect`}
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
            {!isSignUp && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ color: 'primary.main' }}
                >
                  Forgot your password?
                </Link>
              </Box>
            )}
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
           {isSignUp && <FormControl><TextField
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
          /></FormControl>}
          {!isSignUp && (
            <>
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
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            {isSignUp
              ? 'Already have an account? '
              : `Don't have an account? `}
            <span>
              <Link
                //href="/signup"
                component="button"
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
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
