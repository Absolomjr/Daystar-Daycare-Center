import React, { useState } from 'react';
import './Earnings.css';

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock daily earnings data
  const dailyEarningsData = [
    {
      id: 1,
      date: '2024-01-20',
      sessions: [
        {
          id: 'S1',
          familyName: 'Johnson Family',
          numberOfChildren: 2,
          sessionType: 'full-day',
          status: 'cleared',
          amount: 10000, // 5000 * 2 children
          time: '09:00 AM - 05:00 PM'
        },
        {
          id: 'S2',
          familyName: 'Smith Family',
          numberOfChildren: 1,
          sessionType: 'half-day',
          status: 'pending',
          amount: 2000, // 2000 * 1 child
          time: '02:00 PM - 06:00 PM'
        }
      ],
      totalAmount: 12000,
      status: 'partially_cleared'
    },
    {
      id: 2,
      date: '2024-01-21',
      sessions: [
        {
          id: 'S3',
          familyName: 'Williams Family',
          numberOfChildren: 3,
          sessionType: 'full-day',
          status: 'cleared',
          amount: 15000, // 5000 * 3 children
          time: '08:00 AM - 04:00 PM'
        }
      ],
      totalAmount: 15000,
      status: 'cleared'
    }
  ];

  // Mock monthly earnings data
  const monthlyEarningsData = {
    summary: {
      totalEarnings: 150000,
      totalSessions: 45,
      averagePerDay: 5000,
      clearedPayments: 120000,
      pendingPayments: 30000,
      totalChildren: 28,
      fullDaySessions: 30,
      halfDaySessions: 15
    },
    weeklyBreakdown: [
      { week: 1, earnings: 35000, sessions: 12, children: 7 },
      { week: 2, earnings: 42000, sessions: 11, children: 8 },
      { week: 3, earnings: 38000, sessions: 10, children: 6 },
      { week: 4, earnings: 35000, sessions: 12, children: 7 }
    ]
  };

  const renderDailyView = () => {
    return (
      <div className="daily-view">
        <div className="daily-summary">
          <div className="summary-card">
            <h3>Today's Earnings</h3>
            <p>UGX {dailyEarningsData[0].totalAmount.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>Sessions Today</h3>
            <p>{dailyEarningsData[0].sessions.length}</p>
          </div>
          <div className="summary-card">
            <h3>Children Today</h3>
            <p>{dailyEarningsData[0].sessions.reduce((acc, session) => acc + session.numberOfChildren, 0)}</p>
          </div>
        </div>

        {dailyEarningsData.map((day) => (
          <div key={day.id} className="daily-record">
            <div className="daily-header">
              <h3>Date: {day.date}</h3>
              <span className={`status-badge ${day.status}`}>
                {day.status.replace('_', ' ')}
              </span>
            </div>

            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Family</th>
                  <th>Children</th>
                  <th>Session Type</th>
                  <th>Amount (UGX)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {day.sessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.time}</td>
                    <td>{session.familyName}</td>
                    <td>{session.numberOfChildren}</td>
                    <td>{session.sessionType}</td>
                    <td>{session.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${session.status}`}>
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="4">Daily Total</td>
                  <td colSpan="2">UGX {day.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  const renderMonthlyView = () => {
    const { summary, weeklyBreakdown } = monthlyEarningsData;
    const currentMonth = new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' });

    return (
      <div className="monthly-view">
        <div className="monthly-header">
          <h3>{currentMonth} {selectedYear} Earnings Summary</h3>
        </div>

        <div className="earnings-stats-grid">
          <div className="stat-card primary">
            <h4>Total Earnings</h4>
            <p>UGX {summary.totalEarnings.toLocaleString()}</p>
            <small>This Month</small>
          </div>
          <div className="stat-card success">
            <h4>Cleared Payments</h4>
            <p>UGX {summary.clearedPayments.toLocaleString()}</p>
            <small>{((summary.clearedPayments / summary.totalEarnings) * 100).toFixed(1)}% of total</small>
          </div>
          <div className="stat-card warning">
            <h4>Pending Payments</h4>
            <p>UGX {summary.pendingPayments.toLocaleString()}</p>
            <small>{((summary.pendingPayments / summary.totalEarnings) * 100).toFixed(1)}% of total</small>
          </div>
          <div className="stat-card info">
            <h4>Average Daily</h4>
            <p>UGX {summary.averagePerDay.toLocaleString()}</p>
            <small>Based on working days</small>
          </div>
        </div>

        <div className="session-summary">
          <div className="summary-row">
            <div className="summary-item">
              <h4>Total Sessions</h4>
              <p>{summary.totalSessions}</p>
            </div>
            <div className="summary-item">
              <h4>Children Cared For</h4>
              <p>{summary.totalChildren}</p>
            </div>
            <div className="summary-item">
              <h4>Full-Day Sessions</h4>
              <p>{summary.fullDaySessions}</p>
            </div>
            <div className="summary-item">
              <h4>Half-Day Sessions</h4>
              <p>{summary.halfDaySessions}</p>
            </div>
          </div>
        </div>

        <div className="weekly-breakdown">
          <h3>Weekly Breakdown</h3>
          <div className="weekly-chart">
            {weeklyBreakdown.map((week) => (
              <div key={week.week} className="week-bar">
                <div 
                  className="bar" 
                  style={{ height: `${(week.earnings / summary.totalEarnings) * 100}%` }}
                >
                  <span className="earnings">UGX {week.earnings.toLocaleString()}</span>
                </div>
                <span className="week-label">Week {week.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="earnings-container">
      <div className="earnings-header">
        <h2>My Earnings</h2>
        <div className="period-selector">
          <button
            className={selectedPeriod === 'daily' ? 'active' : ''}
            onClick={() => setSelectedPeriod('daily')}
          >
            Daily View
          </button>
          <button
            className={selectedPeriod === 'monthly' ? 'active' : ''}
            onClick={() => setSelectedPeriod('monthly')}
          >
            Monthly View
          </button>
        </div>
      </div>

      <div className="date-filter">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(2024, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {[2023, 2024].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {selectedPeriod === 'daily' ? renderDailyView() : renderMonthlyView()}
    </div>
  );
};

export default Earnings;
