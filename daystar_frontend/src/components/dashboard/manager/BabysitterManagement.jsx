import React, { useState } from 'react';
import { FaUsers, FaStar, FaChild, FaMoneyBill, FaEdit, FaEye, FaCheck, FaSearch, FaPlus, FaArrowLeft, FaHome, FaCalendarAlt, FaUserClock, FaChartBar, FaDownload, FaFileExcel, FaMoneyBillWave, FaUserCheck, FaArrowUp, FaArrowDown, FaEllipsisV, FaExclamationTriangle, FaFilter, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './BabysitterManagement.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCell: {
    padding: 5,
    flex: 1,
  }
});

// PDF Document Component
const BabysitterReport = ({ data, reportType, startDate, endDate }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Babysitter {reportType} Report</Text>
      <Text>Period: {startDate} to {endDate}</Text>
      
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Summary</Text>
        <View style={pdfStyles.table}>
          {data.map((item, index) => (
            <View key={index} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>{item.name}</Text>
              <Text style={pdfStyles.tableCell}>{item.attendance}%</Text>
              <Text style={pdfStyles.tableCell}>{item.totalHours} hours</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const BabysitterManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showClearPaymentModal, setShowClearPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showReportSection, setShowReportSection] = useState(false);
  const [selectedBabysitter, setSelectedBabysitter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  // Mock data for babysitters
  const babysittersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      status: "Active",
      experience: "5 years",
      rating: 4.9,
      children: 4,
      schedule: "Morning Shift",
      lastActive: "Today",
      paymentStatus: "Cleared"
    },
    {
      id: 2,
      name: "Mary Williams",
      status: "Active",
      experience: "3 years",
      rating: 4.8,
      children: 3,
      schedule: "Afternoon Shift",
      lastActive: "Yesterday",
      paymentStatus: "Pending"
    },
    {
      id: 3,
      name: "Jane Smith",
      status: "On Leave",
      experience: "4 years",
      rating: 4.7,
      children: 5,
      schedule: "Full Day",
      lastActive: "3 days ago",
      paymentStatus: "Cleared"
    }
  ];

  // Mock data for payments
  const paymentRecords = [
    {
      id: 1,
      babysitterId: 1,
      date: '2024-01-22',
      sessions: [
        {
          type: 'full-day',
          children: 2,
          amount: 10000 // 5000 per child
        },
        {
          type: 'half-day',
          children: 2,
          amount: 4000 // 2000 per child
        }
      ],
      totalAmount: 14000,
      status: 'pending'
    },
    // Add more payment records
  ];

  // Mock data for schedules
  const schedules = [
    {
      id: 1,
      babysitterId: 1,
      date: '2024-01-22',
      sessions: [
        {
          time: '09:00 AM - 02:00 PM',
          type: 'half-day',
          children: [
            { name: 'Emma Wilson', age: 4 },
            { name: 'James Wilson', age: 6 }
          ]
        }
      ],
      status: 'active'
    },
    // Add more schedules
  ];

  // Mock data for reports
  const generateReportData = () => {
    return [
      {
        name: "Sarah Johnson",
        attendance: 95,
        totalHours: 160,
        schedules: [/* schedule details */]
      },
      // ... more babysitter data
    ];
  };

  // Add attendance data
  const attendanceData = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: new Date(),
      checkIn: "08:00 AM",
      checkOut: "05:00 PM",
      status: "Present",
      children: 4
    },
    {
      id: 2,
      name: "Mary Williams",
      date: new Date(),
      checkIn: "09:00 AM",
      checkOut: "04:00 PM",
      status: "Present",
      children: 3
    },
    {
      id: 3,
      name: "Jane Smith",
      date: new Date(),
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
      children: 0
    }
  ];

  // Summary stats
  const summaryStats = {
    totalBabysitters: {
      count: 3,
      icon: <FaUsers />,
      label: 'Total Babysitters',
      subLabel: 'Active Babysitters',
      color: '#4e73df'
    },
    averageRating: {
      count: '4.8',
      icon: <FaStar />,
      label: 'Average Rating',
      subLabel: 'Out of 5.0',
      color: '#1cc88a'
    },
    totalChildren: {
      count: 12,
      icon: <FaChild />,
      label: 'Total Children',
      subLabel: 'Under Care',
      color: '#36b9cc'
    },
    pendingPayments: {
      count: 1,
      icon: <FaMoneyBill />,
      label: 'Pending Payments',
      subLabel: 'To be Cleared',
      color: '#f6c23e'
    }
  };

  // Modal component
  const Modal = ({ type, babysitter, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{type === 'edit' ? 'Edit Babysitter' : 'Babysitter Details'}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {type === 'edit' ? (
            <form className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" defaultValue={babysitter.name} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select defaultValue={babysitter.status}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>Schedule</label>
                <select defaultValue={babysitter.schedule}>
                  <option value="Morning Shift">Morning Shift</option>
                  <option value="Afternoon Shift">Afternoon Shift</option>
                  <option value="Full Day">Full Day</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="babysitter-details">
              <div className="detail-row">
                <span className="label">Name:</span>
                <span>{babysitter.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`status-badge ${babysitter.status.toLowerCase()}`}>
                  {babysitter.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Experience:</span>
                <span>{babysitter.experience}</span>
              </div>
              <div className="detail-row">
                <span className="label">Rating:</span>
                <span className="rating">
                  {babysitter.rating} <FaStar className="star-icon" />
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Current Children:</span>
                <span>{babysitter.children}</span>
              </div>
              <div className="detail-row">
                <span className="label">Schedule:</span>
                <span>{babysitter.schedule}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Clear Payment Modal
  const ClearPaymentModal = ({ payment, onClose, onConfirm }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Clear Payment</h3>
        <div className="payment-details">
          <p><strong>Babysitter:</strong> {babysittersData.find(b => b.id === payment.babysitterId)?.name}</p>
          <p><strong>Date:</strong> {payment.date}</p>
          <p><strong>Amount:</strong> UGX {payment.totalAmount.toLocaleString()}</p>
          <p><strong>Sessions:</strong></p>
          <ul>
            {payment.sessions.map((session, index) => (
              <li key={index}>
                {session.type}: {session.children} children - UGX {session.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={() => onConfirm(payment.id)}>
            Confirm Payment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Schedule Modal
  const ScheduleModal = ({ schedule = null, onClose, onSave, isEdit = false }) => {
    const [scheduleData, setScheduleData] = useState(
      schedule || {
        babysitterId: '',
        date: '',
        sessions: [{
          time: '',
          type: 'full-day',
          children: []
        }]
      }
    );

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{isEdit ? 'Edit Schedule' : 'Create New Schedule'}</h3>
          <form className="schedule-form">
            <div className="form-group">
              <label>Babysitter</label>
              <select 
                value={scheduleData.babysitterId}
                onChange={(e) => setScheduleData({
                  ...scheduleData,
                  babysitterId: e.target.value
                })}
              >
                <option value="">Select Babysitter</option>
                {babysittersData.map(babysitter => (
                  <option key={babysitter.id} value={babysitter.id}>
                    {babysitter.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input 
                type="date"
                value={scheduleData.date}
                onChange={(e) => setScheduleData({
                  ...scheduleData,
                  date: e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Session Type</label>
              <select 
                value={scheduleData.sessions[0].type}
                onChange={(e) => setScheduleData({
                  ...scheduleData,
                  sessions: [{
                    ...scheduleData.sessions[0],
                    type: e.target.value
                  }]
                })}
              >
                <option value="full-day">Full Day</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time</label>
              <input 
                type="time"
                value={scheduleData.sessions[0].time}
                onChange={(e) => setScheduleData({
                  ...scheduleData,
                  sessions: [{
                    ...scheduleData.sessions[0],
                    time: e.target.value
                  }]
                })}
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="confirm-btn"
                onClick={() => onSave(scheduleData)}
              >
                {isEdit ? 'Update Schedule' : 'Create Schedule'}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Attendance Modal
  const AttendanceModal = ({ babysitter, onClose, onMark }) => {
    const [attendanceData, setAttendanceData] = useState({
      status: 'present',
      timeIn: '',
      notes: ''
    });

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Mark Attendance - {babysitter.name}</h3>
          <form className="attendance-form">
            <div className="form-group">
              <label>Status</label>
              <select
                value={attendanceData.status}
                onChange={(e) => setAttendanceData({
                  ...attendanceData,
                  status: e.target.value
                })}
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time In</label>
              <input
                type="time"
                value={attendanceData.timeIn}
                onChange={(e) => setAttendanceData({
                  ...attendanceData,
                  timeIn: e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={attendanceData.notes}
                onChange={(e) => setAttendanceData({
                  ...attendanceData,
                  notes: e.target.value
                })}
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="confirm-btn"
                onClick={() => onMark(babysitter.id, attendanceData)}
              >
                Mark Attendance
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Handler functions
  const handleClearPayment = (paymentId) => {
    // Add your payment clearing logic here
    console.log('Clearing payment:', paymentId);
    setShowClearPaymentModal(false);
    // Update payment status in your state/database
  };

  const handleCreateSchedule = (scheduleData) => {
    // Add your schedule creation logic here
    console.log('Creating schedule:', scheduleData);
    setShowScheduleModal(false);
    // Add new schedule to your state/database
  };

  const handleEditSchedule = (scheduleData) => {
    // Add your schedule update logic here
    console.log('Updating schedule:', scheduleData);
    setShowEditScheduleModal(false);
    // Update schedule in your state/database
  };

  const handleDeleteSchedule = (scheduleId) => {
    // Add your schedule deletion logic here
    console.log('Deleting schedule:', scheduleId);
    setShowDeleteConfirmModal(false);
    // Remove schedule from your state/database
  };

  const handleMarkAttendance = (babysitterId, attendanceData) => {
    // Add your attendance marking logic here
    console.log('Marking attendance:', babysitterId, attendanceData);
    setShowAttendanceModal(false);
    // Update attendance in your state/database
  };

  const handleAction = (action, babysitter) => {
    setSelectedBabysitter(babysitter);
    setModalType(action);
    setShowModal(true);
  };

  const handleReportIncident = (child) => {
    setSelectedChild(child);
    setShowIncidentForm(true);
  };

  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    // Handle the incident report submission here
    setShowIncidentForm(false);
    setSelectedChild(null);
  };

  const navigationTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FaHome />
    },
    {
      id: 'scheduling',
      label: 'Scheduling',
      icon: <FaCalendarAlt />
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <FaUserClock />
    },
    {
      id: 'reports',
      label: 'Generate Reports',
      icon: <FaChartBar />
    },
    {
      id: 'childmanagement',
      label: 'Child Management',
      icon: <FaChild />
    }
  ];

  const renderOverviewSection = () => {
    return (
      <div className="overview-section">
        {/* Stats Summary */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Total Babysitters</h3>
                <h2>45</h2>
                <p className="stat-change positive">
                  <FaArrowUp /> <span>12%</span> since last month
                </p>
              </div>
              <div className="stat-icon blue">
                <FaUsers />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Active Children</h3>
                <h2>156</h2>
                <p className="stat-change positive">
                  <FaArrowUp /> <span>8%</span> since last week
                </p>
              </div>
              <div className="stat-icon green">
                <FaChild />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Monthly Revenue</h3>
                <h2>$24,500</h2>
                <p className="stat-change positive">
                  <FaArrowUp /> <span>15%</span> since last month
                </p>
              </div>
              <div className="stat-icon purple">
                <FaMoneyBillWave />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Active Sessions</h3>
                <h2>28</h2>
                <p className="stat-change negative">
                  <FaArrowDown /> <span>3%</span> since yesterday
                </p>
              </div>
              <div className="stat-icon orange">
                <FaUserCheck />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Upcoming Sessions */}
        <div className="dashboard-grid">
          <div className="recent-activity">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <button className="more-btn"><FaEllipsisV /></button>
            </div>
            <div className="activity-list">
              {[
                {
                  action: "New Babysitter Registration",
                  name: "Sarah Johnson",
                  time: "2 minutes ago",
                  status: "pending"
                },
                {
                  action: "Session Completed",
                  name: "Michael Wilson",
                  time: "15 minutes ago",
                  status: "completed"
                },
                {
                  action: "Payment Processed",
                  name: "Emily Davis",
                  time: "1 hour ago",
                  status: "success"
                },
                {
                  action: "New Schedule Added",
                  name: "James Brown",
                  time: "2 hours ago",
                  status: "info"
                }
              ].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-status ${activity.status}`}></div>
                  <div className="activity-details">
                    <h4>{activity.action}</h4>
                    <p>{activity.name}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="upcoming-sessions">
            <div className="section-header">
              <h3>Upcoming Sessions</h3>
              <button className="more-btn"><FaEllipsisV /></button>
            </div>
            <div className="sessions-list">
              {[
                {
                  babysitter: "Sarah Johnson",
                  children: 3,
                  time: "09:00 AM - 12:00 PM",
                  status: "scheduled"
                },
                {
                  babysitter: "Michael Wilson",
                  children: 2,
                  time: "01:00 PM - 04:00 PM",
                  status: "confirmed"
                },
                {
                  babysitter: "Emily Davis",
                  children: 4,
                  time: "03:00 PM - 06:00 PM",
                  status: "scheduled"
                }
              ].map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-info">
                    <h4>{session.babysitter}</h4>
                    <p>{session.time}</p>
                    <span className="children-count">{session.children} children</span>
                  </div>
                  <span className={`session-status ${session.status}`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentManagement = () => (
    <div className="payment-management">
      <div className="payment-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Today's Payments</h3>
            <p>UGX {paymentRecords.reduce((sum, record) => sum + record.totalAmount, 0).toLocaleString()}</p>
            <span>{paymentRecords.length} payment records</span>
          </div>
          <div className="summary-card">
            <h3>Pending Clearance</h3>
            <p>{paymentRecords.filter(record => record.status === 'pending').length}</p>
            <span>Awaiting approval</span>
          </div>
        </div>
      </div>

      <div className="payment-records">
        <h3>Payment Records</h3>
        <div className="table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Babysitter</th>
                <th>Sessions</th>
                <th>Children</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{babysittersData.find(b => b.id === record.babysitterId)?.name}</td>
                  <td>
                    {record.sessions.map((session, index) => (
                      <div key={index} className="session-info">
                        {session.type} ({session.children} children)
                      </div>
                    ))}
                  </td>
                  <td>{record.sessions.reduce((sum, session) => sum + session.children, 0)}</td>
                  <td>UGX {record.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${record.status}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    {record.status === 'pending' && (
                      <button 
                        className="approve-btn"
                        onClick={() => {
                          setSelectedItem(record);
                          setShowClearPaymentModal(true);
                        }}
                      >
                        Clear Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderScheduling = () => (
    <div className="scheduling-section">
      <div className="scheduling-header">
        <h3>Babysitter Schedules</h3>
        <button 
          className="create-schedule-btn"
          onClick={() => setShowScheduleModal(true)}
        >
          <i className="fas fa-plus"></i> Create New Schedule
        </button>
      </div>

      <div className="schedule-calendar">
        {schedules.map(schedule => (
          <div key={schedule.id} className="schedule-card">
            <div className="schedule-header">
              <h4>{schedule.date}</h4>
              <span className={`status-badge ${schedule.status}`}>
                {schedule.status}
              </span>
            </div>
            <div className="schedule-details">
              <p className="babysitter-name">
                {babysittersData.find(b => b.id === schedule.babysitterId)?.name}
              </p>
              {schedule.sessions.map((session, index) => (
                <div key={index} className="session-details">
                  <div className="time-slot">{session.time}</div>
                  <div className="session-type">{session.type}</div>
                  <div className="children-list">
                    {session.children.map((child, idx) => (
                      <div key={idx} className="child-info">
                        {child.name} ({child.age} yrs)
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="schedule-actions">
              <button 
                className="edit-btn"
                onClick={() => {
                  setSelectedItem(schedule);
                  setShowEditScheduleModal(true);
                }}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => {
                  setSelectedItem(schedule);
                  setShowDeleteConfirmModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <div className="attendance-header">
        <h3>Today's Attendance</h3>
        <p className="date">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Children Present</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(record => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.date.toLocaleDateString()}</td>
                <td>{record.checkIn}</td>
                <td>{record.checkOut}</td>
                <td>
                  <span className={`status-badge ${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.children}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      disabled={record.status === "Absent"}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportsSection = () => {
    return (
      <div className="reports-section">
        <div className="reports-header">
          <h3>Generate Reports</h3>
          <button className="back-button" onClick={() => setActiveTab('overview')}>
            <FaArrowLeft /> Back to Management
          </button>
        </div>

        <div className="report-controls">
          <div className="date-filters">
            <div className="date-range">
              <label>From:</label>
              <input type="date" className="date-input" />
            </div>
            <div className="date-range">
              <label>To:</label>
              <input type="date" className="date-input" />
            </div>
          </div>

          <div className="report-type">
            <label>Report Type:</label>
            <select className="report-select">
              <option value="attendance">Attendance Report</option>
              <option value="payments">Payment Report</option>
              <option value="schedule">Schedule Report</option>
              <option value="performance">Performance Report</option>
            </select>
          </div>

          <div className="report-actions">
            <button className="preview-btn">
              <FaEye /> Preview Report
            </button>
            <button className="download-btn">
              <FaDownload /> Download PDF
            </button>
            <button className="export-btn">
              <FaFileExcel /> Export to Excel
            </button>
          </div>
        </div>

        <div className="report-preview">
          <div className="preview-header">
            <h4>Report Preview</h4>
            <span className="preview-date">Generated on: {new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="report-summary">
            <div className="summary-card">
              <h5>Total Sessions</h5>
              <p>156</p>
            </div>
            <div className="summary-card">
              <h5>Active Babysitters</h5>
              <p>24</p>
            </div>
            <div className="summary-card">
              <h5>Total Hours</h5>
              <p>780</p>
            </div>
            <div className="summary-card">
              <h5>Revenue</h5>
              <p>$12,450</p>
            </div>
          </div>

          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Babysitter Name</th>
                  <th>Sessions</th>
                  <th>Hours</th>
                  <th>Children</th>
                  <th>Earnings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sarah Johnson</td>
                  <td>45</td>
                  <td>180</td>
                  <td>12</td>
                  <td>$2,250</td>
                  <td><span className="status active">Active</span></td>
                </tr>
                <tr>
                  <td>Emily Davis</td>
                  <td>38</td>
                  <td>152</td>
                  <td>9</td>
                  <td>$1,900</td>
                  <td><span className="status active">Active</span></td>
                </tr>
                <tr>
                  <td>Michael Wilson</td>
                  <td>42</td>
                  <td>168</td>
                  <td>11</td>
                  <td>$2,100</td>
                  <td><span className="status active">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderChildManagementSection = () => {
    return (
      <div className="child-management-section">
        <div className="section-header">
          <h2>Child Management</h2>
        </div>

        {/* Attendance Tracking Section */}
        <div className="attendance-section">
          <h3>Child Attendance Tracking</h3>
          
          <div className="attendance-controls">
            <div className="search-filter">
              <div className="search-box">
                <FaSearch className="icon" />
                <input 
                  type="text" 
                  placeholder="Search child name..."
                  className="search-input"
                />
              </div>
              <div className="date-filter">
                <FaFilter className="icon" />
                <input 
                  type="date" 
                  className="date-input"
                />
              </div>
            </div>
          </div>

          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>Age</th>
                  <th>Parent</th>
                  <th>Session Type</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    name: "Emma Thompson",
                    age: 4,
                    parent: "Sarah Thompson",
                    session: "Full-day",
                    checkIn: "08:30 AM",
                    checkOut: "05:30 PM",
                    status: "Present"
                  },
                  {
                    id: 2,
                    name: "James Wilson",
                    age: 3,
                    parent: "Michael Wilson",
                    session: "Half-day",
                    checkIn: "09:00 AM",
                    checkOut: "01:00 PM",
                    status: "Present"
                  },
                  {
                    id: 3,
                    name: "Sophia Davis",
                    age: 5,
                    parent: "Emily Davis",
                    session: "Full-day",
                    checkIn: "08:45 AM",
                    checkOut: "04:45 PM",
                    status: "Present"
                  }
                ].map(child => (
                  <tr key={child.id}>
                    <td>{child.name}</td>
                    <td>{child.age}</td>
                    <td>{child.parent}</td>
                    <td>
                      <span className={`session-badge ${child.session.toLowerCase()}`}>
                        {child.session}
                      </span>
                    </td>
                    <td>{child.checkIn}</td>
                    <td>{child.checkOut}</td>
                    <td>
                      <span className={`status-badge ${child.status.toLowerCase()}`}>
                        {child.status === 'Present' ? (
                          <><FaCheckCircle /> Present</>
                        ) : (
                          <><FaTimesCircle /> Absent</>
                        )}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="report-incident-btn"
                        onClick={() => {
                          setSelectedChild(child);
                          setShowIncidentForm(true);
                        }}
                      >
                        <FaExclamationTriangle /> Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Report Modal */}
        {showIncidentForm && selectedChild && (
          <div className="modal-overlay">
            <div className="incident-modal">
              <div className="modal-header">
                <h3>Report Incident for {selectedChild.name}</h3>
                <button 
                  className="close-modal"
                  onClick={() => setShowIncidentForm(false)}
                >
                  ×
                </button>
              </div>
              <form className="incident-form">
                <div className="form-group">
                  <label>Incident Type</label>
                  <select required>
                    <option value="">Select type</option>
                    <option value="health">Health Related</option>
                    <option value="behavior">Behavioral</option>
                    <option value="accident">Accident</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    required 
                    rows="4"
                    placeholder="Describe the incident in detail..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Severity Level</label>
                  <select required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Action Taken</label>
                  <textarea 
                    required 
                    rows="3"
                    placeholder="Describe actions taken..."
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Submit Report
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowIncidentForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverviewSection();
      case 'scheduling':
        return renderScheduling();
      case 'attendance':
        return renderAttendance();
      case 'reports':
        return renderReportsSection();
      case 'childmanagement':
        return renderChildManagementSection();
      default:
        return null;
    }
  };

  return (
    <div className="babysitter-management">
      <div className="management-header">
        <h2>Babysitter Management</h2>
      </div>

      <div className="navigation-tabs">
        {navigationTabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>

      {/* Modals */}
      {showClearPaymentModal && (
        <ClearPaymentModal
          payment={selectedItem}
          onClose={() => setShowClearPaymentModal(false)}
          onConfirm={handleClearPayment}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSave={handleCreateSchedule}
        />
      )}

      {showEditScheduleModal && (
        <ScheduleModal
          schedule={selectedItem}
          isEdit={true}
          onClose={() => setShowEditScheduleModal(false)}
          onSave={handleEditSchedule}
        />
      )}

      {showDeleteConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this schedule?</p>
            <div className="modal-actions">
              <button 
                className="confirm-btn"
                onClick={() => handleDeleteSchedule(selectedItem.id)}
              >
                Delete
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAttendanceModal && (
        <AttendanceModal
          babysitter={selectedItem}
          onClose={() => setShowAttendanceModal(false)}
          onMark={handleMarkAttendance}
        />
      )}
    </div>
  );
};

export default BabysitterManagement; 