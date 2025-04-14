import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetAvailability.css';

const SetAvailability = () => {
  const navigate = useNavigate();
  
  // Mock pending assignments data
  const [pendingAssignments, setPendingAssignments] = useState([
    {
      id: 1,
      familyName: 'Anderson Family',
      date: '2024-01-25',
      time: '09:00 AM - 02:00 PM',
      sessionType: 'half-day',
      children: [
        { name: 'Emma Anderson', age: 4 },
        { name: 'James Anderson', age: 6 }
      ],
      location: '123 Maple Street',
      payment: 4000, // 2000 per child for half-day
      status: 'pending'
    },
    {
      id: 2,
      familyName: 'Wilson Family',
      date: '2024-01-26',
      time: '08:00 AM - 05:00 PM',
      sessionType: 'full-day',
      children: [
        { name: 'Sophia Wilson', age: 3 }
      ],
      location: '456 Oak Avenue',
      payment: 5000, // 5000 per child for full-day
      status: 'pending'
    },
    {
      id: 3,
      familyName: 'Taylor Family',
      date: '2024-01-27',
      time: '01:00 PM - 06:00 PM',
      sessionType: 'half-day',
      children: [
        { name: 'Oliver Taylor', age: 5 },
        { name: 'Ava Taylor', age: 3 }
      ],
      location: '789 Pine Road',
      payment: 4000, // 2000 per child for half-day
      status: 'pending'
    }
  ]);

  const handleAccept = (assignmentId) => {
    setPendingAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'accepted' }
          : assignment
      )
    );
    // Add API call here to update backend
  };

  const handleDecline = (assignmentId) => {
    setPendingAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'declined' }
          : assignment
      )
    );
    // Add API call here to update backend
  };

  const handleBack = () => {
    navigate('/schedule'); // Navigate back to schedule page
  };

  return (
    <div className="availability-container">
      <div className="availability-header">
        <div className="header-top">
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> Back to Schedule
          </button>
          <h2>Pending Assignments</h2>
        </div>
        <p>Review and respond to your pending assignments</p>
      </div>

      <div className="pending-assignments">
        {pendingAssignments.map((assignment) => (
          <div key={assignment.id} className={`assignment-card ${assignment.status}`}>
            <div className="card-header">
              <h3>{assignment.familyName}</h3>
              <span className={`status-badge ${assignment.status}`}>
                {assignment.status}
              </span>
            </div>
            
            <div className="card-content">
              <div className="info-section">
                <div className="info-row">
                  <i className="far fa-calendar"></i>
                  <span>Date: {assignment.date}</span>
                </div>
                <div className="info-row">
                  <i className="far fa-clock"></i>
                  <span>Time: {assignment.time}</span>
                </div>
                <div className="info-row">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Location: {assignment.location}</span>
                </div>
                <div className="info-row">
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Payment: UGX {assignment.payment.toLocaleString()}</span>
                </div>
              </div>

              <div className="children-section">
                <h4>Children:</h4>
                <div className="children-list">
                  {assignment.children.map((child, index) => (
                    <div key={index} className="child-info">
                      <i className="fas fa-child"></i>
                      <span>{child.name} ({child.age} years)</span>
                    </div>
                  ))}
                </div>
              </div>

              {assignment.status === 'pending' && (
                <div className="action-buttons">
                  <button 
                    className="accept-btn"
                    onClick={() => handleAccept(assignment.id)}
                  >
                    Accept Assignment
                  </button>
                  <button 
                    className="decline-btn"
                    onClick={() => handleDecline(assignment.id)}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetAvailability; 