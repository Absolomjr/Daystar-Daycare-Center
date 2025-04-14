import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const BabysitterSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());

  function getStartOfWeek(date = new Date()) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/babysitters/${id}/schedule`, {
          params: {
            startDate: selectedWeek.toISOString(),
          }
        });
        setSchedule(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id, selectedWeek]);

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  if (loading) return <div>Loading schedule...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="babysitter-schedule">
      <div className="schedule-header">
        <h2>Weekly Schedule</h2>
        <div className="week-navigation">
          <button onClick={handlePreviousWeek}>&lt; Previous Week</button>
          <span>{selectedWeek.toLocaleDateString()} - {
            new Date(selectedWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }</span>
          <button onClick={handleNextWeek}>Next Week &gt;</button>
        </div>
      </div>

      <div className="schedule-grid">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
          const currentDate = new Date(selectedWeek);
          currentDate.setDate(currentDate.getDate() + index);
          const daySchedule = schedule.find(s => 
            new Date(s.date).toDateString() === currentDate.toDateString()
          );

          return (
            <div key={day} className="schedule-day">
              <h3>{day}</h3>
              <div className="date">{currentDate.toLocaleDateString()}</div>
              {daySchedule ? (
                <div className="schedule-details">
                  <p>Shift: {daySchedule.shift}</p>
                  <p>Children: {daySchedule.childrenCount}</p>
                  <p>Hours: {daySchedule.hours}</p>
                </div>
              ) : (
                <div className="no-schedule">No schedule</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BabysitterSchedule;
