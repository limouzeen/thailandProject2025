import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    IconButton,
  } from '@mui/material';
  import { useState } from 'react';
  import UploadFileIcon from '@mui/icons-material/UploadFile';
  import pic from '../assets/pic.png'; 
  import { keyframes } from '@emotion/react';
  
  const starGlow = keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
  `;
  
  export default function UploadPhoto() {
    const [form, setForm] = useState({ title: '', location: '', image: '' });
    const [preview, setPreview] = useState(pic);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setForm({ ...form, image: imageURL });
        setPreview(imageURL);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Uploading:', form);
    };
  
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #010a14, #081c2f)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200%',
            height: '200%',
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15) 1px, transparent 0),\n             radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.1) 1px, transparent 0),\n             radial-gradient(1px 1px at 50% 80%, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '200px 200px',
            animation: `${starGlow} 20s linear infinite`,
            zIndex: 0,
          },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            zIndex: 1,
            p: 4,
            bgcolor: 'rgba(5, 20, 35, 0.9)',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.08)',
            width: '100%',
            maxWidth: 520,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign="center"
            sx={{ color: '#f5f7fa' }}
          >
            Upload Your Travel Moment
          </Typography>
  
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 280,
              objectFit: 'cover',
              borderRadius: 3,
              mb: 3,
              boxShadow: '0 0 12px rgba(0,255,255,0.15)',
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
                InputProps={{ sx: { bgcolor: '#111a24', color: 'white' } }}
                InputLabelProps={{ sx: { color: '#88a' } }}
              />
              <TextField
                name="location"
                label="Location"
                variant="filled"
                fullWidth
                onChange={handleChange}
                value={form.location}
                InputProps={{ sx: { bgcolor: '#111a24', color: 'white' } }}
                InputLabelProps={{ sx: { color: '#88a' } }}
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
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                  Choose an image file
                </Typography>
              </Stack>
  
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  bgcolor: '#00eaff',
                  color: '#001b1f',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  '&:hover': {
                    boxShadow: '0 0 24px rgba(0,255,255,0.4)',
                    bgcolor: '#00eaff',
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    );
  }
  