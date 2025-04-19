import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

import chiangmaiImg from '../assets/chiangmai.jpg';
import phuketImg from '../assets/phuket.jpg';
import bangkokImg from '../assets/bangkok.jpg';
import krabiImg from '../assets/krabi.jpg';
import ayutthayaImg from '../assets/ayutthaya.jpg';
import paiImg from '../assets/pai.jpg';
import ThemedFooterAlt from '../components/ThemedFooterAlt';

const destinations = [
  { name: 'Chiang Mai', image: chiangmaiImg },
  { name: 'Phuket', image: phuketImg },
  { name: 'Bangkok', image: bangkokImg },
  { name: 'Krabi', image: krabiImg },
  { name: 'Ayutthaya', image: ayutthayaImg },
  { name: 'Pai', image: paiImg },
];

const fadeGlow = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
  50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
`;

export default function DestinationGrid() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        mt: -10,
        background: 'linear-gradient(to top, rgb(4, 15, 29), rgb(5, 28, 48))',
        position: 'relative',
        paddingBottom: 1,
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
        Popular Destinations
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {destinations.map((place, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.03)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                animation: `${fadeGlow} 6s ease-in-out infinite`,
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(0,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={place.image}
                alt={place.name}
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
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: '#e0ffff',
                    textShadow: '0 0 10px rgba(0,255,255,0.15)',
                    letterSpacing: 0.5,
                    fontSize: '1.15rem'
                  }}
                >
                  {place.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
       
      </Grid>
      <ThemedFooterAlt/>
    </Box>
    
  );
}
