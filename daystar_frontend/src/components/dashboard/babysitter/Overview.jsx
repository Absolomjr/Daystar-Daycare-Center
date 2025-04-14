import React from 'react';
import './Overview.css';

const Overview = () => {
  const overviewData = {
    todaySchedule: {
      assignments: 2,
      children: 3,
      nextSession: '2:00 PM'
    },
    weeklyStats: {
      totalHours: 28,
      completedSessions: 8,
      upcomingSessions: 4
    },
    earnings: {
      today: 10000,
      thisWeek: 50000,
      thisMonth: 180000
    },
    performance: {
      rating: 4.8,
      totalReviews: 24,
      completionRate: '98%'
    }
  };

  return (
    <div className="overview-container">
      <div className="overview-grid">
        {/* Today's Schedule */}
        <div className="overview-card today-schedule">
          <h3><i className="fas fa-clock"></i> Today's Schedule</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="label">Assignments</span>
              <span className="value">{overviewData.todaySchedule.assignments}</span>
            </div>
            <div className="stat-item">
              <span className="label">Children</span>
              <span className="value">{overviewData.todaySchedule.children}</span>
            </div>
            <div className="stat-item">
              <span className="label">Next Session</span>
              <span className="value">{overviewData.todaySchedule.nextSession}</span>
            </div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="overview-card weekly-stats">
          <h3><i className="fas fa-chart-bar"></i> Weekly Statistics</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="label">Total Hours</span>
              <span className="value">{overviewData.weeklyStats.totalHours}h</span>
            </div>
            <div className="stat-item">
              <span className="label">Completed</span>
              <span className="value">{overviewData.weeklyStats.completedSessions}</span>
            </div>
            <div className="stat-item">
              <span className="label">Upcoming</span>
              <span className="value">{overviewData.weeklyStats.upcomingSessions}</span>
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="overview-card earnings-overview">
          <h3><i className="fas fa-money-bill-wave"></i> Earnings Overview</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="label">Today</span>
              <span className="value">UGX {overviewData.earnings.today.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="label">This Week</span>
              <span className="value">UGX {overviewData.earnings.thisWeek.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="label">This Month</span>
              <span className="value">UGX {overviewData.earnings.thisMonth.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="overview-card performance">
          <h3><i className="fas fa-star"></i> Performance</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="label">Rating</span>
              <span className="value">{overviewData.performance.rating}/5.0</span>
            </div>
            <div className="stat-item">
              <span className="label">Reviews</span>
              <span className="value">{overviewData.performance.totalReviews}</span>
            </div>
            <div className="stat-item">
              <span className="label">Completion Rate</span>
              <span className="value">{overviewData.performance.completionRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 