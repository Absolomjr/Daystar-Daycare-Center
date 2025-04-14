import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChildrenStart, fetchChildrenSuccess, fetchChildrenFailure, deleteChild } from '../../redux/slices/childrenSlice';
import api from '../../services/api';

const ChildList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { children, loading, error } = useSelector((state) => state.children);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, full-day, half-day

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        dispatch(fetchChildrenStart());
        const response = await api.get('/children');
        dispatch(fetchChildrenSuccess(response.data));
      } catch (error) {
        dispatch(fetchChildrenFailure(error.message));
      }
    };

    fetchChildren();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this child\'s record?')) {
      try {
        await api.delete(`/children/${id}`);
        dispatch(deleteChild(id));
      } catch (error) {
        console.error('Failed to delete child:', error);
      }
    }
  };

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || child.sessionType === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="child-list">
      <div className="list-header">
        <h2>Children</h2>
        <div className="list-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search children..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Sessions</option>
            <option value="full-day">Full Day</option>
            <option value="half-day">Half Day</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/children/add')}
          >
            Add New Child
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Parent/Guardian</th>
              <th>Contact</th>
              <th>Session Type</th>
              <th>Special Needs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map((child) => (
              <tr key={child.id}>
                <td>{child.fullName}</td>
                <td>{child.age}</td>
                <td>{child.guardianName}</td>
                <td>{child.guardianContact}</td>
                <td>
                  <span className={`badge ${child.sessionType}`}>
                    {child.sessionType}
                  </span>
                </td>
                <td>
                  {child.specialNeeds ? (
                    <span className="special-needs-indicator" title={child.specialNeeds}>
                      ⚕️
                    </span>
                  ) : '—'}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-small btn-info"
                      onClick={() => navigate(`/children/${child.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => navigate(`/children/edit/${child.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(child.id)}
                    >
                      Delete
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
};

export default ChildList;
