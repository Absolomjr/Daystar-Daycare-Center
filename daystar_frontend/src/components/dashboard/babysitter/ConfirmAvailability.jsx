import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmAvailability.css';

const ConfirmAvailability = () => {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      familyName: 'Anderson Family',
      date: '2024-01-25',
      timeSlot: '09:00 AM - 02:00 PM',
      sessionType: 'Half Day',
      numberOfChildren: 2,
      paymentRate: '2,000 per child',
      totalPayment: '4,000',
      location: '123 Maple Street',
      status: 'pending',
      requirements: 'Experience with toddlers preferred'
    },
    {
      id: 2,
      familyName: 'Wilson Family',
      date: '2024-01-26',
      timeSlot: '08:00 AM - 05:00 PM',
      sessionType: 'Full Day',
      numberOfChildren: 1,
      paymentRate: '5,000 per child',
      totalPayment: '5,000',
      location: '456 Oak Avenue',
      status: 'pending',
      requirements: 'Must be CPR certified'
    },
    {
      id: 3,
      familyName: 'Taylor Family',
      date: '2024-01-27',
      timeSlot: '01:00 PM - 06:00 PM',
      sessionType: 'Half Day',
      numberOfChildren: 2,
      paymentRate: '2,000 per child',
      totalPayment: '4,000',
      location: '789 Pine Road',
      status: 'pending',
      requirements: 'Experience with special needs children'
    }
  ]);

  const handleConfirmAvailability = (requestId, isAvailable) => {
    setPendingRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: isAvailable ? 'confirmed' : 'declined' }
          : request
      )
    );
  };

  const handleBack = () => {
    navigate('/schedule');
  };

  return (
    <div className="confirm-availability-container">
      <div className="confirm-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back to Schedule
        </button>
        <h2>Confirm Your Availability</h2>
        <p>Review and respond to pending babysitting requests</p>
      </div>

      <div className="requests-container">
        {pendingRequests.map((request) => (
          <div key={request.id} className={`request-card ${request.status}`}>
            <div className="request-header">
              <h3>{request.familyName}</h3>
              <span className={`status-indicator ${request.status}`}>
                {request.status}
              </span>
            </div>

            <div className="request-details">
              <div className="detail-row">
                <i className="far fa-calendar"></i>
                <span>Date: {request.date}</span>
              </div>
              <div className="detail-row">
                <i className="far fa-clock"></i>
                <span>Time: {request.timeSlot}</span>
              </div>
              <div className="detail-row">
                <i className="fas fa-child"></i>
                <span>Children: {request.numberOfChildren}</span>
              </div>
              <div className="detail-row">
                <i className="fas fa-map-marker-alt"></i>
                <span>Location: {request.location}</span>
              </div>
              <div className="detail-row">
                <i className="fas fa-money-bill-wave"></i>
                <span>Payment: UGX {request.totalPayment}</span>
              </div>
              <div className="detail-row requirements">
                <i className="fas fa-clipboard-list"></i>
                <span>Requirements: {request.requirements}</span>
              </div>
            </div>

            {request.status === 'pending' && (
              <div className="request-actions">
                <button
                  className="confirm-button"
                  onClick={() => handleConfirmAvailability(request.id, true)}
                >
                  I'm Available
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleConfirmAvailability(request.id, false)}
                >
                  Not Available
                </button>
              </div>
            )}

            {request.status !== 'pending' && (
              <div className="response-message">
                {request.status === 'confirmed' 
                  ? "You've confirmed your availability"
                  : "You've declined this request"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmAvailability; 