import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAttendance } from '../../redux/slices/childrenSlice';
import api from '../../services/api';

const AttendanceTracker = () => {
  const dispatch = useDispatch();
  const { children } = useSelector((state) => state.children);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/attendance/${selectedDate}`);
        setAttendance(response.data.reduce((acc, curr) => {
          acc[curr.childId] = curr.status;
          return acc;
        }, {}));
        setError('');
      } catch (err) {
        setError('Failed to fetch attendance');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate]);

  const handleAttendanceChange = async (childId, status) => {
    try {
      await api.post('/attendance', {
        childId,
        date: selectedDate,
        status
      });
      
      setAttendance(prev => ({
        ...prev,
        [childId]: status
      }));
      
      dispatch(updateAttendance({
        date: selectedDate,
        attendance: {
          ...attendance,
          [childId]: status
        }
      }));
    } catch (error) {
      setError('Failed to update attendance');
    }
  };

  if (loading) return <div>Loading attendance...</div>;

  return (
    <div className="attendance-tracker">
      <div className="tracker-header">
        <h2>Daily Attendance</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="attendance-list">
        <table className="table">
          <thead>
            <tr>
              <th>Child Name</th>
              <th>Session Type</th>
              <th>Status</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td>{child.fullName}</td>
                <td>{child.sessionType}</td>
                <td>
                  <select
                    value={attendance[child.id] || 'absent'}
                    onChange={(e) => handleAttendanceChange(child.id, e.target.value)}
                    className={`status-select ${attendance[child.id] || 'absent'}`}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </td>
                <td>
                  {attendance[child.id] === 'present' && (
                    <input
                      type="time"
                      className="time-input"
                      onChange={(e) => handleAttendanceChange(child.id, 'present', { checkIn: e.target.value })}
                    />
                  )}
                </td>
                <td>
                  {attendance[child.id] === 'present' && (
                    <input
                      type="time"
                      className="time-input"
                      onChange={(e) => handleAttendanceChange(child.id, 'present', { checkOut: e.target.value })}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-small btn-info"
                    onClick={() => {/* Add notes or additional information */}}
                  >
                    Add Note
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTracker;
