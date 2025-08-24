import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  useTheme,
  Autocomplete,
  Backdrop,
  Snackbar,
  CircularProgress,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactUser, resetIsError, resetIsSuccess } from '../../Slice/EnquirySlice';

const Contact = (props, ref) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { isLoading, errorMessage, successMessage, isSuccess, isError } =
    useSelector((state) => state.enquiry);
  const dispatch = useDispatch();

  // Helper function to prevent multiple consecutive spaces
  const preventMultipleSpaces = (value) => {
    return value.replace(/\s{2,}/g, ' ');
  };

   const handleOnClose = () => {
      if (isSuccess) {
        dispatch(resetIsSuccess());
      } else {
        dispatch(resetIsError());
      }
    };

  // List of countries for the dropdown
  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    message: '',
  });
  const [formError, setFormErrorData] = useState({
    nameError: false,
    emailError: false,
    companyError: false,
    countryError: false,
    messageError: false,
  });
  const [formErrorMessage, setFormErrorMessage] = useState({
    nameError: '',
    emailError: '',
    companyError: '',
    countryError: '',
    messageError: '',
  });
  const comman = {
    mb: 2,
    borderRadius: 2,
    '& label.Mui-focused': {
      color: mode == 'dark' ? 'white' : 'black', // Focused label color
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: mode == 'dark' ? 'white' : 'black', // Focused border
      },
    },
  };
  const handleSubmit = () => {
    console.log(formData);
    if (
      formData.name === '' &&
      formData.email === '' &&
      formData.company === '' &&
      formData.country === '' &&
      formData.message === ''
    ) {
      setFormErrorMessage({
        nameError: 'Name can not be empty',
        emailError: 'Email Id can not be empty',
        companyError: 'Company can not be empty',
        countryError: 'Country can not be empty',
        messageError: 'Message can not be empty',
      });
      setFormErrorData({
        nameError: true,
        emailError: true,
        companyError: true,
        countryError: true,
        messageError: true,
      });
      return;
    }
    if (formData.message.split(' ').length < 25) {
      setFormErrorMessage((prev) => {
        return {
          ...prev,
          messageError: 'Message must be at least 25 characters long',
        };
      });
      setFormErrorData((prev) => {
        return {
          ...prev,
          messageError: true,
        };
      });
    }
    if (
      formData.email.length > 0 &&
      !/\S+@\S+\.\S+/.test(formData.email) &&
      !formData.email.includes('.')
    ) {
      setFormErrorMessage((prev) => {
        return {
          ...prev,
          emailError: 'Please enter a valid email address',
        };
      });
      setFormErrorData((prev) => {
        return {
          ...prev,
          emailError: true,
        };
      });
    }
    if (formData.country.length < 3) {
      setFormErrorMessage((prev) => {
        return {
          ...prev,
          countryError: 'Country must be at least 3 characters long',
        };
      });
      setFormErrorData((prev) => {
        return {
          ...prev,
          countryError: true,
        };
      });
    }
    if (formData.company.length < 3) {
      setFormErrorMessage((prev) => {
        return {
          ...prev,
          companyError: 'Company must be at least 3 characters long',
        };
      });
      setFormErrorData((prev) => {
        return {
          ...prev,
          companyError: true,
        };
      });
    }
    if (
      formData.nameError ||
      formData.emailError ||
      formData.companyError ||
      formData.countryError ||
      formData.messageError
    ) {
      return;
    }
    dispatch(contactUser(formData));
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        ref={ref}
        sx={{
          bgcolor: theme.palette.background.default,
          width: '100%',
          minHeight: 'auto',
          py: 6,
        }}
      >
        <Box
          sx={{
            color: 'white',
            px: { xs: 0, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h2"
              sx={{
                textShadow: theme.shadows[10],
                color: theme.palette.text.primary,
                fontWeight: 800,
                fontSize: ['2.4rem', '3.5rem'],
                mb: 2,
                textAlign: 'center',
              }}
            >
              Contact us
            </Typography>
            <IconButton
              sx={{
                bgcolor: '#222',
                mb: 2,
                ml: 2,
                backgroundColor:
                  theme.palette.mode === 'light' ? '#0f7792ff' : '#0e5b6eff',
              }}
            >
              <EmailIcon sx={{ fontSize: 36, color: '#b1c5caff' }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: ['column', 'column', 'row'],
            }}
          >
            <Box
              sx={{
                width: ['80%', '100%'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                color={'#8DBCC7'}
                fontWeight="bold"
                sx={{ fontSize: { xs: 16, lg: 25 } }}
                mb={3}
              >
                Your goals. Our mission. Let's connect.
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  fontSize: { sm: '0.7rem', md: '1rem', lg: '1.1rem' },
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  width: '80%',
                }}
              >
                Every great partnership starts with a hello. Ready to bring your
                vision to life? We’re just one message away.
              </Typography>
              <Box
                sx={{ mb: 3 }}
                height={{ xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
                width={{ xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
              >
                <DotLottieReact
                  src="https://lottie.host/9ebe4497-34ec-40ce-84b4-356bb69b32c6/Ujz5P4JXib.lottie"
                  loop
                  autoplay
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#90caf9',
                    textAlign: 'center',
                    fontSize: { sm: '14px', xs: '12px', md: '17px' },
                    fontWeight: 'bold',
                  }}
                >
                  <Typography
                    sx={{ color: '#90caf9' }}
                    fontSize={{ sm: '14px', xs: '12px', md: '17px' }}
                    component="a"
                    href="mailto:contact@pradetra.com"
                  >
                    contact@pradetra.com{' '}
                  </Typography>{' '}
                  &nbsp; | &nbsp; +91 9103808150 &nbsp; | &nbsp;{' '}
                  <Typography
                    sx={{ color: '#90caf9' }}
                    fontSize={{ sm: '14px', xs: '12px', md: '17px' }}
                    component="a"
                    href="https://www.linkedin.com/company/pradetra"
                  >
                    LinkedIn@pradetra{' '}
                  </Typography>
                </Typography>
              </Box>
            </Box>

            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 6,
                maxWidth: '100%',
                mx: 'auto',
                marginTop: 2,
                boxShadow:
                  theme.palette.mode == 'dark'
                    ? '1px 20px 73px 19px rgba(76, 138, 204, 0.17)'
                    : '0 4px 32px rgba(0,0,0,0.5)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.15) 100%)',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (e.target.value.length > 0) {
                    setFormErrorData({ ...formError, nameError: false });
                    setFormErrorMessage({ ...formErrorMessage, nameError: '' });
                  } else {
                    setFormErrorData({ ...formError, nameError: true });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      nameError: 'Name can not be empty',
                    });
                  }
                }}
                label="Full Name"
                placeholder="Your Name"
                sx={comman}
                required
                error={formError.nameError}
                helperText={formErrorMessage.nameError}
              />
              <TextField
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (e.target.value.length > 0) {
                    setFormErrorData({ ...formError, emailError: false });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      emailError: '',
                    });
                  } else {
                    setFormErrorData({ ...formError, emailError: true });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      emailError: 'Email Id can not be empty',
                    });
                  }
                }}
                label="Email Id"
                placeholder="your@email.com"
                sx={comman}
                required
                error={formError.emailError}
                helperText={formErrorMessage.emailError}
              />
              <TextField
                fullWidth
                variant="outlined"
                value={formData.company}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.includes('  ')) {
                    value = preventMultipleSpaces(value);
                  }
                  setFormData({ ...formData, company: value });
                  if (value.length > 0) {
                    setFormErrorData({ ...formError, companyError: false });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      companyError: '',
                    });
                  } else {
                    setFormErrorData({ ...formError, companyError: true });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      companyError: 'Company can not be empty',
                    });
                  }
                }}
                label="Company"
                placeholder="Your Company If not applicable Please Type NA"
                sx={comman}
                required
                error={formError.companyError}
                helperText={formErrorMessage.companyError}
              />
              <Autocomplete
                fullWidth
                options={countries}
                value={formData.country}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, country: newValue || '' });
                  if (newValue && newValue.length > 0) {
                    setFormErrorData({ ...formError, countryError: false });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      countryError: '',
                    });
                  } else {
                    setFormErrorData({ ...formError, countryError: true });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      countryError: 'Country can not be empty',
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    placeholder="Search and select your country"
                    required
                    error={formError.countryError}
                    helperText={formErrorMessage.countryError}
                    sx={comman}
                  />
                )}
                freeSolo={false}
                autoComplete
                autoHighlight
                clearOnBlur
                selectOnFocus
              />
              <TextField
                fullWidth
                multiline
                minRows={5}
                maxRows={7}
                value={formData.message}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.includes('  ')) {
                    value = preventMultipleSpaces(value);
                  }
                  setFormData({ ...formData, message: value });
                  if (value.length > 0) {
                    setFormErrorData({ ...formError, messageError: false });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      messageError: '',
                    });
                  } else {
                    setFormErrorData({ ...formError, messageError: true });
                    setFormErrorMessage({
                      ...formErrorMessage,
                      messageError: 'Message can not be empty',
                    });
                  }
                }}
                label="Message"
                variant="outlined"
                placeholder="Type your message here and atleast 25 words needed"
                sx={comman}
                required
                error={formError.messageError}
                helperText={formErrorMessage.messageError}
              />
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Message count:{' '}
                {formData.message.trim().split(' ')[0] == ''
                  ? 0
                  : formData.message.trim().split(' ').length}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  py: 1.2,
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                Submit
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default forwardRef(Contact);
