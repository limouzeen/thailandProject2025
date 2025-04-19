import { Box, Button, Typography, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import waterImg from '../assets/water.jpg';
import ThemedFooterAlt from "../components/ThemedFooterAlt";
import { useNavigate } from 'react-router-dom';



const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(0,188,212,0.2); }
  50% { box-shadow: 0 0 20px rgba(0,188,212,0.5); }
`;

export default function CategorySection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        py: 10,
        m: 0,
        
        px: { xs: 3, md: 10 },
        textAlign: 'center',
        background: 'linear-gradient(to bottom,rgb(4, 15, 29),rgb(5, 28, 48))',
        // background: 'linear-gradient(145deg,rgb(6, 28, 44), #021c2b,rgb(7, 35, 49),rgb(10, 33, 53))',
        // color: '#e0f7fa',
        // background: 'linear-gradient(to bottom,rgb(6, 19, 37),rgb(5, 21, 32),rgb(5, 13, 36),rgb(7, 25, 59))',
        // background: 'linear-gradient(to right, #03141f,rgb(4, 41, 59),rgb(2, 29, 34) ,rgb(7, 73, 85))',
        // background: 'linear-gradient(to bottom,rgb(4, 18, 26),rgb(5, 14, 32),rgb(4, 18, 44),rgb(13, 39, 63))',
        
        position: 'relative',
        isolation: 'isolate',



        animation: `${fadeIn} 1.2s ease-in-out`,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{
          textShadow: '0 0 14px rgba(0,196,255,0.4)',
          letterSpacing: 1.2,
        }}
      >
        Explore Categories
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mt: { xs: 4, md: 6 }, mb: 6, maxWidth: 800, mx: 'auto',  rowGap: 2  }}

      >
        <Button variant="outlined" sx={categoryButtonStyle} onClick={() => console.log('Search')}>Search</Button>
        <Button variant="outlined" sx={categoryButtonStyle} onClick={() => console.log('Filter')}>Filter</Button>
        <Button variant="outlined" sx={categoryButtonStyle} onClick={() => console.log('Sort')}>Sort</Button>
        <Button variant="outlined" sx={categoryButtonStyle} onClick={() => console.log('Discover')}>Discover</Button>
        <Button variant="outlined" sx={categoryButtonStyle} onClick={() => console.log('Connect')}>Connect</Button>
      </Stack>

      <Typography
        variant="h6"
        sx={{ color: '#b0bec5', mb: 3, maxWidth: 700, mx: 'auto' }}
      >
        Browse through a variety of travel images uploaded by users worldwide.
      </Typography>

      <Box
        component="img"
        src={waterImg}
        alt="featured"
        sx={{
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          borderRadius: '32px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
          transition: 'transform 0.4s ease',
          '&:hover': {
            transform: 'scale(1.025)',
          },
        }}
      />

      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          sx={{
            color: '#ffffff',
            borderColor: '#ffffff',
            px: 6,
            py: 1.4,
            borderRadius: '32px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            backdropFilter: 'blur(4px)',
            // animation: `${pulseGlow} 3s ease-in-out infinite`,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
              boxShadow: '0 0 18px rgba(255,255,255,0.3)',
              borderColor: '#ffffff',
            },
          }}
          onClick={() => navigate('/explore')}
        >
          Explore
        </Button>
      </Box>
      <ThemedFooterAlt/>
    </Box>
  );
}

const categoryButtonStyle = {
  color: '#ffffff',
  borderColor: '#ffffff',
  px: 4,
  py: 1.3,
  borderRadius: '30px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    borderColor: '#ffffff',
    boxShadow: '0 0 14px rgba(255,255,255,0.3)',
  },
};
