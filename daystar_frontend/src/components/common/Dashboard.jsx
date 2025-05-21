import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBabysitters: 0,
    totalChildren: 0,
    todayAttendance: 0,
    monthlyRevenue: 0,
  });

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        // API call to fetch statistics would go here
        // For now, using dummy data
        setStats({
          totalBabysitters: 5,
          totalChildren: 20,
          todayAttendance: 15,
          monthlyRevenue: 250000,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Babysitters</h3>
          <p className="stat-value">{stats.totalBabysitters}</p>
        </div>
        <div className="stat-card">
          <h3>Total Children</h3>
          <p className="stat-value">{stats.totalChildren}</p>
        </div>
        <div className="stat-card">
          <h3>Today's Attendance</h3>
          <p className="stat-value">{stats.todayAttendance}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <p className="stat-value">
            UGX {stats.monthlyRevenue.toLocaleString()}
          </p>
        </div>
      </div>
      {/* Add more dashboard widgets here */}
    </div>
  );
};

export default Dashboard;
