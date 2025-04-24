import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Avatar,
  Stack,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useState } from 'react';
import loginImage from '../assets/login.jpg';
import { keyframes } from '@emotion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
`;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.email.trim() === '') {
      alert('ป้อนชื่อผู้ใช้ (อีเมล์) ด้วย !!!');
      return;
    }
    if (form.password.trim() === '') {
      alert('ป้อนรหัสผ่าน ด้วย !!!');
      return;
    }
  
    const result = await login(form.email, form.password);
  
    if (result.status === 200) {
      navigate('/my-gallery');
    } else if (result.status === 401) {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    } else {
      alert('Login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
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
          <Stack alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: 'rgba(0,195,255,0.2)', color: '#00eaff', mb: 1 }}>
              <PublicIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              TravelPics
            </Typography>
          </Stack>

          <Typography variant="subtitle1" mb={3}>
            Login to Your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Username"
              fullWidth
              variant="filled"
              margin="normal"
              onChange={handleChange}
              value={form.email}
              InputProps={{
                sx: {
                  bgcolor: 'rgba(255,255,255,0.035)',
                  color: 'white',
                  borderRadius: 1,
                },
              }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              margin="normal"
              onChange={handleChange}
              value={form.password}
              InputProps={{
                sx: {
                  bgcolor: 'rgba(255,255,255,0.035)',
                  color: 'white',
                  borderRadius: 1,
                },
              }}
              InputLabelProps={{ sx: { color: 'gray' } }}
            />

            <Button
              type="submit"
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
              Log In
            </Button>
          </form>

          <Box mt={3} display="flex" justifyContent="space-between" fontSize="0.875rem">
            <Link
              component={RouterLink}
              to="/register"
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
              Register
            </Link>
            <Link
              component={RouterLink}
              to="/forgot-password"
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
              Forgot Password?
            </Link>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${loginImage})`,
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
            Welcome back!
          </Typography>
          <Typography variant="body1">
            Share your travel stories, explore hidden gems, and connect with fellow adventurers.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
