// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Avatar,
//   TextField,
//   Button,
//   Stack,
//   Paper,
// } from '@mui/material';
// import { useState } from 'react';
// import explore1 from '../assets/explore1.jpg';
// import explore2 from '../assets/explore2.jpg';
// import explore3 from '../assets/explore3.jpg';
// import { useAuth } from '../context/AuthContext';

// const mockPhotos = {
//   1: {
//     title: 'Golden Lion',
//     location: 'Mae Hong Son',
//     image: explore1,
//     comments: [
//       {
//         name: 'Somsri',
//         text: 'Beautiful place!',
//         image: 'https://i.pravatar.cc/150?u=somsri',
//       },
//       {
//         name: 'John',
//         text: 'Golden Lion is stunning!',
//         image: 'https://i.pravatar.cc/150?u=john',
//       },
//     ],
//   },
//   2: {
//     title: 'Beachside Bliss',
//     location: 'Pattaya',
//     image: explore2,
//     comments: [
//       {
//         name: 'Anna',
//         text: 'Love the beach vibes~',
//         image: 'https://i.pravatar.cc/150?u=anna',
//       },
//     ],
//   },
//   3: {
//     title: 'Golden Temple Journey',
//     location: 'Ayutthaya',
//     image: explore3,
//     comments: [],
//   },
// };

// export default function PhotoDetail() {
//   const { id } = useParams();
//   const photo = mockPhotos[id];
//   const { user } = useAuth(); // มี user.userImage และ user.userName

//   const [comment, setComment] = useState('');
//   const [allComments, setAllComments] = useState(photo?.comments || []);

//   const handleComment = () => {
//     if (comment.trim() !== '' && user) {
//       setAllComments([
//         ...allComments,
//         {
//           name: user.userName,
//           text: comment,
//           image: user.userImage || '', // ต้องแน่ใจว่ามี userImage จากการ login/register
//         },
//       ]);
//       setComment('');
//     }
//   };

//   if (!photo) {
//     return (
//       <Box textAlign="center" mt={10} color="white">
//         <Typography variant="h5">Photo not found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         px: { xs: 2, md: 6 },
//         py: 6,
//         background: 'linear-gradient(to top, #010a14, #081c2f)',
//         color: '#e0f7fa',
//       }}
//     >
//       <Box
//         component="img"
//         src={photo.image}
//         alt={photo.title}
//         sx={{
//           mt: 4,
//           width: '80%',
//           maxHeight: 400,
//           objectFit: 'cover',
//           borderRadius: 4,
//           mb: 4,
//         }}
//       />
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         {photo.title}
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         {photo.location}
//       </Typography>

//       <Box mt={5}>
//         <Typography variant="h6" gutterBottom>
//           Comments
//         </Typography>
//         <Stack spacing={2} mb={3}>
//           {allComments.map((c, index) => (
//             <Paper
//               key={index}
//               sx={{
//                 p: 2,
//                 bgcolor: 'rgba(255,255,255,0.05)',
//                 backdropFilter: 'blur(6px)',
//               }}
//             >
//               <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar src={c.image || `https://i.pravatar.cc/150?u=${c.name}`}>
//   {(!c.image && c.name) ? c.name[0] : '?'}
// </Avatar>

//                 <Box>
//                   <Typography sx={{ color: '#e0f7fa' }} fontWeight="bold">
//                     {c.name}
//                   </Typography>
//                   <Typography sx={{ color: '#d3d3d3' }}>{c.text}</Typography>
//                 </Box>
//               </Stack>
//             </Paper>
//           ))}
//         </Stack>

//         {user ? (
//           <>
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Add your comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               InputProps={{
//                 sx: {
//                   bgcolor: 'rgba(255,255,255,0.04)',
//                   color: 'white',
//                   borderRadius: 1,
//                 },
//               }}
//               InputLabelProps={{ sx: { color: 'gray' } }}
//             />
//             <Button
//               onClick={handleComment}
//               sx={{
//                 mt: 2,
//                 bgcolor: '#00eaff',
//                 color: '#001b1f',
//                 fontWeight: 'bold',
//                 '&:hover': { bgcolor: '#00eaff' },
//               }}
//             >
//               Submit
//             </Button>
//           </>
//         ) : (
//           <Typography sx={{ mt: 3, fontStyle: 'italic', color: 'gray' }}>
//             Please login to leave a comment.
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }


import {
  Box, Typography, Avatar, TextField, Button, Stack, Paper, CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'https://thailand-project2025-backend.vercel.app';

export default function PhotoDetail() {
  const { travelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get(`${API_URL}/travels/${travelId}`);
        setPhoto(res.data);
      } catch (err) {
        alert('Failed to load post.');
        navigate('/explore');
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [travelId]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return;
    try {
      const res = await axios.post(`${API_URL}/travels/${travelId}/comments`, {
        userId: user.userId,
        content: comment
      });
      setPhoto((prev) => ({
        ...prev,
        comments: [...prev.comments, { ...res.data, user }]
      }));
      setComment('');
    } catch (err) {
      console.error('❌ Comment error:', err);
      alert('Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await axios.delete(`${API_URL}/travels/comments/${commentId}`);
      setPhoto((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.commentId !== commentId)
      }));
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#010a14">
        <CircularProgress color="info" />
      </Box>
    );
  }

  if (!photo) return null;

  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 6 }, py: 6, background: 'linear-gradient(to top, #010a14, #081c2f)', color: '#e0f7fa' }}>
      <Box component="img" src={photo.travelImage} alt={photo.travelPlace} sx={{
        mt: 4, width: '80%', maxHeight: 400, objectFit: 'cover', borderRadius: 4, mb: 4
      }} />
      <Typography variant="h4" fontWeight="bold">{photo.travelPlace}</Typography>
      <Typography variant="subtitle1">{photo.travelLocation}</Typography>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>Comments</Typography>
        <Stack spacing={2} mb={3}>
          {photo.comments.map((c) => (
            <Paper key={c.commentId} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={c.user?.userImage || `https://i.pravatar.cc/150?u=${c.userId}`} />
                <Box flex={1}>
                  <Typography fontWeight="bold" sx={{ color: '#e0f7fa' }}>{c.user?.userName}</Typography>
                  <Typography sx={{ color: '#d3d3d3' }}>{c.content}</Typography>
                </Box>
                {user?.userId === c.userId && (
                  <Button size="small" color="error" onClick={() => handleDeleteComment(c.commentId)}>Delete</Button>
                )}
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
              InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.04)', color: 'white', borderRadius: 1 } }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />
            <Button
              onClick={handleCommentSubmit}
              sx={{
                mt: 2, bgcolor: '#00eaff', color: '#001b1f',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#00eaff' }
              }}
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
