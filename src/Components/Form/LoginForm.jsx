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
  IconButton,
  Tooltip,
} from '@mui/material';
import BGIMG from '../../assets/BgImg.jpeg';
import BGIMG_Dark from '../../assets/dark-mode.png';
import { GithubIcon, GoogleIcon } from 'oauthify';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import ForgotPassword from './ForgotPassword.jsx';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import OAuth2Login from 'react-simple-oauth2-login';
import SunnyIcon from '@mui/icons-material/Sunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';

import {
  fetchUser,
  resetIsError,
  resetIsSuccess,
  signInUser,
  registerUser,
} from '../../Slice/UserLoginSlice';
import { enableLightMode, disableLightMode } from '../../Slice/DarkLightSlice';
import { ArrowBack } from '@mui/icons-material';

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
  const [isOpen, setIsOpen] = useState(false);
  const handlePasswordOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
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

  const handleThemeToggle = () => {
    if (mode === 'light') {
      dispatch(disableLightMode());
    } else {
      dispatch(enableLightMode());
    }
  };

  const validateInputs = (event) => {
    event.preventDefault();
    if (!emailId || !/\S+@\S+\.\S+/.test(emailId)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter valid email id');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter valid password');
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (isSignUp && (!confirmPassword || confirmPassword != password)) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Password can not be different and Empty');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }
    if (emailError || passwordError || (isSignUp && confirmPasswordError)) {
      return false;
    }
    handleSubmit();
    return true;
  };
 // Reset form when sign up is toggled
  useEffect(() => {
    if(isSignUp && isSuccess){
      resetForm();
      setIsSignUp(false);
    }
  }, [isSignUp, isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || passwordError || (isSignUp && confirmPasswordError)) {
      return;
    }
    if (isSignUp) {
      dispatch(
        registerUser({
          email: emailId,
          password,
          confirmPassword,
        })
      );
    } else {
      dispatch(
        signInUser({
          email: emailId,
          password,
        })
      );
    }
  };
  const login = useGoogleLogin({
    ux_mode: 'popup',
    auto_select: true,
    onSuccess: (tokenResponse) => {
      const userInfo = {
        code: tokenResponse.code,
        type: 'google',
      };
      dispatch(fetchUser(userInfo));
    },
    flow: 'auth-code',
  });
  const handleBack = () => {
    window.history.back();
  };
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
        minHeight: '100vh',
        backgroundImage:
          mode == 'dark' ? `url(${BGIMG_Dark})` : `url(${BGIMG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Theme Toggle Button - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 10,
        }}
      >
        <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
          <IconButton
            onClick={handleThemeToggle}
            sx={{
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              color: mode === 'dark' ? 'white' : 'black',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {mode === 'light' ? <ModeNightIcon /> : <SunnyIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Back Button - Top Left */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          zIndex: 10,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            color: mode === 'dark' ? 'white' : 'black',
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              transform: 'scale(1.02)',
            },
            transition: 'all 0.3s ease',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          {!isMobile && 'Back'}
        </Button>
      </Box>

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

      {/* Main Card */}
      <Card
        variant="outlined"
        elevation={8}
        sx={{
          p: { xs: 2, sm: 3, md: 4, lg: 5 },
          borderRadius: { xs: 4, sm: 6, md: 8 },
          width: { 
            xs: '90%', 
            sm: '85%', 
            md: '70%', 
            lg: '50%', 
            xl: '40%' 
          },
          maxWidth: '500px',
          height: 'auto',
          mx: 'auto',
          color: 'transparent',
          marginTop: { xs: '15%', sm: '12%', md: '8%', lg: '5%' },
          boxShadow:
            mode == 'dark'
              ? '1px 20px 73px 19px rgba(76, 138, 204, 0.17)'
              : '15px 15px 15px 10px rgba(96, 90, 90, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <Typography
          component={'h1'}
          fontWeight={800}
          fontSize={{ 
            xs: '1.5rem', 
            sm: '1.8rem', 
            md: '2.2rem', 
            lg: '2.4rem' 
          }}
          color={mode == 'dark' ? 'white' : 'black'}
          textAlign="center"
          mb={2}
        >
          Welcome To PRDS
        </Typography>

        <Box width="100%">
          {/* OAuth Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={() => login()}
              sx={{
                bgcolor: 'white',
                borderRadius: '20px',
                px: 4,
                py: 1.5,
                color: 'black',
                boxShadow: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                gap: 1,
                mt: 4,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.3s ease',
              }}
            >
              <GoogleIcon size={25} />
              <Typography
                component={'p'}
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Google Sign in
              </Typography>
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
                    borderRadius: '20px',
                    px: 4,
                    py: 1.5,
                    boxShadow: 2,
                    gap: 1,
                    textTransform: 'none',
                    mt: 4,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <GithubIcon size={25} />
                  <Typography
                    component={'p'}
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{
                      display: { xs: 'none', sm: 'block' }
                    }}
                  >
                    Github Sign in
                  </Typography>
                </Button>
              )}
            />
          </Box>

          {/* Divider */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: '60px', sm: '80px', md: '100px' },
                height: '1px',
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: mode == 'dark' ? 'white' : 'black',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              OR
            </Typography>
            <Box
              sx={{
                width: { xs: '60px', sm: '80px', md: '100px' },
                height: '1px',
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              }}
            />
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, sm: 2 },
              width: '100%',
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
                sx={{
                  ...commanTextField,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: { xs: 2, sm: 3 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  },
                }}
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
                    mb: 1,
                  }}
                >
                  <Link
                    component="button"
                    type="button"
                    onClick={handlePasswordOpen}
                    variant="body2"
                    sx={{ 
                      color: 'primary.main',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    }}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{
                  ...commanTextField,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: { xs: 2, sm: 3 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  },
                }}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  sx={{
                    ...commanTextField,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: { xs: 2, sm: 3 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                  }}
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
                          color: mode == 'dark' ? 'white' : 'black',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        },
                        '&.Mui-checked': {
                          color: mode == 'dark' ? 'white' : 'black',
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: mode == 'dark' ? 'white' : 'black',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    '&.Mui-checked': {
                      color: mode == 'dark' ? 'white' : 'black',
                    },
                  }}
                />
                <ForgotPassword
                  open={isOpen}
                  handleClose={handleClose}
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
                borderRadius: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.3s ease',
              }}
              onClick={validateInputs}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>

            <Typography
              sx={{
                textAlign: 'center',
                color: mode == 'dark' ? 'white' : 'black',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                mt: 1,
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
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  fontWeight: 600,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: mode === 'dark' ? 'white' : 'black',
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
