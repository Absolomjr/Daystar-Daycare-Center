import React, { useState, useEffect } from 'react';
import './Modals.css';

const ProcessPaymentModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    parentId: '',
    amount: '',
    paymentMethod: '',
    notes: ''
  });
  const [parents, setParents] = useState([]);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/manager/parents');
      const data = await response.json();
      setParents(data);
    } catch (error) {
      console.error('Error fetching parents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Process Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Parent</label>
            <select
              required
              value={formData.parentId}
              onChange={(e) => setFormData({...formData, parentId: e.target.value})}
            >
              <option value="">Select Parent</option>
              {parents.map(parent => (
                <option key={parent.id} value={parent.id}>
                  {parent.firstName} {parent.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount (UGX)</label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              required
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Process Payment</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessPaymentModal;