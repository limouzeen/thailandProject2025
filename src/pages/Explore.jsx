// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Container } from '@mui/material';
// import { keyframes } from '@emotion/react';
// import explore1 from '../assets/explore1.jpg';
// import explore2 from '../assets/explore2.jpg';
// import explore3 from '../assets/explore3.jpg';

// const fadeGlow = keyframes`
//   0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
//   50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
// `;

// const exploreData = [
//   {
//     title: 'Golden Lion',
//     location: 'Mae Hong Son',
//     image: explore1,
//   },
//   {
//     title: 'Beachside Bliss',
//     location: 'Pattaya',
//     image: explore2,
//   },
//   {
//     title: 'Golden Temple Journey',
//     location: 'Ayutthaya',
//     image: explore3,
//   },a
// ];

// export default function Explore() {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         px: { xs: 2, md: 6 },
//         py: 10,
//         background: 'linear-gradient(to top, #010a14, #081c2f)',
//         color: '#e0f7fa',
//         textAlign: 'center',
//         overflow: 'hidden',
//         display: 'flex',
//         justifyContent: 'center',
//       }}
//     >
//       <Container maxWidth="md">
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           mb={6}
//           sx={{
//             textShadow: '0 0 14px rgba(0,196,255,0.4)',
//             letterSpacing: 1.2,
//           }}
//         >
//           Explore Thailand Through Photos
//         </Typography>

//         <Grid container spacing={4} justifyContent="center">
//           {exploreData.map((place, idx) => (
//             <Grid item xs={12} sm={6} md={4} key={idx} display="flex" justifyContent="center">
//               <Card
//                 sx={{
//                   borderRadius: 6,
//                   background: 'rgba(255,255,255,0.03)',
//                   color: 'white',
//                   border: '1px solid rgba(255,255,255,0.06)',
//                   backdropFilter: 'blur(6px)',
//                   WebkitBackdropFilter: 'blur(6px)',
//                   animation: `${fadeGlow} 6s ease-in-out infinite`,
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   '&:hover': {
//                     transform: 'scale(1.04)',
//                     boxShadow: '0 0 30px rgba(0,255,255,0.2)',
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={place.image}
//                   height="220"
//                   alt={place.title}
//                   sx={{
//                     objectFit: 'cover',
//                     borderTopLeftRadius: 24,
//                     borderTopRightRadius: 24,
//                     filter: 'brightness(0.9) contrast(1.1)',
//                   }}
//                 />
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                     sx={{
//                       color: '#e0ffff',
//                       textShadow: '0 0 10px rgba(0,255,255,0.15)',
//                       letterSpacing: 0.5,
//                       fontSize: '1.1rem',
//                     }}
//                   >
//                     {place.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#b0bec5' }}>
//                     {place.location}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     sx={{
//                       mt: 2,
//                       color: '#d3d3d3',
//                       borderColor: '#d3d3d3',
//                       borderRadius: '24px',
//                       textTransform: 'uppercase',
//                       fontWeight: 'bold',
//                       '&:hover': {
//                         bgcolor: 'rgba(255,255,255,0.08)',
//                         boxShadow: '0 0 10px rgba(255,255,255,0.2)',
//                         borderColor: '#d3d3d3',
//                       },
//                     }}
//                     onClick={() => navigate(`/photo/${idx + 1}`)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }


import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import axios from 'axios';

const fadeGlow = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
  50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
`;

export default function Explore() {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const res = await axios.get('https://thailand-project2025-backend.vercel.app/travels');
        setTravels(res.data);
      } catch (err) {
        setError('Failed to fetch travels.');
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#010a14' }}>
        <CircularProgress color="info" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e57373', bgcolor: '#010a14' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 6 },
        py: 10,
        background: 'linear-gradient(to top, #010a14, #081c2f)',
        color: '#e0f7fa',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={6}
          sx={{
            textShadow: '0 0 14px rgba(0,196,255,0.4)',
            letterSpacing: 1.2,
          }}
        >
          Explore Thailand Through Photos
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {travels.map((place) => (
            <Grid item xs={12} sm={6} md={4} key={place.travelId}>
              <Card
                sx={{
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.03)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(6px)',
                  animation: `${fadeGlow} 6s ease-in-out infinite`,
                  height: '380px',
                  width: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: '0 0 30px rgba(0,255,255,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={place.travelImage}
                  height="220"
                  alt={place.travelPlace}
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    filter: 'brightness(0.9) contrast(1.1)',
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
                      fontSize: '1.1rem',
                    }}
                  >
                    {place.travelPlace}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                    {place.travelLocation}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 2,
                      color: '#d3d3d3',
                      borderColor: '#d3d3d3',
                      borderRadius: '24px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                        borderColor: '#d3d3d3',
                      },
                    }}
                    onClick={() => navigate(`/photo/${place.travelId}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
