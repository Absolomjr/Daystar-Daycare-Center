import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const PaymentForm = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    childId: '',
    amount: '',
    paymentType: 'cash', // cash, mobile money, bank transfer
    paymentPeriod: 'monthly', // daily, weekly, monthly
    description: '',
  });

  // State for children list and loading states
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch children list on component mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await api.get('/children');
        setChildren(response.data);
      } catch (err) {
        setError('Failed to fetch children list');
      }
    };

    fetchChildren();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous error/success messages
    setError('');
    setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/payments', formData);
      setSuccess('Payment recorded successfully');
      
      // Reset form after successful submission
      setFormData({
        childId: '',
        amount: '',
        paymentType: 'cash',
        paymentPeriod: 'monthly',
        description: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form card">
      <h2>Record Payment</h2>
      
      {/* Display error/success messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="childId">Select Child *</label>
          <select
            id="childId"
            name="childId"
            value={formData.childId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select a child</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (UGX) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            className="form-control"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="paymentType">Payment Method *</label>
            <select
              id="paymentType"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="cash">Cash</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="paymentPeriod">Payment Period *</label>
            <select
              id="paymentPeriod"
              name="paymentPeriod"
              value={formData.paymentPeriod}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Record Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
