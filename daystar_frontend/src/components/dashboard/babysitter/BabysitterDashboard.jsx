import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaChild, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import Schedule from './Schedule';
//import Assignments from './Assignments';
import Earnings from './Earnings';
import Profile from './Profile';
import Overview from './Overview';
import ChildManagement from './ChildManagement';
import './BabysitterDashboard.css';

const BabysitterDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('overview');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return <Overview />;
      case 'earnings':
        return <Earnings />;
      case 'childmanagement':
        return <ChildManagement />;
      case 'schedule':
        return <Schedule />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="babysitter-dashboard">
      {/* Left Sidebar */}
      <div className="management-sidebar">
        <div className="sidebar-brand">
          <h2>DayStar</h2>
          <p>Babysitter Portal</p>
        </div>
        
        <div className="sidebar-divider"></div>

        <div className="nav-items">
          <button 
            className={`nav-item ${selectedSection === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedSection('overview')}
          >
            <FaHome className="nav-icon" />
            <span>Overview</span>
          </button>

          <button 
            className={`nav-item ${selectedSection === 'schedule' ? 'active' : ''}`}
            onClick={() => setSelectedSection('schedule')}
          >
            <FaCalendarAlt className="nav-icon" />
            <span>My Schedule</span>
          </button>

          <button 
            className={`nav-item ${selectedSection === 'childmanagement' ? 'active' : ''}`}
            onClick={() => setSelectedSection('childmanagement')}
          >
            <FaChild className="nav-icon" />
            <span>Child Management</span>
          </button>

          <button 
            className={`nav-item ${selectedSection === 'profile' ? 'active' : ''}`}
            onClick={() => setSelectedSection('profile')}
          >
            <FaUser className="nav-icon" />
            <span>Profile</span>
          </button>

          <button 
            className={`nav-item ${selectedSection === 'earnings' ? 'active' : ''}`}
            onClick={() => setSelectedSection('earnings')}
          >
            <FaMoneyBillWave className="nav-icon" />
            <span>Earnings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="management-content">
        <div className="top-bar">
          <h1>Welcome, {localStorage.getItem('userName')}</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BabysitterDashboard; 