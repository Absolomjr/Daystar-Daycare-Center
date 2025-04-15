import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    nin: null,
    dateOfBirth: null,
    nextOfKin: {
      name: null,
      phoneNumber: null,
      relationship: null
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('nextOfKin.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nextOfKin: {
          ...prev.nextOfKin,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.role === 'babysitter') {
      if (!formData.nin) {
        setError('National ID Number is required for babysitters');
        return false;
      }

      if (!formData.dateOfBirth) {
        setError('Date of Birth is required for babysitters');
        return false;
      }

      const age = validateAge(formData.dateOfBirth);
      if (age < 21 || age > 35) {
        setError('Babysitter must be between 21-35 years old');
        return false;
      }

      if (!formData.nextOfKin.name || !formData.nextOfKin.phoneNumber || !formData.nextOfKin.relationship) {
        setError('All Next of Kin information is required for babysitters');
        return false;
      }
    }

    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Unexpected response from server.');
      }

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/login');
      } else {
        console.error('Server responded with error:', data);
        setError(data.message || 'Registration failed. Please try again.');
      }

    } catch (error) {
      console.error('Network or processing error:', error);
      setError(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="logo">
            <h1>Daystar Daycare</h1>
          </Link>
        </div>

        <h2>Create Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="babysitter">Babysitter</option>
            </select>
          </div>

          {formData.role === 'babysitter' && (
            <div className="babysitter-info">
              <div className="form-group">
                <label htmlFor="nin">National ID Number (NIN)</label>
                <input
                  type="text"
                  id="nin"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="next-of-kin-section">
                <h3>Next of Kin Information</h3>
                <div className="form-group">
                  <label htmlFor="nextOfKinName">Name</label>
                  <input
                    type="text"
                    id="nextOfKinName"
                    name="nextOfKin.name"
                    value={formData.nextOfKin.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nextOfKinPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="nextOfKinPhone"
                    name="nextOfKin.phoneNumber"
                    value={formData.nextOfKin.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nextOfKinRelationship">Relationship</label>
                  <select
                    id="nextOfKinRelationship"
                    name="nextOfKin.relationship"
                    value={formData.nextOfKin.relationship}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
