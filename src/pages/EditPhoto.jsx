// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Stack,
//   IconButton,
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const API_URL = 'https://thailand-project2025-backend.vercel.app';

// export default function EditPhoto() {
//   const { travelId } = useParams(); // match backend :travelId
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [form, setForm] = useState({
//     travelPlace: '',
//     travelLocation: '',
//     travelImage: '',
//     imageFile: null,
//   });

//   const [preview, setPreview] = useState('');

//   useEffect(() => {
//     const fetchTravel = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/travels/${travelId}`);
//         const data = res.data;

//         setForm({
//           travelPlace: data.travelPlace,
//           travelLocation: data.travelLocation,
//           travelImage: data.travelImage,
//           imageFile: null,
//         });

//         setPreview(data.travelImage);
//       } catch (err) {
//         console.error('Failed to load travel data:', err);
//         alert('Failed to load post.');
//         navigate('/my-gallery');
//       }
//     };

//     fetchTravel();
//   }, [travelId]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, imageFile: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('travelPlace', form.travelPlace);
//     formData.append('travelLocation', form.travelLocation);
//     if (form.imageFile) {
//       formData.append('travelImage', form.imageFile);
//     }

//     try {
//       await axios.put(`${API_URL}/travels/${travelId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Post updated!');
//       navigate('/my-gallery');
//     } catch (err) {
//       console.error('❌ Update error:', err);
//       alert('Failed to update post.');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: 'linear-gradient(to top, #010a14, #081c2f)',
//         color: 'white',
//         py: 6,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           bgcolor: 'rgba(255,255,255,0.03)',
//           backdropFilter: 'blur(10px)',
//           borderRadius: 4,
//           border: '1px solid rgba(255,255,255,0.06)',
//           width: '100%',
//           maxWidth: 500,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center" sx={{ color: '#e0ffff' }}>
//           Edit Travel Post
//         </Typography>

//         {preview && (
//           <Box
//             component="img"
//             src={preview}
//             alt="preview"
//             sx={{
//               width: '100%',
//               maxHeight: 300,
//               objectFit: 'cover',
//               borderRadius: 2,
//               mb: 2,
//             }}
//           />
//         )}

//         <form onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField
//               name="travelPlace"
//               label="Place"
//               fullWidth
//               variant="filled"
//               value={form.travelPlace}
//               onChange={handleChange}
//               InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
//               InputLabelProps={{ sx: { color: 'gray' } }}
//             />
//             <TextField
//               name="travelLocation"
//               label="Location"
//               fullWidth
//               variant="filled"
//               value={form.travelLocation}
//               onChange={handleChange}
//               InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
//               InputLabelProps={{ sx: { color: 'gray' } }}
//             />

//             <Stack direction="row" alignItems="center" spacing={1}>
//               <IconButton
//                 component="label"
//                 sx={{
//                   bgcolor: '#00eaff',
//                   color: '#001b1f',
//                   '&:hover': {
//                     bgcolor: '#00c8e0',
//                     boxShadow: '0 0 10px rgba(0,255,255,0.3)',
//                   },
//                 }}
//               >
//                 <UploadFileIcon />
//                 <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
//               </IconButton>
//               <Typography variant="body2" sx={{ color: '#bbb' }}>
//                 Change image (optional)
//               </Typography>
//             </Stack>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: '#00eaff',
//                 color: '#001b1f',
//                 fontWeight: 'bold',
//                 textTransform: 'uppercase',
//                 '&:hover': {
//                   boxShadow: '0 0 20px rgba(0,255,255,0.3)',
//                   bgcolor: '#00eaff',
//                 },
//               }}
//             >
//               Save Changes
//             </Button>
//           </Stack>
//         </form>
//       </Paper>
//     </Box>
//   );
// }


import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://thailand-project2025-backend.vercel.app';

export default function EditPhoto() {
  const { travelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    travelPlace: '',
    travelLocation: '',
    travelImage: '',
    imageFile: null,
  });

  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const res = await axios.get(`${API_URL}/travels/${travelId}`);
        const data = res.data;

        setForm({
          travelPlace: data.travelPlace,
          travelLocation: data.travelLocation,
          travelImage: data.travelImage,
          imageFile: null,
        });

        setPreview(data.travelImage);
      } catch (err) {
        console.error('❌ Failed to load travel data:', err);
        setError('Failed to load travel post.');
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();
  }, [travelId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('travelPlace', form.travelPlace);
    formData.append('travelLocation', form.travelLocation);
    if (form.imageFile) {
      formData.append('travelImage', form.imageFile);
    }

    try {
      await axios.put(`${API_URL}/travels/${travelId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post updated!');
      navigate('/my-gallery');
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('Failed to update post.');
    }
  };

  // 🔄 ระหว่างโหลดข้อมูล
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to top, #010a14, #081c2f)',
        }}
      >
        <CircularProgress color="info" />
      </Box>
    );
  }

  // ❌ โหลดล้มเหลว
  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to top, #010a14, #081c2f)',
        }}
      >
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to top, #010a14, #081c2f)',
        color: 'white',
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          bgcolor: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.06)',
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center" sx={{ color: '#e0ffff' }}>
          Edit Travel Post
        </Typography>

        {preview && (
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="travelPlace"
              label="Place"
              fullWidth
              variant="filled"
              value={form.travelPlace}
              onChange={handleChange}
              InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />
            <TextField
              name="travelLocation"
              label="Location"
              fullWidth
              variant="filled"
              value={form.travelLocation}
              onChange={handleChange}
              InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                component="label"
                sx={{
                  bgcolor: '#00eaff',
                  color: '#001b1f',
                  '&:hover': {
                    bgcolor: '#00c8e0',
                    boxShadow: '0 0 10px rgba(0,255,255,0.3)',
                  },
                }}
              >
                <UploadFileIcon />
                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
              </IconButton>
              <Typography variant="body2" sx={{ color: '#bbb' }}>
                Change image (optional)
              </Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#00eaff',
                color: '#001b1f',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(0,255,255,0.3)',
                  bgcolor: '#00eaff',
                },
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
