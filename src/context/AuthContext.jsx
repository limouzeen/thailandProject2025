import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { username: 'admin', group: 1 },
  { username: 'guest', group: 2 },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    const found = mockUsers.find((u) => u.username === username);
    if (found) setUser(found);
    else alert('User not found');
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
