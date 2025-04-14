import React, { useState } from 'react';
import './Dashboard.css';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Manager Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-home"></i> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'babysitters' ? 'active' : ''}`}
            onClick={() => setActiveTab('babysitters')}
          >
            <i className="fas fa-users"></i> Manage Babysitters
          </button>
          <button 
            className={`nav-item ${activeTab === 'schedules' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedules')}
          >
            <i className="fas fa-calendar-alt"></i> Schedules
          </button>
          <button 
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <i className="fas fa-credit-card"></i> Payments
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fas fa-chart-bar"></i> Reports
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <input type="search" placeholder="Search..." />
          </div>
          <div className="header-profile">
            <span>Welcome, Manager</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="dashboard-overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Babysitters</h3>
                  <p className="stat-number">24</p>
                </div>
                <div className="stat-card">
                  <h3>Active Assignments</h3>
                  <p className="stat-number">12</p>
                </div>
                <div className="stat-card">
                  <h3>Monthly Revenue</h3>
                  <p className="stat-number">$5,240</p>
                </div>
                <div className="stat-card">
                  <h3>Pending Reviews</h3>
                  <p className="stat-number">8</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'babysitters' && (
            <div className="babysitters-management">
              <h2>Manage Babysitters</h2>
              <div className="babysitters-list">
                {/* Add your babysitters list here */}
              </div>
            </div>
          )}

          {/* Add other tab content */}
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard; 