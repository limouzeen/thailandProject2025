// import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Stack, Avatar } from '@mui/material';
// import { keyframes } from '@emotion/react';

// import floatingImg from '../assets/floating-market.jpg';
// import beachImg from '../assets/kohsamui.jpg';
// import templeImg from '../assets/chiangrai.jpg';

// const fadeGlow = keyframes`
//   0%, 100% { box-shadow: 0 0 12px rgba(0,196,255,0.05); }
//   50% { box-shadow: 0 0 24px rgba(0,255,255,0.15); }
// `;

// const testimonials = [
//   {
//     name: 'Somsri T.',
//     quote: 'Chiang Mai in winter is magical! The temples, the weather, the food — all amazing!',
//     avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
//   },
//   {
//     name: 'John K.',
//     quote: 'I never thought I’d love Thai islands this much. Koh Lipe is a hidden paradise!',
//     avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
//   },
//   {
//     name: 'Nina P.',
//     quote: 'Bangkok’s night markets are unforgettable. I shopped and ate non-stop!',
//     avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
//   },
// ];

// export default function Testimonials() {
//   return (
//     <Box
//       sx={{
//         px: { xs: 3, md: 10 },
//         mt: -20,
//         py: 10,
//         background: 'linear-gradient(to top, rgb(3, 17, 36), rgba(5, 28, 48, 0.97))',
//         color: '#e0f7fa',
//         textAlign: 'center',
//       }}
//     >
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         mb={6}
//         sx={{
//           textShadow: '0 0 14px rgba(0,196,255,0.4)',
//           letterSpacing: 1.2,
//           color: '#e0f7fa'
//         }}
//       >
//         What Travelers Say
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {testimonials.map((t, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Card
//               sx={{
//                 bgcolor: 'rgba(255, 255, 255, 0.025)',
//                 color: 'white',
//                 borderRadius: 6,
//                 border: '1px solid rgba(255,255,255,0.06)',
//                 backdropFilter: 'blur(8px)',
//                 WebkitBackdropFilter: 'blur(8px)',
//                 p: 3,
//                 height: '100%',
//                 transition: 'all 0.4s ease',
//                 '&:hover': {
//                   boxShadow: '0 0 20px rgba(0,225,255,0.1)'
//                 }
//               }}
//             >
//               <Stack direction="row" spacing={2} alignItems="center" mb={2}>
//                 <Avatar src={t.avatar} alt={t.name} sx={{ width: 48, height: 48 }} />
//                 <Typography fontWeight="bold" color="#e0f7fa">{t.name}</Typography>
//               </Stack>
//               <Typography variant="body2" color="#b0bec5" fontStyle="italic">
//                 “{t.quote}”
//               </Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import { Box, Grid, Typography, Stack, Avatar } from '@mui/material';
import { keyframes } from '@emotion/react';

const softPulse = keyframes`
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
`;

const testimonials = [
  {
    name: 'Somsri T.',
    quote: 'Chiang Mai in winter is magical! The temples, the weather, the food — all amazing!',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'John K.',
    quote: 'I never thought I’d love Thai islands this much. Koh Lipe is a hidden paradise!',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Nina P.',
    quote: 'Bangkok’s night markets are unforgettable. I shopped and ate non-stop!',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        mt: -30,
        py: 20,
        background: 'linear-gradient(to top,rgba(2, 9, 15, 0.9), rgba(5, 21, 36, 0.93), rgb(4, 21, 36), rgb(6, 27, 44))',
        color: '#e0f7fa',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={6}
        sx={{
          textShadow: '0 0 16px rgba(0,225,255,0.35)',
          letterSpacing: 1.2,
          color: '#e0f7fa'
        }}
      >
        What Travelers Say
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {testimonials.map((t, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Stack
              spacing={2}
              sx={{
                p: 1.5,
                background: 'rgba(255, 255, 255, 0.025)',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                height: '90%',
                animation: `${softPulse} 6s ease-in-out infinite`,
                transition: 'all 0.4s ease',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(0,225,255,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={t.avatar} alt={t.name} sx={{ width: 48, height: 48, border: '2px solid rgba(255,255,255,0.2)' }} />
                <Typography fontWeight="bold" color="#e0f7fa" sx={{ fontSize: '1.05rem' }}>{t.name}</Typography>
              </Stack>
              <Typography variant="body2" color="#e0f7ff" fontStyle="italic" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                “{t.quote}”
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
