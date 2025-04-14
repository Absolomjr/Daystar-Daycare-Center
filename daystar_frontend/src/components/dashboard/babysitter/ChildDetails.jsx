import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChildDetails.css';

const ChildDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { childDetails } = location.state || {};

  if (!childDetails) {
    return <p>No child details available.</p>;
  }

  return (
    <div className="child-details-container">
      <h2>Child Details</h2>
      <div className="child-info">
        <p><strong>Name:</strong> {childDetails.name}</p>
        <p><strong>Age:</strong> {childDetails.age}</p>
        <p><strong>Allergies:</strong> {childDetails.allergies}</p>
        <p><strong>Special Needs:</strong> {childDetails.specialNeeds}</p>
      </div>
      <button onClick={() => navigate('/assignments')}>Back to Assignments</button>
    </div>
  );
};

export default ChildDetails; 