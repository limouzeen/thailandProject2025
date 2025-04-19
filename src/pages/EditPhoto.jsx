import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import explore1 from '../assets/explore1.jpg';
  import explore2 from '../assets/explore2.jpg';
  import explore3 from '../assets/explore3.jpg';
  
  const mockMyPhotos = [
    { id: 1, title: 'Golden Lion', location: 'Mae Hong Son', image: explore1 },
    { id: 2, title: 'Beachside Bliss', location: 'Pattaya', image: explore2 },
    { id: 3, title: 'Golden Temple Journey', location: 'Ayutthaya', image: explore3 },
  ];
  
  export default function EditPhoto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const photo = mockMyPhotos.find((p) => p.id === parseInt(id));
    const [form, setForm] = useState({ title: '', location: '', image: '' });
  
    useEffect(() => {
      if (photo) {
        setForm({ title: photo.title, location: photo.location, image: photo.image });
      }
    }, [photo]);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Updated Photo:', { id, ...form });
      navigate('/my-gallery');
    };
  
    if (!photo) {
      return (
        <Box textAlign="center" mt={10} color="white">
          <Typography variant="h5">Photo not found</Typography>
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
            Edit Photo
          </Typography>
  
          <Box
            component="img"
            src={form.image}
            alt="preview"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
  
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Title"
                variant="filled"
                fullWidth
                onChange={handleChange}
                value={form.title}
                InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'gray' } }}
              />
              <TextField
                name="location"
                label="Location"
                variant="filled"
                fullWidth
                onChange={handleChange}
                value={form.location}
                InputProps={{ sx: { bgcolor: '#121c26', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'gray' } }}
              />
  
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
  