import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BASE_URL = 'https://thailand-project2025-backend.vercel.app';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem('traveller');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoadingUser(false); //รอจนโหลด user เสร็จ
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        userEmail: email,
        userPassword: password
      });

      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem('traveller', JSON.stringify(res.data.user));
        return { status: 200 };
      } else {
        return { status: res.status };
      }
    } catch (err) {
      console.error("Login Error:", err);
      return { status: 500 };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('traveller');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
