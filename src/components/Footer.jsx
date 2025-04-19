import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to top,rgb(1, 5, 10),rgb(2, 13, 22))',
        color: 'gray',
        py: 4,
        mt: 0,
        borderTop: '2px solid',
        borderImage: 'linear-gradient(to right,#01d0f5,rgba(236, 255, 126, 0.55)) 1',
        boxShadow: 'inset 0 10px 20px rgba(0, 153, 191, 0.17)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Twinkling stars */}
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
            backgroundColor: 'rgba(255,255,255,0.5)',
            boxShadow: '0 0 6px rgba(255,255,255,0.4)',
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          }}
        />
      ))}

      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3}>
          <Box>
            <Typography variant="h6" color="white" fontWeight="bold">
              Amazing Thailand 2025
            </Typography>
            <Typography variant="body2">
              Share your beautiful moments from Thailand with the world.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            {['About', 'Contact', 'Help'].map((text, index) => (
              <Link
                key={index}
                href="#"
                underline="hover"
                color="inherit"
                sx={{
                  transition: '0.3s',
                  '&:hover': { color: '#01d0f5' },
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
              <IconButton
                key={i}
                color="inherit"
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    color: '#01d0f5',
                    transform: 'scale(1.2)',
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          mt={3}
          sx={{
            color: 'gray',
            textShadow: '0 0 5px rgba(0,191,165,0.2)',
          }}
        >
          © 2025 Travel Memories. All rights reserved.
        </Typography>
      </Container>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </Box>
  );
}
