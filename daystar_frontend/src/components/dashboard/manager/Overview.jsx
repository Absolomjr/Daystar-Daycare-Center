import React, { useState, useEffect } from 'react';
import {
  FaUserNurse,
  FaCalendarAlt,
  FaClipboardList,
  FaChartBar,
  FaChild,
  FaUsers,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import './Overview.css';

const Overview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const scheduleItems = [
    { time: '08:00 AM', event: 'Morning Check-in', status: 'completed', attendees: 15 },
    { time: '09:30 AM', event: 'Activity Session', status: 'ongoing', attendees: 22 },
    { time: '12:00 PM', event: 'Lunch Break', status: 'upcoming', attendees: 25 },
    { time: '02:00 PM', event: 'Nap Time', status: 'upcoming', attendees: 18 }
  ];

  return (
    <div className="overview-container">
      {/* Top Bar */}
      <div className="overview-topbar">
        <div className="welcome-section">
          <h1>Welcome back, Manager</h1>
          <p className="current-time">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="search-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search children, staff, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="metrics-dashboard">
        <div className="metric-card primary">
          <div className="metric-icon-wrapper">
            <FaUsers className="metric-icon" />
          </div>
          <div className="metric-content">
            <h3>Active Children</h3>
            <div className="metric-details">
              <span className="metric-number">42</span>
              <div className="metric-trend positive">
                <span>↑ 3</span>
                <span className="trend-label">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card secondary">
          <div className="metric-icon-wrapper">
            <FaUserNurse className="metric-icon" />
          </div>
          <div className="metric-content">
            <h3>Staff On Duty</h3>
            <div className="metric-details">
              <span className="metric-number">8/10</span>
              <div className="attendance-bar">
                <div className="attendance-fill" style={{width: '80%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon-wrapper">
            <FaExclamationTriangle className="metric-icon" />
          </div>
          <div className="metric-content">
            <h3>Pending Actions</h3>
            <div className="metric-details">
              <span className="metric-number">5</span>
              <button className="view-actions-btn">View All</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        {/* Schedule Section */}
        <div className="content-card schedule-section">
          <div className="card-header">
            <h2>Today's Schedule</h2>
            <button className="header-action-btn">
              <FaCalendarAlt /> View Full Calendar
            </button>
          </div>
          <div className="schedule-timeline">
            {scheduleItems.map((item, index) => (
              <div key={index} className={`timeline-item ${item.status}`}>
                <div className="timeline-marker">
                  {item.status === 'completed' && <FaCheckCircle />}
                  {item.status === 'ongoing' && <FaClock />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="time">{item.time}</span>
                    <span className={`status-badge ${item.status}`}>
                      {item.status}
                    </span>
                  </div>
                  <h4>{item.event}</h4>
                  <span className="attendees">{item.attendees} children</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="content-card quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            {[
              { icon: <FaClipboardList />, label: 'Take Attendance', color: '#4CAF50' },
              { icon: <FaCalendarAlt />, label: 'Schedule Activity', color: '#2196F3' },
              { icon: <FaChild />, label: 'Add Child', color: '#FF9800' },
              { icon: <FaChartBar />, label: 'View Reports', color: '#9C27B0' }
            ].map((action, index) => (
              <button 
                key={index} 
                className="quick-action-btn"
                style={{'--accent-color': action.color}}
              >
                <div className="action-icon-wrapper">
                  {action.icon}
                </div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="content-card notifications-section">
        <div className="card-header">
          <h2>Recent Notifications</h2>
          <button className="header-action-btn">Mark All as Read</button>
        </div>
        <div className="notifications-list">
          {[
            {
              type: 'alert',
              message: 'New enrollment request pending approval',
              time: '5 minutes ago',
              icon: <FaBell />
            },
            {
              type: 'info',
              message: 'Staff meeting scheduled for tomorrow at 9 AM',
              time: '1 hour ago',
              icon: <FaCalendarAlt />
            },
            {
              type: 'success',
              message: 'Monthly safety inspection completed',
              time: '2 hours ago',
              icon: <FaCheckCircle />
            }
          ].map((notification, index) => (
            <div key={index} className={`notification-item ${notification.type}`}>
              <div className="notification-icon-wrapper">
                {notification.icon}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview; 