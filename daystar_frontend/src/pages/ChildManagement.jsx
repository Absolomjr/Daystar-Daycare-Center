import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChildList from '../components/children/ChildList';
import ChildForm from '../components/children/ChildForm';
import AttendanceTracker from '../components/children/AttendanceTracker';

const ChildManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="child-management">
      {/* Page Header */}
      <div className="page-header">
        <h1>Child Management</h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/children/add')}
          >
            Register New Child
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('list');
            navigate('/children');
          }}
        >
          Children List
        </button>
        <button 
          className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('attendance');
            navigate('/children/attendance');
          }}
        >
          Attendance
        </button>
      </div>

      {/* The  routes for different sections */}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<ChildList />} />
          <Route path="/add" element={<ChildForm />} />
          <Route path="/edit/:id" element={<ChildForm />} />
          <Route path="/attendance" element={<AttendanceTracker />} />
        </Routes>
      </div>
    </div>
  );
};

export default ChildManagement;
