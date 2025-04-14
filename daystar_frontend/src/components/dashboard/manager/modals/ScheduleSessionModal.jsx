import React, { useState, useEffect } from 'react';
import './Modals.css';

const ScheduleSessionModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    childId: '',
    babysitterId: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });
  const [children, setChildren] = useState([]);
  const [babysitters, setBabysitters] = useState([]);

  useEffect(() => {
    // Fetch children and babysitters from API
    fetchChildren();
    fetchBabysitters();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/children');
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const fetchBabysitters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/manager/babysitters');
      const data = await response.json();
      setBabysitters(data);
    } catch (error) {
      console.error('Error fetching babysitters:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/attendance/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule session');
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error scheduling session:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Schedule New Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Child</label>
            <select
              required
              value={formData.childId}
              onChange={(e) => setFormData({...formData, childId: e.target.value})}
            >
              <option value="">Select Child</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Babysitter</label>
            <select
              required
              value={formData.babysitterId}
              onChange={(e) => setFormData({...formData, babysitterId: e.target.value})}
            >
              <option value="">Select Babysitter</option>
              {babysitters.map(sitter => (
                <option key={sitter.id} value={sitter.id}>
                  {sitter.firstName} {sitter.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              required
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Schedule Session</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;