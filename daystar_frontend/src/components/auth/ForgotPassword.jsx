import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useNotification } from '../../hooks/useNotification';
import { validation } from '../../utils/validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { post, loading } = useApi();
  const { success, error: showError } = useNotification();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validation.isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    try {
      await post('/auth/forgot-password', { email });
      setSubmitted(true);
      success('Password reset instructions have been sent to your email');
    } catch (err) {
      showError('Failed to process password reset request');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-description">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            <div className="auth-links">
              <Link to="/login" className="link-secondary">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Check Your Email</h3>
            <p>
              We've sent password reset instructions to {email}. 
              Please check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="btn btn-secondary">
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
