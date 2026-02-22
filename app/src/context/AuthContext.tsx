import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUser: User = {
  id: '1',
  email: 'user@adblockpro.com',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  role: 'user',
  plan: 'pro',
  isVerified: true,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-02-20T00:00:00Z',
  lastLogin: '2024-02-22T08:30:00Z',
  stats: {
    adsBlocked: 154320,
    trackersBlocked: 89340,
    dataSaved: '2.4 GB',
    timeSaved: '48 hours',
    lastUpdated: '2024-02-22T00:00:00Z',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('adblock_token');
    if (token) {
      // In real app, validate token and fetch user
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login - in real app, call API
      if (credentials.email && credentials.password) {
        setUser(mockUser);
        localStorage.setItem('adblock_token', 'mock_token_' + Date.now());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (_credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock register - in real app, call API
      setUser(mockUser);
      localStorage.setItem('adblock_token', 'mock_token_' + Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adblock_token');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
