import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBabysitter, updateBabysitter } from '../../redux/slices/babysitterSlice';
import api from '../../services/api';

const BabysitterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nin: '', //  This requires the National Identification Number(NIN)
    age: '',
    nextOfKin: {
      name: '',
      phone: '',
      relationship: '',
    }
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchBabysitter = async () => {
        try {
          const response = await api.get(`/babysitters/${id}`);
          setFormData(response.data);
        } catch (error) {
          setError('Failed to fetch babysitter details');
        }
      };
      fetchBabysitter();
    }
  }, [id, isEditing]);

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
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.nin) {
      setError('Please fill in all required fields');
      return false;
    }
    
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 21 || age > 35) {
      setError('Age must be between 21 and 35 years');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      if (isEditing) {
        const response = await api.put(`/babysitters/${id}`, formData);
        dispatch(updateBabysitter(response.data));
      } else {
        const response = await api.post('/babysitters', formData);
        dispatch(addBabysitter(response.data));
      }
      navigate('/babysitters');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save babysitter');
    }
  };

  return (
    <div className="babysitter-form card">
      <h2>{isEditing ? 'Edit Babysitter' : 'Add New Babysitter'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nin">National ID Number *</label>
            <input
              type="text"
              id="nin"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
              min="21"
              max="35"
              required
            />
          </div>
        </div>
              {/* required next of kin information */}
        <h3>Next of Kin Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nextOfKin.name">Name *</label>
            <input
              type="text"
              id="nextOfKin.name"
              name="nextOfKin.name"
              value={formData.nextOfKin.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nextOfKin.phone">Phone *</label>
            <input
              type="tel"
              id="nextOfKin.phone"
              name="nextOfKin.phone"
              value={formData.nextOfKin.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nextOfKin.relationship">Relationship *</label>
          <input
            type="text"
            id="nextOfKin.relationship"
            name="nextOfKin.relationship"
            value={formData.nextOfKin.relationship}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/babysitters')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update' : 'Save'} Babysitter
          </button>
        </div>
      </form>
    </div>
  );
};

export default BabysitterForm;
