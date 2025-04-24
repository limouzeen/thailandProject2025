// context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BASE_URL = 'https://thailand-project2025-backend.vercel.app';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { userEmail: email, userPassword: password });
      setUser(res.data.user);
      return true; // สำเร็จ
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      return false; // ล้มเหลว
    }
  };
  

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
