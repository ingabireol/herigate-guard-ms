import React, { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signin, signup } from '../../actions/auth.action';
import * as api from '../../api/api';
import Input from './input';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaSpinner } from 'react-icons/fa';



const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (isSignup) {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  }, [formData, isSignup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isSignup) {
        await dispatch(signup(formData, navigate));
      } else {
        await dispatch(signin(formData, navigate));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
    setError('');
    setFormErrors({});
    setFormData(initialState);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError('');

        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const googleUser = {
          email: userInfoResponse.data.email,
          name: userInfoResponse.data.name,
          googleId: userInfoResponse.data.sub,
          imageUrl: userInfoResponse.data.picture,
        };

        const { data } = await api.googleSignIn(googleUser);
        dispatch({ type: 'AUTH', data });
        navigate('/');
      } catch (error) {
        setError('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-sky-500 p-4 rounded-full text-white shadow-lg">
            <FaLock size={28} />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-gray-800">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="firstName" label="First Name" handleChange={handleChange} value={formData.firstName} error={formErrors.firstName} />
              <Input name="lastName" label="Last Name" handleChange={handleChange} value={formData.lastName} error={formErrors.lastName} />
            </div>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} value={formData.email} error={formErrors.email} />
          <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange} value={formData.password} error={formErrors.password} />
          {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} value={formData.confirmPassword} error={formErrors.confirmPassword} />}

          <button type="submit" className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition duration-300 flex items-center justify-center">
            {isLoading ? <FaSpinner className="animate-spin" /> : isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={() => googleLogin()} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition duration-300">
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="text-sm text-center mt-6 cursor-pointer text-sky-600 hover:text-sky-700" onClick={switchMode}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Auth;