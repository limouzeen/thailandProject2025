import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
