import { Box, Typography, Fade, Button, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";
import templeImg from '../assets/1.png';

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 150, 255, 0.5); }
  50% { box-shadow: 0 0 40px rgba(0, 150, 255, 0.9); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const moonFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

export default function HeroScene() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "radial-gradient(ellipse at top right, #002b4a, #000910 60%)",
        fontFamily: '"Poppins", sans-serif'
      }}
    >
      {/* Text Content */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 4, md: 10 },
          py: 10,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Fade in timeout={1000}>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#fff",
                textShadow: "0 0 16px #00C4FF",
                fontFamily: "DM Serif Display, serif",
                background: "linear-gradient(to right, #ffffff, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Capture Your Travel Adventures with <br />
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  background: "linear-gradient(to right, #00C4FF, #00FFF0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TravelMemories.
              </Box>
            </Typography>
            <Typography variant="body1" color="#cbd6f1" mb={3}>
              Welcome to TravelMemories, where you can share and discover travel
              moments captured by fellow adventurers.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#00C4FF",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "40px",
                  px: 4,
                  animation: `${glowPulse} 3s infinite ease-in-out`,
                }}
              >
                Upload
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: "40px",
                  '&:hover': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.2)',
                borderColor: "#ffffff"
              }
                  
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: "40px",
                  '&:hover': {
                color: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.2)',
                borderColor: "#ffffff"
              }
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Box>

      {/* Moon and Stars Overlay */}
      <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            position: "absolute",
            top: 60,
            right: 120,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, #cceeff, #88ccff 50%, #337799)",
            boxShadow: "0 0 30px 10px #66ccff66",
            animation: `${moonFloat} 4s ease-in-out infinite`,
          }}
        />

        {[...Array(50)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              backgroundColor: "#ffffffcc",
              boxShadow: "0 0 6px #fff",
              animation: `${sparkle} ${2 + Math.random() * 5}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Image under the moon */}
        <Box
          component="img"
          src={templeImg}
          alt="Scene Element"
          sx={{
            position: "absolute",
            top: -85,
            right: 35,
            width: 800,
            height: "auto",
            borderRadius: "1px",
            // boxShadow: "0 0 30px #00C4FF, 0 0 60px #00FFF0",
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
}
