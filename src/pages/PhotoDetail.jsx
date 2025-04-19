import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, TextField, Button, Stack, Paper } from '@mui/material';
import { useState } from 'react';
import explore1 from '../assets/explore1.jpg';
import explore2 from '../assets/explore2.jpg';
import explore3 from '../assets/explore3.jpg';
import { useAuth } from '../context/AuthContext';

const mockPhotos = {
  1: {
    title: 'Golden Lion',
    location: 'Mae Hong Son',
    image: explore1,
    comments: [
      { name: 'Somsri', text: 'Beautiful place!' },
      { name: 'John', text: 'Golden Lion is stunning!' },
    ],
  },
  2: {
    title: 'Beachside Bliss',
    location: 'Pattaya',
    image: explore2,
    comments: [
      { name: 'Anna', text: 'Love the beach vibes~' },
    ],
  },
  3: {
    title: 'Golden Temple Journey',
    location: 'Ayutthaya',
    image: explore3,
    comments: [],
  },
};

export default function PhotoDetail() {
  const { id } = useParams();
  const photo = mockPhotos[id];
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState(photo?.comments || []);
  const { user } = useAuth(); 


  const handleComment = () => {
    if (comment.trim() !== '') {
      setAllComments([...allComments, { name: 'You', text: comment }]);
      setComment('');
    }
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
        px: { xs: 2, md: 6 },
        py: 6,
        background: 'linear-gradient(to top, #010a14, #081c2f)',
        color: '#e0f7fa',
      }}
    >
      <Box
        component="img"
        src={photo.image}
        alt={photo.title}
        sx={{
          mt: 4,
          width: '80%',
          maxHeight: 400,
          objectFit: 'cover',
          borderRadius: 4,
          mb: 4,
        }}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {photo.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {photo.location}
      </Typography>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <Stack spacing={2} mb={3}>
          {allComments.map((c, index) => (
            <Paper key={index} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{c.name[0]}</Avatar>
                <Box>
                  <Typography sx={{color: '#e0f7fa'}} fontWeight="bold">{c.name}</Typography>
                  <Typography sx={{color: '#d3d3d3'}}>{c.text}</Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {user ? (
  <>
    <TextField
      fullWidth
      variant="filled"
      label="Add your comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      InputProps={{
        sx: {
          bgcolor: 'rgba(255,255,255,0.04)',
          color: 'white',
          borderRadius: 1,
        },
      }}
      InputLabelProps={{ sx: { color: 'gray' } }}
    />
    <Button
      onClick={handleComment}
      sx={{ mt: 2, bgcolor: '#00eaff', color: '#001b1f', fontWeight: 'bold', '&:hover': { bgcolor: '#00eaff' } }}
    >
      Submit
    </Button>
  </>
) : (
  <Typography sx={{ mt: 3, fontStyle: 'italic', color: 'gray' }}>
    Please login to leave a comment.
  </Typography>
)}

      </Box>
    </Box>
  );
}
