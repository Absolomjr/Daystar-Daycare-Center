import React, { useState } from 'react';
import { FaHome, FaUsers, FaMoneyBillWave, FaChild, FaClock, FaUserPlus, FaCalendarPlus, FaMoneyCheckAlt } from 'react-icons/fa';
import './ManagerDashboard.css';
import './Overview.css';
import BabysitterManagement from './BabysitterManagement';
import FinancialManagement from './FinancialManagement';
import AddBabysitterModal from './modals/AddBabysitterModal';
import ScheduleSessionModal from './modals/ScheduleSessionModal';
import ProcessPaymentModal from './modals/ProcessPaymentModal';
import AddChildModal from './modals/AddChildModal';

const ManagerDashboard = () => {
  console.log('ManagerDashboard rendering');
  const [selectedSection, setSelectedSection] = useState('overview');
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Overview Component
  const Overview = () => {
    const stats = {
      babysitters: {
        total: 8,
        active: 6,
        onLeave: 2
      },
      children: {
        total: 45,
        fullDay: 30,
        halfDay: 15
      },
      sessions: {
        today: 12,
        completed: 8,
        upcoming: 4
      },
      finances: {
        monthlyRevenue: 15000000,
        pendingPayments: 2500000,
        recentTransactions: [
          { id: 1, parent: "John Doe", amount: 500000, date: "2024-03-15", status: "completed" },
          { id: 2, parent: "Jane Smith", amount: 300000, date: "2024-03-15", status: "pending" },
          { id: 3, parent: "Mike Johnson", amount: 450000, date: "2024-03-14", status: "completed" }
        ]
      }
    };

    const handleModalClose = () => {
      setActiveModal(null);
    };

    const handleModalSubmit = () => {
      setActiveModal(null);
      // You can add refresh logic here if needed
    };

    return (
      <div className="overview-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Dashboard Overview</h1>
            <p>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-details">
              <h3>Total Babysitters</h3>
              <div className="stat-numbers">
                <span className="main-stat">{stats.babysitters.total}</span>
                <div className="sub-stats">
                  <span className="active-stat">
                    <span className="dot green"></span>
                    {stats.babysitters.active} Active
                  </span>
                  <span className="leave-stat">
                    <span className="dot orange"></span>
                    {stats.babysitters.onLeave} On Leave
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">
              <FaChild />
            </div>
            <div className="stat-details">
              <h3>Children Enrolled</h3>
              <div className="stat-numbers">
                <span className="main-stat">{stats.children.total}</span>
                <div className="sub-stats">
                  <span className="fullday-stat">
                    <span className="dot blue"></span>
                    {stats.children.fullDay} Full Day
                  </span>
                  <span className="halfday-stat">
                    <span className="dot purple"></span>
                    {stats.children.halfDay} Half Day
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-details">
              <h3>Today's Sessions</h3>
              <div className="stat-numbers">
                <span className="main-stat">{stats.sessions.today}</span>
                <div className="sub-stats">
                  <span className="completed-stat">
                    <span className="dot green"></span>
                    {stats.sessions.completed} Completed
                  </span>
                  <span className="upcoming-stat">
                    <span className="dot blue"></span>
                    {stats.sessions.upcoming} Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-details">
              <h3>Monthly Revenue</h3>
              <div className="stat-numbers">
                <span className="main-stat">UGX {stats.finances.monthlyRevenue.toLocaleString()}</span>
                <div className="sub-stats">
                  <span className="pending-stat">
                    <span className="dot orange"></span>
                    UGX {stats.finances.pendingPayments.toLocaleString()} Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-button" onClick={() => setActiveModal('addBabysitter')}>
              <div className="action-icon">
                <FaUserPlus />
              </div>
              <span>Add Babysitter</span>
            </button>
            <button className="action-button" onClick={() => setActiveModal('scheduleSession')}>
              <div className="action-icon">
                <FaCalendarPlus />
              </div>
              <span>Schedule Session</span>
            </button>
            <button className="action-button" onClick={() => setActiveModal('processPayment')}>
              <div className="action-icon">
                <FaMoneyCheckAlt />
              </div>
              <span>Process Payment</span>
            </button>
            <button className="action-button" onClick={() => setActiveModal('addChild')}>
              <div className="action-icon">
                <FaChild />
              </div>
              <span>Add Child</span>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Parent</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.finances.recentTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.parent}</td>
                    <td>UGX {transaction.amount.toLocaleString()}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <span className={`status-badge ${transaction.status}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {activeModal === 'addBabysitter' && (
          <AddBabysitterModal onClose={handleModalClose} onSubmit={handleModalSubmit} />
        )}
        {activeModal === 'scheduleSession' && (
          <ScheduleSessionModal onClose={handleModalClose} onSubmit={handleModalSubmit} />
        )}
        {activeModal === 'processPayment' && (
          <ProcessPaymentModal onClose={handleModalClose} onSubmit={handleModalSubmit} />
        )}
        {activeModal === 'addChild' && (
          <AddChildModal onClose={handleModalClose} onSubmit={handleModalSubmit} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return <Overview />;
      case 'babysitter-management':
        return <BabysitterManagement />;
      case 'financial-management':
        return <FinancialManagement />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="manager-dashboard">
      {/* Left Sidebar */}
      <div className="management-sidebar">
        <div className="sidebar-brand">
          <h2>DayStar</h2>
          <p>Manager Portal</p>
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
            className={`nav-item ${selectedSection === 'babysitter-management' ? 'active' : ''}`}
            onClick={() => setSelectedSection('babysitter-management')}
          >
            <FaUsers className="nav-icon" />
            <span>Babysitter Management</span>
          </button>

          <button 
            className={`nav-item ${selectedSection === 'financial-management' ? 'active' : ''}`}
            onClick={() => setSelectedSection('financial-management')}
          >
            <FaMoneyBillWave className="nav-icon" />
            <span>Financial Management</span>
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

export default ManagerDashboard; 