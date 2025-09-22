import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@gov.in',
    phone: '+91 9876543210',
    role: 'central_admin',
    level: 'National',
    permissions: ['read', 'write', 'delete', 'approve', 'admin']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@state.gov.in',
    phone: '+91 9876543211',
    role: 'state_admin',
    level: 'Uttar Pradesh',
    permissions: ['read', 'write', 'approve']
  },
  {
    id: '3',
    name: 'Amit Singh',
    email: 'amit.singh@district.gov.in',
    phone: '+91 9876543212',
    role: 'district_admin',
    level: 'Lucknow District',
    permissions: ['read', 'write']
  },
  {
    id: '4',
    name: 'Sunita Devi',
    email: 'sunita.devi@village.gov.in',
    phone: '+91 9876543213',
    role: 'village_admin',
    level: 'Rampur Village',
    permissions: ['read', 'write']
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('pm_ajay_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email and role
      const foundUser = mockUsers.find(u => 
        u.email === credentials.email && u.role === credentials.role
      );
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('pm_ajay_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pm_ajay_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};