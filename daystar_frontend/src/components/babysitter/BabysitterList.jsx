import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBabysittersStart, fetchBabysittersSuccess, fetchBabysittersFailure, deleteBabysitter } from '../../redux/slices/babysitterSlice';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const BabysitterList = () => {
  const dispatch = useDispatch();
  const { babysitters, loading, error } = useSelector((state) => state.babysitters);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        dispatch(fetchBabysittersStart());
        const response = await api.get('/babysitters');
        dispatch(fetchBabysittersSuccess(response.data));
      } catch (error) {
        dispatch(fetchBabysittersFailure(error.message));
      }
    };

    fetchBabysitters();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this babysitter?')) {
      try {
        await api.delete(`/babysitters/${id}`);
        dispatch(deleteBabysitter(id));
      } catch (error) {
        console.error('Failed to delete babysitter:', error);
      }
    }
  };

  const filteredBabysitters = babysitters.filter(babysitter =>
    babysitter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="babysitter-list">
      <div className="list-header">
        <h2>Babysitters</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search babysitters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBabysitters.map((babysitter) => (
            <tr key={babysitter.id}>
              <td>{babysitter.name}</td>
              <td>{babysitter.phone}</td>
              <td>{babysitter.email}</td>
              <td>{babysitter.age}</td>
              <td>
                <span className={`status-badge ${babysitter.status.toLowerCase()}`}>
                  {babysitter.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn btn-edit"
                    onClick={() => navigate(`/babysitters/edit/${babysitter.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDelete(babysitter.id)}
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
  );
};

export default BabysitterList;
