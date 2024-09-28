import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { logoutUser } from '@/api/auth-api';
import { getCurrentUser } from '@/api/user-api';
import { UserResponse } from '@/types/UserType';

interface AuthContextType {
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  userLogout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const response = await getCurrentUser();
        setUser(response.data);
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
      await logoutUser();
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
};

export default AuthProvider;
