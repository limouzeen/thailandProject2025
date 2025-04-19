import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.4); }
`;

export default function ThemedSectionDivider() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 2,
        my: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glowing Galaxy Line */}
      <Box
        sx={{
          height: 1,
          width: '100%',
          maxWidth: 1000,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          backgroundSize: '200% auto',
          animation: `${shimmer} 5s ease-in-out infinite`,
          borderRadius: 1,
          boxShadow: '0 0 12px rgba(255,255,255,0.08)',
        }}
      />

      {/* Galaxy Stars */}
      {[...Array(14)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            width: 1.5,
            height: 1.5,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.3)',
            boxShadow: '0 0 6px rgba(255,255,255,0.2)',
            animation: `${starTwinkle} ${2 + Math.random() * 4}s ease-in-out infinite`,
          }}
        />
      ))}
    </Box>
  );
}
