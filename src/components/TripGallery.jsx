import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';

import floatingImg from '../assets/floating-market.jpg';
import beachImg from '../assets/kohsamui.jpg';
import templeImg from '../assets/chiangrai.jpg';
import ThemedFooterAlt from '../components/ThemedFooterAlt';

const trips = [
  { title: 'Floating Market Adventure', location: 'Ratchaburi', image: floatingImg },
  { title: 'Beach Escape', location: 'Koh Samui', image: beachImg },
  { title: 'Golden Temple Journey', location: 'Chiang Rai', image: templeImg },
];

const fadeGlow = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
  50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
`;

export default function TripGallery() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        mt: -10,
        py: 10,
        mb: -12,
        background: 'linear-gradient(to bottom, rgb(3, 14, 29), rgb(3, 14, 29), rgba(5, 29, 48, 0.92), rgb(6, 23, 44))',
        color: '#e0f7fa',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={6}
        sx={{
          textShadow: '0 0 14px rgba(0,196,255,0.4)',
          letterSpacing: 1.2,
          color: '#e0f7fa'
        }}
      >
        Memorable Trips
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {trips.map((trip, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.03)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.06)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                animation: `${fadeGlow} 6s ease-in-out infinite`,
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(0,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              <CardMedia
                component="img"
                image={trip.image}
                height="220"
                alt={trip.title}
                sx={{
                  objectFit: 'cover',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  filter: 'brightness(0.9) contrast(1.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    filter: 'brightness(1.05) contrast(1.2)'
                  }
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: '#e0ffff',
                    textShadow: '0 0 10px rgba(0,255,255,0.15)',
                    letterSpacing: 0.5,
                    fontSize: '1.15rem'
                  }}
                >
                  {trip.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                  {trip.location}
                </Typography>
              </CardContent>
              <Stack spacing={2} direction="row" sx={{ p: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontWeight: 'bold',
                    borderRadius: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
              boxShadow: '0 0 18px rgba(255,255,255,0.3)',
              borderColor: '#ffffff',
            },
                  }}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: 'rgba(0, 187, 212, 0.03)',
                    color: '#e0f7fa',
                    fontWeight: 'bold',
                    borderRadius: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0, 187, 212, 0.05)',
                      boxShadow: '0 0 14px rgba(0, 255, 255, 0.05)'
                    }
                  }}
                >
                  Comment
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ThemedFooterAlt />
    </Box>
  );
}
