import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #000a14, #011a2d, #032744)",
        boxShadow: "0 2px 8px rgba(0, 225, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 10,
        transition: "background 0.4s ease-in-out"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 } }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#E0F7FA",
            fontFamily: "Pridi, DM Serif Display, serif",
            textShadow: "0 0 10px rgba(0, 225, 255, 0.5)",
            letterSpacing: 0.8,
            transition: "all 0.3s ease",
            '&:hover': {
              textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
              color: '#e0ffff'
            }
          }}
        >
          TravelMemo
          <Box component="span" sx={{ color: "#4dd0e1", ml: 0.5 }}>ries.</Box>
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#e0f2f1",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0ffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                backdropFilter: 'blur(6px)'
              }
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/explore"
            sx={{
              color: "#e0f2f1",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0ffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                backdropFilter: 'blur(6px)'
              }
            }}
          >
            Explore
          </Button>

          {user && user.group === 1 && (
            <Button
              component={Link}
              to="/my-gallery"
              sx={{
                color: "#e0f2f1",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#e0ffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                  backdropFilter: 'blur(6px)'
                }
              }}
            >
              My Gallery
            </Button>
          )}

          {user ? (
            <>
              <Typography color="#e0f7fa" sx={{ mt: 1 }}>Hi, {user.username}</Typography>
              <Button
                onClick={logout}
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  color: "#e0f7fa",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 3,
                  textTransform: "none",
                  backdropFilter: "blur(6px)",
                  '&:hover': {
                    color: '#ffffff',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.2)',
                    borderColor: "#ffffff"
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#e0f2f1",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#e0ffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 0 10px rgba(0, 225, 255, 0.15)',
                    backdropFilter: 'blur(6px)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  color: "#e0f7fa",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 3,
                  textTransform: "none",
                  backdropFilter: "blur(6px)",
                  '&:hover': {
                    color: '#ffffff',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.2)',
                    borderColor: "#ffffff"
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
