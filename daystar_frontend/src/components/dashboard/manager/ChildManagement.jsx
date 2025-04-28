import React, { useState } from 'react';
import {
  FaChild,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import './ChildManagement.css';

const ChildManagement = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  // Mock data which can be replaced with your actual data
  const childrenData = [
    {
      id: 1,
      name: "Emma Thompson",
      age: 4,
      parent: "Sarah Thompson",
      attendance: "Present",
      session: "Full-day",
      checkIn: "08:30 AM",
      checkOut: "05:30 PM"
    },
    // More children can be added
  ];

  const renderAttendanceTracking = () => {
    return (
      <div className="attendance-section">
        <div className="controls-bar">
          <div className="search-filter">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search child name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="date-filter">
              <FaFilter className="filter-icon" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
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
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {childrenData.map((child) => (
                <tr key={child.id}>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.parent}</td>
                  <td>{child.session}</td>
                  <td>{child.checkIn}</td>
                  <td>{child.checkOut}</td>
                  <td>
                    <span className={`status-badge ${child.attendance.toLowerCase()}`}>
                      {child.attendance === 'Present' ? (
                        <FaCheckCircle className="status-icon" />
                      ) : (
                        <FaTimesCircle className="status-icon" />
                      )}
                      {child.attendance}
                    </span>
                  </td>
                  <td>
                    <button
                      className="report-incident-btn"
                      onClick={() => {
                        setSelectedChild(child);
                        setShowIncidentForm(true);
                      }}
                    >
                      <FaExclamationTriangle /> Report Incident
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const IncidentReportForm = ({ child, onClose }) => {
    const [incidentData, setIncidentData] = useState({
      type: '',
      description: '',
      severity: 'low',
      actionTaken: '',
      timestamp: new Date().toISOString().slice(0, 16)
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle incident report submission
      console.log('Incident reported:', { child, ...incidentData });
      onClose();
    };

    return (
      <div className="incident-form-overlay">
        <div className="incident-form">
          <h3>Report Incident for {child.name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Incident Type</label>
              <select
                value={incidentData.type}
                onChange={(e) => setIncidentData({...incidentData, type: e.target.value})}
                required
              >
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
                value={incidentData.description}
                onChange={(e) => setIncidentData({...incidentData, description: e.target.value})}
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Severity</label>
              <select
                value={incidentData.severity}
                onChange={(e) => setIncidentData({...incidentData, severity: e.target.value})}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Action Taken</label>
              <textarea
                value={incidentData.actionTaken}
                onChange={(e) => setIncidentData({...incidentData, actionTaken: e.target.value})}
                required
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Date & Time</label>
              <input
                type="datetime-local"
                value={incidentData.timestamp}
                onChange={(e) => setIncidentData({...incidentData, timestamp: e.target.value})}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit Report</button>
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="child-management">
      <div className="section-header">
        <h2>Child Management</h2>
      </div>

      <div className="management-tabs">
        <button
          className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          <FaCalendarCheck /> Attendance Tracking
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'attendance' && renderAttendanceTracking()}
      </div>

      {showIncidentForm && selectedChild && (
        <IncidentReportForm
          child={selectedChild}
          onClose={() => {
            setShowIncidentForm(false);
            setSelectedChild(null);
          }}
        />
      )}
    </div>
  );
};

export default ChildManagement; 