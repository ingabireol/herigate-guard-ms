// src/actions/auth.action.js
import { AUTH, AUTH_ERROR, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);
    
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ 
      type: AUTH_ERROR, 
      payload: error?.response?.data?.message || 'Something went wrong'
    });
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ 
      type: AUTH_ERROR, 
      payload: error?.response?.data?.message || 'Something went wrong'
    });
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem('profile');
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Google OAuth authentication
export const googleAuth = (tokenId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.googleAuth(tokenId);
    
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ 
      type: AUTH_ERROR, 
      payload: error?.response?.data?.message || 'Google authentication failed'
    });
  } finally {
    dispatch({ type: END_LOADING });
  }
};
