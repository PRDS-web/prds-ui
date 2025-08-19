import {
  Box,
  Card,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: 'lightblue', py: 6, px: 2, mx: 'auto' }}>
      <Card
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          p: 4,
          textAlign: 'center',
          borderRadius: 4,
          backgroundColor: theme.palette.mode == 'dark' ? 'black' : 'white',
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{display: 'flex', alignContent: 'center',justifyContent: 'start'}}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Pradetra
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign={'start'}>
              Pradetra is the flagship service brand and We focused on delivering high-quality digital operations support to global businesses.
              Our core services include Data Collection, Manual QA Testing,  Annotation, Transcription,
              Translation & Localization, and LLM Support Services.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/home" underline="none" color="text.primary">
                Home
              </Link>
              <Link href="/service" underline="none" color="text.primary">
                Services
              </Link>
              <Link href="/about" underline="none" color="text.primary">
                About
              </Link>
              <Link href="#" underline="none" color="text.primary">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton>
                <Facebook
                  sx={{
                    color: theme.palette.mode == 'dark' ? 'white' : 'black',
                  }}
                />
              </IconButton>
              <IconButton>
                <Twitter
                  sx={{
                    color: theme.palette.mode == 'dark' ? 'white' : 'black',
                  }}
                />
              </IconButton>
              <IconButton href='https://www.linkedin.com/company/pradetra'>
                <LinkedIn
                  sx={{
                    color: theme.palette.mode == 'dark' ? 'white' : 'black',
                  }}
                />
              </IconButton>
              <IconButton>
                <Instagram
                  sx={{
                    color: theme.palette.mode == 'dark' ? 'white' : 'black',
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Pradetra. All rights reserved.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
