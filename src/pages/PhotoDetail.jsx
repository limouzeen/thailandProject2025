// import {
//   Box, Typography, Avatar, TextField, Button, Stack, Paper, CircularProgress
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const API_URL = 'https://thailand-project2025-backend.vercel.app';

// export default function PhotoDetail() {
//   const { travelId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     const fetchPhoto = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/travels/${travelId}`);
//         setPhoto(res.data);
//       } catch (err) {
//         alert('Failed to load post.');
//         navigate('/explore');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhoto();
//   }, [travelId]);

//   const handleCommentSubmit = async () => {
//     if (comment.trim() === '') return;
//     try {
//       const res = await axios.post(`${API_URL}/travels/${travelId}/comments`, {
//         userId: user.userId,
//         content: comment
//       });
//       setPhoto((prev) => ({
//         ...prev,
//         comments: [...prev.comments, { ...res.data, user }]
//       }));
//       setComment('');
//     } catch (err) {
//       console.error('❌ Comment error:', err);
//       alert('Failed to post comment');
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm('Delete this comment?')) return;
//     try {
//       await axios.delete(`${API_URL}/travels/comments/${commentId}`);
//       setPhoto((prev) => ({
//         ...prev,
//         comments: prev.comments.filter((c) => c.id !== commentId)
//       }));
//     } catch (err) {
//       alert('Failed to delete comment');
//     }
//   };

//   if (loading) {
//     return (
//       <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#010a14">
//         <CircularProgress color="info" />
//       </Box>
//     );
//   }

//   if (!photo) return null;

//   return (
//     <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 6 }, py: 6, background: 'linear-gradient(to top, #010a14, #081c2f)', color: '#e0f7fa' }}>
//       <Box component="img" src={photo.travelImage} alt={photo.travelPlace} sx={{
//         mt: 4, width: '80%', maxHeight: 400, objectFit: 'cover', borderRadius: 4, mb: 4
//       }} />
//       <Typography variant="h4" fontWeight="bold">{photo.travelPlace}</Typography>
//       <Typography variant="subtitle1">{photo.travelLocation}</Typography>

//       <Box mt={5}>
//         <Typography variant="h6" gutterBottom>Comments</Typography>
//         <Stack spacing={2} mb={3}>
//           {photo.comments.map((c) => (
//             <Paper key={c.id} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)' }}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Avatar src={c.user?.userImage || `https://i.pravatar.cc/150?u=${c.userId}`} />
//                 <Box flex={1}>
//                   <Typography fontWeight="bold" sx={{ color: '#e0f7fa' }}>{c.user?.userName}</Typography>
//                   <Typography sx={{ color: '#d3d3d3' }}>{c.content}</Typography>
//                 </Box>
//                 {user?.userId === c.userId && (
//                   <Button size="small" color="error" onClick={() => handleDeleteComment(c.id)}>Delete</Button>
//                 )}
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
//               InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.04)', color: 'white', borderRadius: 1 } }}
//               InputLabelProps={{ sx: { color: 'gray' } }}
//             />
//             <Button
//               onClick={handleCommentSubmit}
//               sx={{
//                 mt: 2, bgcolor: '#00eaff', color: '#001b1f',
//                 fontWeight: 'bold',
//                 '&:hover': { bgcolor: '#00eaff' }
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
// ✅ PhotoDetail.jsx (Frontend React)
import {
  Box, Typography, Avatar, TextField, Button, Stack, Paper, CircularProgress, IconButton
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = 'https://thailand-project2025-backend.vercel.app';

export default function PhotoDetail() {
  const { travelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);

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
      if (editCommentId) {
        const res = await axios.put(`${API_URL}/travels/comments/${editCommentId}`, { content: comment });
        setPhoto((prev) => ({
          ...prev,
          comments: prev.comments.map(c => c.id === editCommentId ? { ...c, content: res.data.content } : c)
        }));
        setEditCommentId(null);
      } else {
        const res = await axios.post(`${API_URL}/travels/${travelId}/comments`, {
          userId: user.userId,
          content: comment
        });
        setPhoto((prev) => ({
          ...prev,
          comments: [...prev.comments, { ...res.data, user }]
        }));
      }
      setComment('');
    } catch (err) {
      console.error('❌ Comment error:', err);
      alert('Failed to post comment');
    }
  };

  const handleEditComment = (id, content) => {
    setEditCommentId(id);
    setComment(content);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await axios.delete(`${API_URL}/travels/comments/${commentId}`);
      setPhoto((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== commentId)
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
      <Box component="img" src={photo.travelImage} alt={photo.travelPlace} sx={{ mt: 4, width: '80%', maxHeight: 400, objectFit: 'cover', borderRadius: 4, mb: 4 }} />
      <Typography variant="h4" fontWeight="bold">{photo.travelPlace}</Typography>
      <Typography variant="subtitle1">{photo.travelLocation}</Typography>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>Comments</Typography>
        <Stack spacing={2} mb={3}>
          {photo.comments.map((c) => (
            <Paper key={c.id} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={c.user?.userImage || `https://i.pravatar.cc/150?u=${c.userId}`} />
                <Box flex={1}>
                  <Typography fontWeight="bold" sx={{ color: '#e0f7fa' }}>{c.user?.userName}</Typography>
                  <Typography sx={{ color: '#d3d3d3' }}>{c.content}</Typography>
                </Box>
                {user?.userId === c.userId && (
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleEditComment(c.id, c.content)} sx={{ color: '#ccc' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteComment(c.id)} sx={{ color: '#ccc' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
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
              label={editCommentId ? "Edit comment" : "Add your comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.04)', color: 'white', borderRadius: 1 } }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />
            <Button
              onClick={handleCommentSubmit}
              sx={{ mt: 2, bgcolor: '#00eaff', color: '#001b1f', fontWeight: 'bold', '&:hover': { bgcolor: '#00eaff' } }}
            >
              {editCommentId ? 'Update' : 'Submit'}
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