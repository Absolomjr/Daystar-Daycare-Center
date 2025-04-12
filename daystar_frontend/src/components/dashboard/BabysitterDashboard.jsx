import React, { useState } from 'react';
import Schedule from './babysitter/Schedule';
import Assignments from './babysitter/Assignments';
import Earnings from './babysitter/Earnings';
import Profile from './babysitter/Profile';
import './Dashboard.css';

const BabysitterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview stats
  const stats = {
    todaysSchedule: 2,
    weeklyHours: 28,
    rating: 4.8,
    monthlyEarnings: 1240
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'schedule':
        return <Schedule />;
      case 'assignments':
        return <Assignments />;
      case 'earnings':
        return <Earnings />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Today's Schedule</h3>
                <p className="stat-number">{stats.todaysSchedule} Assignments</p>
              </div>
              <div className="stat-card">
                <h3>Weekly Hours</h3>
                <p className="stat-number">{stats.weeklyHours}</p>
              </div>
              <div className="stat-card">
                <h3>Current Rating</h3>
                <p className="stat-number">{stats.rating}</p>
              </div>
              <div className="stat-card">
                <h3>Monthly Earnings</h3>
                <p className="stat-number">${stats.monthlyEarnings}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Babysitter Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-home"></i> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <i className="fas fa-calendar-alt"></i> My Schedule
          </button>
          <button 
            className={`nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <i className="fas fa-tasks"></i> Assignments
          </button>
          <button 
            className={`nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <i className="fas fa-dollar-sign"></i> Earnings
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <input type="search" placeholder="Search assignments..." />
          </div>
          <div className="header-profile">
            <span>Welcome, Sarah</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default BabysitterDashboard; 