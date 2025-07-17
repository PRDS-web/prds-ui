import { Container, Box, Grid, Card,CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';

export default function Service() {
  return (
    <Container component="main" sx={{ width: '100%' }}>
      <Box
        component="p"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.7rem',
          padding: '20px'
        }}
      >
        What we offer
      </Box>
      <Grid container spacing={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={4} key={index} >
            <Card sx={{ maxWidth: 300 , height: '89%'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300hv"
                  image="https://wallpapers.com/images/hd/spiderman-candid-zi96tx7tphmj5vc1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
