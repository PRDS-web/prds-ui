import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Box, Card} from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(173, 216, 230, 0.6)',
        color: 'black',
        p: 6,
        marginTop: '3%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Card
        variant='elevation'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'inherit',
          padding: '50px',
        }}
      >
        <Grid container spacing={11}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pradetra is the flagship service brand of PRDS Enterprises Pvt. Ltd.,
            </Typography>
            <Typography variant="body2" color="text.secondary">
              focused on delivering high-quality digital operations support to global businesses.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our core services include Data Collection, Manual QA Testing, 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Annotation, Transcription,
              Translation & Localization, and LLM Support Services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{marginTop: 1, fontWeight: 'bold'}}>
              Mohit Mishra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold'}}>
              Director, Pradetra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontWeight: 'bold'}}>
              A PRDS Enterprises Company
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontWeight: 'bold'}}>
              Email: <Link href="mailto:contact@pradetra.com" sx={{color: 'inherit'}}>contact@pradetra.com</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
      </Card>
      <Box
        mt={2}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://prds-ui.vercel.app/">
            PRDS Website
          </Link>
          {' ' + new Date().getFullYear().toString() + '.'}
        </Typography>
      </Box>
    </Box>
  );
}
