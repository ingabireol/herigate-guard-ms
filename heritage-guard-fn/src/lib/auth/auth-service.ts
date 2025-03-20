// src/lib/auth/auth-service.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenType: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/api/auth/signin`, credentials);
    return response.data;
  },

  signup: async (credentials: SignupCredentials): Promise<any> => {
    const response = await axios.post(`${API_URL}/api/auth/signup`, credentials);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });
    return response.data;
  },

  logout: async (): Promise<any> => {
    const response = await axios.post(`${API_URL}/api/auth/logout`);
    return response.data;
  },

  getCurrentUser: async (token: string): Promise<any> => {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default authService;