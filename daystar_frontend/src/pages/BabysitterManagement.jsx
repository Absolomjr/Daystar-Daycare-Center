import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BabysitterList from '../components/babysitter/BabysitterList';
import BabysitterForm from '../components/babysitter/BabysitterForm';
import BabysitterSchedule from '../components/babysitter/BabysitterSchedule';

const BabysitterManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="babysitter-management">
      {/* Page Header */}
      <div className="page-header">
        <h1>Babysitter Management</h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/babysitters/add')}
          >
            Add New Babysitter
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('list');
            navigate('/babysitters');
          }}
        >
          Babysitters List
        </button>
        <button 
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('schedule');
            navigate('/babysitters/schedule');
          }}
        >
          Schedule
        </button>
      </div>

      {/* Routes for different sections */}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<BabysitterList />} />
          <Route path="/add" element={<BabysitterForm />} />
          <Route path="/edit/:id" element={<BabysitterForm />} />
          <Route path="/schedule" element={<BabysitterSchedule />} />
          <Route path="/schedule/:id" element={<BabysitterSchedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default BabysitterManagement;
