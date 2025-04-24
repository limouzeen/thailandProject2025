// context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BASE_URL = 'https://thailand-project2025-backend.vercel.app';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      });

      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);
        return { status: 200 };
      } else {
        return { status: res.status };
      }
    } catch (err) {
      console.error("Login Error:", err);
      return { status: 500 };
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
