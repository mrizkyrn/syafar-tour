import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { logout } from '@/api/auth-api';
import axios from 'axios';

interface User {
  id: number;
  full_name: string;
  email: string;
  whatsapp_number: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userLogout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v1/auth/me`, { withCredentials: true });
        setUser(response.data.user);
        
      } catch (error: any) {
        console.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const userLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return <AuthContext.Provider value={{ user, setUser, userLogout, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;