import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BabysitterDashboard from './components/dashboard/babysitter/BabysitterDashboard';
import ManagerDashboard from './components/dashboard/manager/ManagerDashboard';

// Protected Route component
const ProtectedRoute = ({ children, allowedUserType }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route 
        path="/babysitter-dashboard/*" 
        element={
          <ProtectedRoute allowedUserType="babysitter">
            <BabysitterDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/manager-dashboard/*" 
        element={
          <ProtectedRoute allowedUserType="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App; 