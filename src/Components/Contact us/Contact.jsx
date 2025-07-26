import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Contact(props) {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const comman = {
    mb: 2,
    borderRadius: 2,
    '& label.Mui-focused': {
      color: mode == 'dark'? 'white': 'black', // Focused label color
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor:  mode == 'dark'? 'white': 'black', // Focused border
      },
    }
  };
  
  return (
    <Box
      ref={props.ref}
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
            flexDirection: ['column', 'row'],
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
              
              sx={{fontSize:{xs: 16, lg: 25}}}
              mb={3}
            >
              Your goals. Our mission. Let's connect.
            </Typography>
            <Typography
              sx={{
                mb: 3,
                fontSize: {sm: '0.7rem',lg: '1.1rem'},
                color: theme.palette.text.primary,
                textAlign: 'center',
                width: '80%',
              }}
            >
              Every great partnership starts with a hello. Ready to bring your
              vision to life? We’re just one message away.
            </Typography>
            <Box sx={{ mb: 3 }}>
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
                  fontSize: '17px',
                  fontWeight: 'bold',
                }}
              >
                contact@pradetra.com &nbsp; | &nbsp; +1 (800) 123 XX21 &nbsp; |
                &nbsp; contact@pradetra.com
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 6,
              //bgcolor: theme.palette.mode=='dark':rgba(30,30,30,0.95)',
              //  color: 'white',
              maxWidth: '70%',
              mx: 'auto',
              marginTop: 2,
              boxShadow: theme.palette.mode == 'dark'? '1px 20px 73px 19px rgba(76, 138, 204, 0.17)': '0 4px 32px rgba(0,0,0,0.5)',
              backgroundImage:
                'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.15) 100%)',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Full Name"
              placeholder="Your Name"
              sx={comman}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email Id"
              placeholder="your@email.com"
              sx={comman}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Company"
              placeholder="Your Company"
              sx={comman}
            />
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Message"
              variant="outlined"
              placeholder="Type your message here"
              sx={comman}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
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
  );
}
