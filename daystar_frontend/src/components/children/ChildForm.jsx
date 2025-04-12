import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addChild, updateChild } from '../../redux/slices/childrenSlice';
import api from '../../services/api';

const ChildForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    guardianName: '',
    guardianContact: '',
    alternativeContact: '',
    sessionType: 'full-day',
    specialNeeds: '',
    allergies: '',
    medications: '',
    dietaryRestrictions: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    }
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchChild = async () => {
        try {
          const response = await api.get(`/children/${id}`);
          setFormData(response.data);
        } catch (error) {
          setError('Failed to fetch child details');
        }
      };
      fetchChild();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isEditing) {
        const response = await api.put(`/children/${id}`, formData);
        dispatch(updateChild(response.data));
      } else {
        const response = await api.post('/children', formData);
        dispatch(addChild(response.data));
      }
      navigate('/children');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save child information');
    }
  };

  return (
    <div className="child-form card">
      <h2>{isEditing ? 'Edit Child Information' : 'Register New Child'}</h2>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-control"
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
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sessionType">Session Type *</label>
              <select
                id="sessionType"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="full-day">Full Day</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Guardian Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardianName">Guardian Name *</label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardianContact">Guardian Contact *</label>
              <input
                type="tel"
                id="guardianContact"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Medical Information</h3>
          <div className="form-group">
            <label htmlFor="specialNeeds">Special Needs</label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
            <textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Emergency Contact</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContact.name">Name *</label>
              <input
                type="text"
                id="emergencyContact.name"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContact.relationship">Relationship *</label>
              <input
                type="text"
                id="emergencyContact.relationship"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContact.phone">Phone *</label>
              <input
                type="tel"
                id="emergencyContact.phone"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/children')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update' : 'Register'} Child
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChildForm;
