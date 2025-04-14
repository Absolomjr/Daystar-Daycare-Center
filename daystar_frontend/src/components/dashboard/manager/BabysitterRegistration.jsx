import React, { useState } from 'react';
import './ManagerComponents.css';

// import { useDispatch } from 'react-redux';
const BabysitterRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nin: '',
    dateOfBirth: '',
    nextOfKin: {
      name: '',
      phoneNumber: '',
      relationship: ''
    }
  });

  const [errors, setErrors] = useState({});

  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 21 && age <= 35;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.nin.trim()) {
      newErrors.nin = 'NIN is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateAge(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Babysitter must be between 21-35 years old';
    }

    if (!formData.nextOfKin.name.trim()) {
      newErrors['nextOfKin.name'] = 'Next of kin name is required';
    }

    if (!formData.nextOfKin.phoneNumber.trim()) {
      newErrors['nextOfKin.phoneNumber'] = 'Next of kin phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
    }
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

  return (
    <div className="babysitter-registration">
      <div className="registration-header">
        <h2>Register New Babysitter</h2>
        <p>Enter babysitter details below</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nin">National ID Number (NIN) *</label>
            <input
              type="text"
              id="nin"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              className={errors.nin ? 'error' : ''}
            />
            {errors.nin && <span className="error-message">{errors.nin}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={errors.dateOfBirth ? 'error' : ''}
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-section">
            <h3>Next of Kin Information</h3>
            <div className="form-group">
              <label htmlFor="nextOfKinName">Name *</label>
              <input
                type="text"
                id="nextOfKinName"
                name="nextOfKin.name"
                value={formData.nextOfKin.name}
                onChange={handleChange}
                className={errors['nextOfKin.name'] ? 'error' : ''}
              />
              {errors['nextOfKin.name'] && (
                <span className="error-message">{errors['nextOfKin.name']}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nextOfKinPhone">Phone Number *</label>
              <input
                type="tel"
                id="nextOfKinPhone"
                name="nextOfKin.phoneNumber"
                value={formData.nextOfKin.phoneNumber}
                onChange={handleChange}
                className={errors['nextOfKin.phoneNumber'] ? 'error' : ''}
              />
              {errors['nextOfKin.phoneNumber'] && (
                <span className="error-message">{errors['nextOfKin.phoneNumber']}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nextOfKinRelationship">Relationship</label>
              <select
                id="nextOfKinRelationship"
                name="nextOfKin.relationship"
                value={formData.nextOfKin.relationship}
                onChange={handleChange}
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

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Register Babysitter
          </button>
          <button type="button" className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BabysitterRegistration; 