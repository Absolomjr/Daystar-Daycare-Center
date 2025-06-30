import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import api from '../services/api';
imports used for the authentication

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      dispatch(loginSuccess({
        user: response.data,
        token
      }));
    } catch (error) {
      dispatch(loginFailure(error.message));
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      dispatch(loginSuccess({ user, token }));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      dispatch(loginFailure(error.message));
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await api.put('/auth/profile', userData);
      dispatch(loginSuccess({
        user: response.data,
        token: localStorage.getItem('token')
      }));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
    updateProfile,
  };
};
