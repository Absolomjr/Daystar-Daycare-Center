import React, { useState } from 'react';
import './Modals.css';

const AddChildModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    parentEmail: '',
    allergies: '',
    specialNeeds: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming you store your token in localStorage after login
  
      const response = await fetch('http://localhost:5000/api/children', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add child');
      }
  
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Child</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Parent Email</label>
            <input
              type="email"
              required
              value={formData.parentEmail}
              onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Allergies (if any)</label>
            <textarea
              value={formData.allergies}
              onChange={(e) => setFormData({...formData, allergies: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Special Needs (if any)</label>
            <textarea
              value={formData.specialNeeds}
              onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Add Child</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;