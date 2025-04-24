// import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
// import { useAuth } from '../context/AuthContext';
// import explore1 from '../assets/explore1.jpg';
// import explore2 from '../assets/explore2.jpg';
// import explore3 from '../assets/explore3.jpg';
// import { keyframes } from '@emotion/react';
// import { Link } from 'react-router-dom';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



// const fadeGlow = keyframes`
//   0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
//   50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
// `;

// const mockMyPhotos = [
//   { id: 1, title: 'Golden Lion', location: 'Mae Hong Son', image: explore1 },
//   { id: 2, title: 'Beachside Bliss', location: 'Pattaya', image: explore2 },
//   { id: 3, title: 'Golden Temple Journey', location: 'Ayutthaya', image: explore3 },
// ];

// export default function MyGallery() {
//   const { user } = useAuth();

//   const handleEdit = (id) => {
//     alert(`Edit photo with id ${id}`);
//   };

//   const handleDelete = (id) => {
//     alert(`Delete photo with id ${id}`);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         px: { xs: 2, md: 6 },
//         py: 10,
//         background: 'linear-gradient(to top, #010a14, #081c2f)',
//         color: '#e0f7fa',
//         textAlign: 'center',
//       }}
//     >
//      <Box
//   display="flex"
//   flexDirection={{ xs: 'column', md: 'row' }}
//   justifyContent="space-between"
//   alignItems={{ xs: 'center', md: 'center' }}
//   mb={4}
//   gap={2}
// >
//   <Typography
//     variant="h4"
//     fontWeight="bold"
//     sx={{ textAlign: { xs: 'center', md: 'left' } }}
//   >
//     My Travel Posts
//   </Typography>

//   <Button
//     component={Link}
//     to="/upload"
//     variant="outlined"
//     sx={{
//       color: '#d3d3d3',
//       borderColor: '#d3d3d3',
//       fontWeight: 'bold',
//       borderRadius: '20px',
//       textTransform: 'uppercase',
//       '&:hover': {
//         backgroundColor: 'rgba(0,234,255,0.1)',
//         boxShadow: '0 0 10px rgba(0,234,255,0.2)',
//       },
//     }}
//   >
//     + Add New Photo
//   </Button>
// </Box>



//       <Grid container spacing={4} justifyContent="center">
//         {mockMyPhotos.map((photo) => (
//           <Grid item xs={12} sm={6} md={4} key={photo.id}>
//             <Card
//               sx={{
//                 borderRadius: 6,
//                 background: 'rgba(255,255,255,0.03)',
//                 color: '#f5f7fa',
//                 border: '1px solid rgba(255,255,255,0.06)',
//                 backdropFilter: 'blur(6px)',
//                 WebkitBackdropFilter: 'blur(6px)',
//                 animation: `${fadeGlow} 6s ease-in-out infinite`,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="220"
//                 image={photo.image}
//                 alt={photo.title}
//                 sx={{
//                   objectFit: 'cover',
//                   borderTopLeftRadius: 24,
//                   borderTopRightRadius: 24,
//                   filter: 'brightness(0.9) contrast(1.1)',
//                 }}
//               />
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" sx={{color: '#e0ffff'}}>
//                   {photo.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#b0bec5' }}>
//                   {photo.location}
//                 </Typography>
//                 <Box mt={2} display="flex" justifyContent="space-between">
//   <Button
//     component={Link}
//     to={`/edit/${photo.id}`}
//     startIcon={<EditNoteIcon />}
//     sx={{
//       color: '#d3d3d3',
//       textTransform: "none",
//       borderRadius: '16px',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         color: '#e0ffff',
//         backgroundColor: 'rgba(255, 255, 255, 0.05)',
//         boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
//         backdropFilter: 'blur(6px)'
//       }
//     }}

    
    
//   >
//     Edit
//   </Button>
//   <Button
//     onClick={() => handleDelete(photo.id)}
//     startIcon={<DeleteForeverIcon />}
//     sx={{
//       color: '#d3d3d3',
//       textTransform: "none",
//         borderRadius: '16px',
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           color: '#e0ffff',
//           backgroundColor: 'rgba(255, 255, 255, 0.05)',
//           boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
//           backdropFilter: 'blur(6px)'
//         }
     
//     }}
//   >
//     Delete
//   </Button>
// </Box>

//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'https://thailand-project2025-backend.vercel.app';

const fadeGlow = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
  50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
`;

export default function MyGallery() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchMyPhotos = async () => {
      try {
        const res = await axios.get(`${API_URL}/travels`);
        const myPhotos = res.data.filter(photo => photo.userId === user?.userId);
        setPhotos(myPhotos);
      } catch (err) {
        console.error('❌ Failed to fetch photos:', err);
      }
    };

    if (user) {
      fetchMyPhotos();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await axios.delete(`${API_URL}/travels/${id}`);
        setPhotos((prev) => prev.filter(photo => photo.travelId !== id));
      } catch (err) {
        console.error('❌ Failed to delete photo:', err);
        alert('Delete failed');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 6 },
        py: 10,
        background: 'linear-gradient(to top, #010a14, #081c2f)',
        color: '#e0f7fa',
        textAlign: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'center', md: 'center' }}
        mb={4}
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          My Travel Posts
        </Typography>

        <Button
          component={Link}
          to="/upload"
          variant="outlined"
          sx={{
            color: '#d3d3d3',
            borderColor: '#d3d3d3',
            fontWeight: 'bold',
            borderRadius: '20px',
            textTransform: 'uppercase',
            '&:hover': {
              backgroundColor: 'rgba(0,234,255,0.1)',
              boxShadow: '0 0 10px rgba(0,234,255,0.2)',
            },
          }}
        >
          + Add New Photo
        </Button>
      </Box>



 
<Grid container spacing={4} justifyContent="center">
  {photos.map((photo) => (
    <Grid item xs={12} sm={6} md={4} key={photo.travelId} sx={{ display: 'flex' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '420px',
          width: '300px',
          borderRadius: 6,
          background: 'rgba(255,255,255,0.03)',
          color: '#f5f7fa',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: `${fadeGlow} 6s ease-in-out infinite`,
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={photo.travelImage}
          alt={photo.travelPlace}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            filter: 'brightness(0.9) contrast(1.1)',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#d3d3d3' }}>
            {photo.travelPlace}
          </Typography>
          <Typography variant="body2" sx={{ color: '#b0bec5' }}>
            {photo.travelLocation}
          </Typography>
        </CardContent>
        <Box px={2} pb={2} display="flex" justifyContent="space-between">
          <Button
            component={Link}
            to={`/edit/${photo.travelId}`}
            startIcon={<EditNoteIcon />}
            sx={{
              color: '#d3d3d3',
              textTransform: 'none',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0ffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                backdropFilter: 'blur(6px)',
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(photo.travelId)}
            startIcon={<DeleteForeverIcon />}
            sx={{
              color: '#d3d3d3',
              textTransform: 'none',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0ffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                backdropFilter: 'blur(6px)',
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>



    </Box>
  );
}
