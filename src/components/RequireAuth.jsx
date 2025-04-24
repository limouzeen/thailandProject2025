// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; 

// function RequireAuth({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// }

// export default RequireAuth;


import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

function RequireAuth({ children }) {
  const { user, isLoadingUser } = useAuth();

  // ยังโหลด user อยู่ → แสดง spinner หรือ null
  if (isLoadingUser) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="info" />
      </Box>
    );
  }

  //  ถ้า user ไม่มี → redirect ไป login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ถ้า user login อยู่ → แสดงหน้าที่ร้องขอ
  return children;
}

export default RequireAuth;
