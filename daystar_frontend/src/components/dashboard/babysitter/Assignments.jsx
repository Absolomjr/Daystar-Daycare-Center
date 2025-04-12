import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const assignments = [
    // Active Assignments
    {
      id: 1,
      familyName: 'Doe Family',
      date: '2023-10-15',
      time: '09:00 AM - 12:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 2,
      status: 'Active',
      childDetails: {
        id: 1,
        name: 'John Doe',
        age: 5,
        allergies: 'Peanuts',
        specialNeeds: 'None'
      }
    },
    {
      id: 2,
      familyName: 'Johnson Family',
      date: '2023-10-17',
      time: '10:00 AM - 01:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 3,
      status: 'Active',
      childDetails: {
        id: 3,
        name: 'Emily Johnson',
        age: 6,
        allergies: 'None',
        specialNeeds: 'Asthma'
      }
    },
    {
      id: 3,
      familyName: 'Brown Family',
      date: '2023-10-18',
      time: '02:00 PM - 05:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 1,
      status: 'Active',
      childDetails: {
        id: 4,
        name: 'Michael Brown',
        age: 4,
        allergies: 'Dairy',
        specialNeeds: 'None'
      }
    },
    // Pending Assignments
    {
      id: 4,
      familyName: 'Smith Family',
      date: '2023-10-16',
      time: '01:00 PM - 04:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 1,
      status: 'Pending',
      childDetails: {
        id: 2,
        name: 'Anna Smith',
        age: 4,
        allergies: 'None',
        specialNeeds: 'Gluten-free diet'
      }
    },
    {
      id: 5,
      familyName: 'Williams Family',
      date: '2023-10-19',
      time: '09:00 AM - 12:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 2,
      status: 'Pending',
      childDetails: {
        id: 5,
        name: 'Sophia Williams',
        age: 5,
        allergies: 'None',
        specialNeeds: 'None'
      }
    },
    {
      id: 6,
      familyName: 'Taylor Family',
      date: '2023-10-20',
      time: '11:00 AM - 02:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 2,
      status: 'Pending',
      childDetails: {
        id: 6,
        name: 'Lucas Taylor',
        age: 3,
        allergies: 'Eggs',
        specialNeeds: 'None'
      }
    },
    {
      id: 7,
      familyName: 'Anderson Family',
      date: '2023-10-21',
      time: '03:00 PM - 06:00 PM',
      sessionDuration: '3 hours',
      numberOfChildren: 1,
      status: 'Pending',
      childDetails: {
        id: 7,
        name: 'Olivia Anderson',
        age: 5,
        allergies: 'None',
        specialNeeds: 'None'
      }
    }
  ];

  const handleViewDetails = (childDetails) => {
    navigate(`/child-details/${childDetails.id}`, { state: { childDetails } });
  };

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.status.toLowerCase() === activeTab
  );

  return (
    <div className="assignments-container">
      <h2>My Assignments</h2>
      <div className="tabs">
        <button
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
      </div>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Family</th>
            <th>Date</th>
            <th>Time</th>
            <th>Session Duration</th>
            <th>Number of Children</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.familyName}</td>
              <td>{assignment.date}</td>
              <td>{assignment.time}</td>
              <td>{assignment.sessionDuration}</td>
              <td>{assignment.numberOfChildren}</td>
              <td>
                <button onClick={() => handleViewDetails(assignment.childDetails)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
