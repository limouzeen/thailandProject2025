import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Avatar,
  Stack,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { keyframes } from '@emotion/react';
import registerImage from '../assets/register.jpg';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
`;

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userImage: '',
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setForm((prev) => ({ ...prev, userImage: file }));
    }
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword, userImage } = form;
    if (!username || !email || !password || !confirmPassword) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('อีเมลไม่ถูกต้อง');
      return false;
    }
    if (password.length < 6) {
      alert('รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร');
      return false;
    }
    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return false;
    }
    if (!userImage) {
      alert('กรุณาอัปโหลดรูปภาพโปรไฟล์');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('userName', form.username);
    formData.append('userEmail', form.email);
    formData.append('userPassword', form.password);
    formData.append('userImage', form.userImage);

    try {
      setLoading(true);
      await axios.post(
        'https://thailand-project2025-backend.vercel.app/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // บังคับให้ axios ใช้แบบ multipart
          },
        }
      );  
      alert('✅ Register successful!');
      navigate('/login');
    } catch (err) {
      console.error('❌ Register Error:', err);
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: 'linear-gradient(to top, #010914, #0a1d2c)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {[...Array(30)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.3)',
            animation: `${starTwinkle} ${2 + Math.random() * 3}s ease-in-out infinite`,
          }}
        />
      ))}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.025)',
            color: '#e0f7fa',
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 28px rgba(0,255,255,0.08)',
          }}
        >
          <Stack alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'rgba(0,195,255,0.2)', color: '#00eaff', mb: 1 }}>
              <PersonAddIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Register Account
            </Typography>
          </Stack>

          {preview && (
            <Avatar
              src={preview}
              alt="Preview"
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                border: '2px solid #00eaff',
              }}
            />
          )}

          <Stack direction="row" justifyContent="center" mb={2}>
            <IconButton component="label" sx={{ bgcolor: '#00eaff', color: '#001b1f' }}>
              <UploadFileIcon />
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </IconButton>
            <Typography variant="body2" color="gray" alignSelf="center" ml={1}>
              Upload Profile Image
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" fullWidth variant="filled" margin="normal" onChange={handleChange} value={form.username} InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.035)', color: 'white', borderRadius: 1 } }} InputLabelProps={{ sx: { color: 'gray' } }} />
            <TextField name="email" label="Email" type="email" fullWidth variant="filled" margin="normal" onChange={handleChange} value={form.email} InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.035)', color: 'white', borderRadius: 1 } }} InputLabelProps={{ sx: { color: 'gray' } }} />
            <TextField name="password" label="Password" type="password" fullWidth variant="filled" margin="normal" onChange={handleChange} value={form.password} InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.035)', color: 'white', borderRadius: 1 } }} InputLabelProps={{ sx: { color: 'gray' } }} />
            <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth variant="filled" margin="normal" onChange={handleChange} value={form.confirmPassword} InputProps={{ sx: { bgcolor: 'rgba(255,255,255,0.035)', color: 'white', borderRadius: 1 } }} InputLabelProps={{ sx: { color: 'gray' } }} />

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 5,
                bgcolor: '#00eaff',
                color: '#001b1f',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                boxShadow: '0 0 18px rgba(0,234,255,0.35)',
                '&:hover': {
                  bgcolor: '#00eaff',
                  boxShadow: '0 0 28px rgba(0,234,255,0.55)',
                },
              }}
            >
              Register
            </Button>
          </form>

          <Box mt={3} fontSize="0.875rem">
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              color="inherit"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#00c3ff',
                  textDecorationColor: '#00c3ff',
                  textDecorationThickness: '2px',
                },
              }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.5)',
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            color: 'white',
            maxWidth: 320,
            boxShadow: '0 0 24px rgba(0,255,255,0.08)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create your Travel Account
          </Typography>
          <Typography variant="body1">
            Start your journey with TravelMemories. Upload, explore, and connect.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
