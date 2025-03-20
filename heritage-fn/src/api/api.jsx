// api.jsx
import axios from 'axios';

// Create axios instance with configuration
const API = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor with error handling
API.interceptors.request.use(
    (req) => {
        const profile = localStorage.getItem('profile');
        if (profile) {
            const token = JSON.parse(profile).token;
            if (token) {
                req.headers.Authorization = `Bearer ${token}`;
            }
        }
        return req;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific HTTP status codes
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized - maybe clear local storage and redirect to login
                    localStorage.removeItem('profile');
                    window.location.href = '/auth';
                    break;
                case 403:
                    // Handle forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Handle not found
                    console.error('Resource not found');
                    break;
                default:
                    console.error('Server error:', error.response.data);
            }
        } else if (error.request) {
            // Handle network errors
            console.error('Network error:', error.request);
        }
        return Promise.reject(error);
    }
);


// Auth-related API calls with better error handling
export const signIn = (formData) => 
    API.post('/api/auth/signin', formData).catch(error => {
        throw new Error(`Sign in failed: ${error.message}`);
    });

export const signUp = (formData) => 
    API.post('/api/auth/signup', formData).catch(error => {
        throw new Error(`Sign up failed: ${error.message}`);
    });

export const googleSignIn = (userData) => 
    API.post('/api/auth/google', userData).catch(error => {
        throw new Error(`Google sign in failed: ${error.message}`);
    });