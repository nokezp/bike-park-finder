import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config/constants';

// Define types
type User = {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  createdAt: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from storage
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Set auth header for all future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error('Error loading auth from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      
      const { token: newToken, user: newUser } = response.data;
      
      // Save to state
      setToken(newToken);
      setUser(newUser);
      
      // Save to storage
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Set auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('Network error. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token: newToken, user: newUser } = response.data;
      
      // Save to state
      setToken(newToken);
      setUser(newUser);
      
      // Save to storage
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Set auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Clear storage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      // Clear state
      setToken(null);
      setUser(null);
      
      // Clear auth header
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 