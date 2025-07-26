import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BGIMG from '../../assets/BgImg.jpeg';
import BGIMG_Dark from '../../assets/dark-mode.png';
import { GithubIcon, GoogleIcon } from 'oauthify';
import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import ForgotPassword from './ForgotPassword.jsx';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import OAuth2Login from 'react-simple-oauth2-login';

import {
  fetchUser,
  resetIsError,
  resetIsSuccess,
  signInUser,
  registerUser,
} from '../../Slice/UserLoginSlice';

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const {
    isLoading,
    isSuccess,
    isError,
    isRedirect,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.user);

  const resetForm = () => {
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage('');
  };
  const validateInputs = (event) => {
    event.preventDefault();
    // if (!emailId || !/\S+@\S+\.\S+/.test(emailId)) {
    //   setEmailError(true);
    //   setEmailErrorMessage('Please enter valid email id');
    // } else {
    //   setEmailError(false);
    //   setEmailErrorMessage('');
    // }
    // if (!password || password.length < 8) {
    //   setPasswordError(true);
    //   setPasswordErrorMessage('Please enter valid password');
    // } else {
    //   setPasswordError(false);
    //   setPasswordErrorMessage('');
    // }
    // if (isSignUp && (!confirmPassword || confirmPassword != password)) {
    //   setConfirmPasswordError(true);
    //   setConfirmPasswordErrorMessage('Password can not be different and Empty');
    // } else {
    //   setConfirmPasswordError(false);
    //   setConfirmPasswordErrorMessage('');
    // }
    // if (emailError || passwordError || (isSignUp && confirmPasswordError)) {
    //   return false;
    // }
    handleSubmit()
    return true;
  };
  const handleSubmit = () => {
   // e.preventDefault();
    // if (emailError || passwordError || (isSignUp && confirmPasswordError)) {
    //   return;
    // }
    //const data = new FormData(event.currentTarget);
    if(isSignUp) {
      dispatch(registerUser({
        email: emailId,
        password,
        confirmPassword,
      }));
    }else{
      dispatch(signInUser({
        email: emailId,
        password,
      }));
    }
  };
  const login = useGoogleLogin({
    ux_mode: 'popup',
    access_type: 'offline',
    onSuccess: (tokenResponse) => {
      const userInfo = {
        code: tokenResponse.code,
        type: 'google',
      };
      dispatch(fetchUser(userInfo));
    },
    flow: 'auth-code',
  });
  const handleOnClose = () => {
    if (isSuccess) {
      dispatch(resetIsSuccess());
    } else {
      dispatch(resetIsError());
    }
  };
  const commanTextField = {
    '& label': {
      color: mode == 'dark' ? 'white' : 'black',
    },
    '& label.Mui-focused': {
      color: mode == 'dark' ? 'white' : 'black', // Focused label color
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: mode == 'dark' ? 'white' : 'black', // Focused border
      },
    },
  };

  return (
    <Container
      component="main"
      disableGutters
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage:
          mode == 'dark' ? `url(${BGIMG_Dark})` : `url(${BGIMG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
      <Card
        variant="outlined"
        elevation={8}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 8,
          width: ['80%', '80%', '40%'],
          height: 'auto',
          mx: 'auto',
          color: 'transparent',
          marginTop: '1.2%',
          boxShadow:
            mode == 'dark'
              ? '1px 20px 73px 19px rgba(76, 138, 204, 0.17)'
              : '15px 15px 15px 10px rgba(96, 90, 90, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // borderTopColor: '#ee9891ff',
          // borderBottomColor: '#ffffff',
          flexDirection: 'column',
        }}
      >
        <Typography
          component={'p'}
          fontWeight={800}
          fontSize={isMobile ? '1.8rem' : '2.4rem'}
          color={mode == 'dark' ? 'white' : 'black'}
        >
          Welcome To PRDS
        </Typography>
        <Box width="100%" flex>
          <Box
            mb={3}
            sx={{
              display: 'flex',
              gap: '30px',
              ml: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={() => login()}
              sx={{
                bgcolor: 'white',
                borderRadius: isMobile ? '50px' : '20px',
                px: !isMobile ? 4 : 'none',
                py: !isMobile ? 1.5 : 'none',
                color: 'black',
                boxShadow: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                gap: 1,
                mt: 4,
                variant: 'body2',
              }}
            >
              <GoogleIcon size={isMobile ? 45 : 0} />
              {!isMobile && (
                <Typography
                  component={'p'}
                  fontWeight="bold"
                  fontSize={'0.9rem'}
                >
                  Google Sign in
                </Typography>
              )}
            </Button>
            <OAuth2Login
              authorizationUrl={import.meta.env.VITE_GITHUB_AUTH_URL}
              clientId={import.meta.env.VITE_GITHUB_CLIENT_ID}
              redirectUri={window.location.origin + '/login'}
              responseType="code"
              scope="read:user user:email"
              onSuccess={({ code }) =>
                dispatch(
                  fetchUser({
                    code,
                    type: 'github',
                  })
                )
              }
              onFailure={(err) => console.error(err)}
              render={({ onClick }) => (
                <Button
                  variant="contained"
                  onClick={onClick}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: isMobile ? '50px' : '20px',
                    px: !isMobile ? 4 : 'none',
                    py: !isMobile ? 1.5 : 'none',
                    boxShadow: 2,
                    gap: 1,
                    textTransform: 'none',
                    mt: 4,
                  }}
                >
                  <GithubIcon size={isMobile ? 45 : 0} />
                  {!isMobile && (
                    <Typography
                      component={'p'}
                      fontWeight="bold"
                      fontSize={'0.9rem'}
                    >
                      Github Sign in
                    </Typography>
                  )}
                </Button>
              )}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: '10px',
            }}
          >
            <Box
              sx={{
                width: '100px',
                height: '1px',
                backgroundColor: 'gray',
                mt: '0px',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: mode == 'dark' ? 'white' : 'black',
              }}
            >
              OR
            </Typography>
            <Box
              sx={{
                width: '100px',
                height: '1px',
                backgroundColor: 'gray',
              }}
            />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
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
                onChange={(e) => setEmailId(e.target.value)}
                value={emailId}
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
                    // onClick={handleClickOpen}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={commanTextField}
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            {isSignUp && (
              <FormControl>
                <TextField
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="••••••"
                  type="password"
                  id="ConfirmPassword"
                  autoComplete="current-password"
                  autoFocus
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  sx={commanTextField}
                  variant="outlined"
                  color={confirmPasswordError ? 'error' : 'primary'}
                />
              </FormControl>
            )}
            {!isSignUp && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          color: mode == 'dark' ? 'white' : 'black', // checked color
                        },
                        '&.Mui-checked': {
                          color: mode == 'dark' ? 'white' : 'black', // checked color
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: mode == 'dark' ? 'white' : 'black', // checked color
                    },
                    '&.Mui-checked': {
                      color: mode == 'dark' ? 'white' : 'black', // checked color
                    },
                  }}
                />
                <ForgotPassword
                  open={false} //handleClose={handleClose}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              onClick={validateInputs}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            <Typography
              sx={{
                textAlign: 'center',
                color: mode == 'dark' ? 'white' : 'black',
              }}
            >
              {isSignUp ? `Already have an account?` : `Don't have an account?`}
              <Button
                component="button"
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                }}
                variant="body2"
                sx={{
                  alignSelf: 'center',
                  color: 'inherit',
                  padding: '1px',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'black',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                {!isSignUp ? 'Sign up' : 'Login'}
              </Button>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
