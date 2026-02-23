import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('eduerp_user');
    const storedRole = localStorage.getItem('eduerp_role');
    const storedToken = localStorage.getItem('eduerp_token');

    if (storedUser && storedRole && storedToken) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const mockCredentials = {
    'student@eduerp.com': { password: 'student123', role: 'student', name: 'Aarav Kumar' },
    'teacher@eduerp.com': { password: 'teacher123', role: 'teacher', name: 'Dr. Rajesh Kumar' },
    'admin@eduerp.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'administrator@eduerp.com': { password: 'admin123', role: 'administrator', name: 'Administrator User' },
  };

  const login = (email, password, selectedRole) => {
    const cred = mockCredentials[email];
    if (cred && cred.password === password && cred.role === selectedRole) {
      const userData = { email, name: cred.name, role: selectedRole };
      const mockToken = 'mock-token-' + Date.now();

      setUser(userData);
      setRole(selectedRole);
      setToken(mockToken);

      localStorage.setItem('eduerp_user', JSON.stringify(userData));
      localStorage.setItem('eduerp_role', selectedRole);
      localStorage.setItem('eduerp_token', mockToken);

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('eduerp_user');
    localStorage.removeItem('eduerp_role');
    localStorage.removeItem('eduerp_token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, role, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
