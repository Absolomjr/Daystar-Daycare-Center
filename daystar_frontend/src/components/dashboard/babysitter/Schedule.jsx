import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock schedule data
  const scheduleData = {
    currentAssignments: [
      {
        id: 1,
        familyName: 'Johnson Family',
        date: '2024-01-22',
        time: '09:00 AM - 02:00 PM',
        children: [
          { name: 'Emma Johnson', age: 4 },
          { name: 'Lucas Johnson', age: 6 }
        ],
        location: '123 Pine Street',
        status: 'in-progress'
      },
      {
        id: 2,
        familyName: 'Smith Family',
        date: '2024-01-22',
        time: '03:00 PM - 07:00 PM',
        children: [
          { name: 'Oliver Smith', age: 3 }
        ],
        location: '456 Oak Avenue',
        status: 'upcoming'
      }
    ],
    upcomingAssignments: [
      {
        id: 3,
        familyName: 'Williams Family',
        date: '2024-01-23',
        time: '08:00 AM - 04:00 PM',
        children: [
          { name: 'Sophia Williams', age: 5 },
          { name: 'James Williams', age: 3 }
        ],
        location: '789 Maple Drive',
        status: 'confirmed'
      },
      {
        id: 4,
        familyName: 'Brown Family',
        date: '2024-01-24',
        time: '09:00 AM - 01:00 PM',
        children: [
          { name: 'Ava Brown', age: 4 }
        ],
        location: '321 Elm Street',
        status: 'confirmed'
      }
    ]
  };

  const handleSetAvailability = () => {
    navigate('/babysitter/confirm-availability');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return '#4CAF50';
      case 'upcoming':
        return '#2196F3';
      case 'confirmed':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div className="header-content">
          <h2>My Schedule</h2>
          <button className="set-availability-btn" onClick={handleSetAvailability}>
            Set Availability
          </button>
        </div>
        <div className="schedule-summary">
          <div className="summary-card">
            <span className="card-label">Today's Assignments</span>
            <span className="card-value">{scheduleData.currentAssignments.length}</span>
          </div>
          <div className="summary-card">
            <span className="card-label">Upcoming Assignments</span>
            <span className="card-value">{scheduleData.upcomingAssignments.length}</span>
          </div>
        </div>
      </div>

      <div className="schedule-section">
        <h3>Current Assignments</h3>
        <div className="assignments-grid">
          {scheduleData.currentAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="card-header" style={{ 
                borderLeft: `4px solid ${getStatusColor(assignment.status)}`
              }}>
                <h4>{assignment.familyName}</h4>
                <span className="status-badge" style={{
                  backgroundColor: getStatusColor(assignment.status)
                }}>
                  {assignment.status}
                </span>
              </div>
              <div className="card-content">
                <div className="info-row">
                  <i className="far fa-clock"></i>
                  <span>{assignment.time}</span>
                </div>
                <div className="info-row">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{assignment.location}</span>
                </div>
                <div className="children-info">
                  <h5>Children:</h5>
                  {assignment.children.map((child, index) => (
                    <p key={index}>{child.name} ({child.age} years)</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="schedule-section">
        <h3>Upcoming Assignments</h3>
        <div className="assignments-grid">
          {scheduleData.upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="card-header" style={{ 
                borderLeft: `4px solid ${getStatusColor(assignment.status)}`
              }}>
                <h4>{assignment.familyName}</h4>
                <span className="status-badge" style={{
                  backgroundColor: getStatusColor(assignment.status)
                }}>
                  {assignment.status}
                </span>
              </div>
              <div className="card-content">
                <div className="info-row">
                  <i className="far fa-calendar"></i>
                  <span>{assignment.date}</span>
                </div>
                <div className="info-row">
                  <i className="far fa-clock"></i>
                  <span>{assignment.time}</span>
                </div>
                <div className="info-row">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{assignment.location}</span>
                </div>
                <div className="children-info">
                  <h5>Children:</h5>
                  {assignment.children.map((child, index) => (
                    <p key={index}>{child.name} ({child.age} years)</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
