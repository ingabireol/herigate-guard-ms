// src/store/auth-context.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import authService, { AuthResponse, LoginCredentials, SignupCredentials } from '@/lib/auth/auth-service';

type User = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage on client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Auto refresh token when it's about to expire
  useEffect(() => {
    if (token) {
      // Set up automatic token refresh
      const tokenRefreshInterval = setInterval(() => {
        refreshToken();
      }, 20 * 60 * 1000); // Refresh every 20 minutes

      return () => clearInterval(tokenRefreshInterval);
    }
  }, [token]);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const authResponse = await authService.login(credentials);
      
      // Store auth data
      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email,
        roles: authResponse.roles,
      }));

      setToken(authResponse.token);
      setUser({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email,
        roles: authResponse.roles,
      });

      toast({
        title: "Login successful",
        description: `Welcome back, ${authResponse.username}!`,
      });

      // Redirect to dashboard or home
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (credentials: SignupCredentials) => {
    setLoading(true);
    try {
      await authService.signup(credentials);

      toast({
        title: "Registration successful",
        description: "Your account has been created. Please login to continue.",
      });

      // Redirect to login page
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.response?.data?.message || "An error occurred during registration",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Reset state
      setToken(null);
      setUser(null);

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });

      // Redirect to home
      router.push('/');
    }
  };

  // Check if user has a specific role
  const hasRole = (role: string) => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const authResponse = await authService.refreshToken(storedRefreshToken);

      // Update tokens and user data
      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      
      setToken(authResponse.token);
      
      // Optionally update user data if it changed
      if (user && (
        user.username !== authResponse.username ||
        user.email !== authResponse.email ||
        JSON.stringify(user.roles) !== JSON.stringify(authResponse.roles)
      )) {
        const updatedUser = {
          id: authResponse.id,
          username: authResponse.username,
          email: authResponse.email,
          roles: authResponse.roles,
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      // For security reasons, log the user out if token refresh fails
      logout();
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated,
      hasRole,
      refreshToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};