import React, { useState } from 'react';
import {
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import './ChildManagement.css';

const ChildManagement = () => {
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const childrenData = [
    {
      id: 1,
      name: "Emma Thompson",
      age: 4,
      parent: "Sarah Thompson",
      session: "Full-day",
      checkIn: "08:30 AM",
      checkOut: "05:30 PM",
      status: "Present"
    },
    {
      id: 2,
      name: "James Wilson",
      age: 3,
      parent: "Michael Wilson",
      session: "Half-day",
      checkIn: "09:00 AM",
      checkOut: "01:00 PM",
      status: "Present"
    }
  ];

  const handleIncidentReport = (child) => {
    setSelectedChild(child);
    setShowIncidentForm(true);
  };

  const handleSubmitIncident = (e) => {
    e.preventDefault();
    //  This is where we handle incident submission logic here
    setShowIncidentForm(false);
  };

  return (
    <div className="child-management-container">
      <div className="section-header">
        <h2>Child Management</h2>
        <p>Track attendance and report incidents</p>
      </div>

      {/* This is the attendance Tracking Section is here! */}
      <div className="attendance-section">
        <div className="controls-bar">
          <div className="search-box">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search child name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="date-filter">
            <FaFilter className="icon" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Child Name</th>
                <th>Age</th>
                <th>Parent</th>
                <th>Session Type</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {childrenData.map(child => (
                <tr key={child.id}>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.parent}</td>
                  <td>
                    <span className={`session-badge ${child.session.toLowerCase()}`}>
                      <FaClock className="session-icon" />
                      {child.session}
                    </span>
                  </td>
                  <td>{child.checkIn}</td>
                  <td>{child.checkOut}</td>
                  <td>
                    <span className={`status-badge ${child.status.toLowerCase()}`}>
                      {child.status === 'Present' ? (
                        <><FaCheckCircle /> Present</>
                      ) : (
                        <><FaTimesCircle /> Absent</>
                      )}
                    </span>
                  </td>
                  <td>
                    <button
                      className="report-btn"
                      onClick={() => handleIncidentReport(child)}
                    >
                      <FaExclamationTriangle />
                      Report Incident
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Report Modal */}
      {showIncidentForm && selectedChild && (
        <div className="modal-overlay">
          <div className="incident-modal">
            <div className="modal-header">
              <h3>Report Incident for {selectedChild.name}</h3>
              <button
                className="close-modal"
                onClick={() => setShowIncidentForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitIncident} className="incident-form">
              <div className="form-group">
                <label>Incident Type</label>
                <select required>
                  <option value="">Select type</option>
                  <option value="health">Health Related</option>
                  <option value="behavior">Behavioral</option>
                  <option value="accident">Accident</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe the incident in detail..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Severity Level</label>
                <select required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Action Taken</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Describe actions taken..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Report
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowIncidentForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildManagement; 