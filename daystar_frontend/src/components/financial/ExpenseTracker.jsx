import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ExpenseTracker = () => {
  // Initialize states for expense tracking
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Predefined expense categories
  const expenseCategories = [
    'Salaries',
    'Supplies',
    'Utilities',
    'Maintenance',
    'Food',
    'Equipment',
    'Other'
  ];

  // Fetch existing expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Function to fetch expenses from API
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/expenses', newExpense);
      setExpenses(prev => [...prev, response.data]);
      
      // Reset form
      setNewExpense({
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="expense-tracker">
      <div className="expense-header">
        <h2>Expense Tracker</h2>
        <div className="total-expenses">
          Total Expenses: UGX {totalExpenses.toLocaleString()}
        </div>
      </div>

      {/* Expense Form */}
      <div className="expense-form card">
        <h3>Add New Expense</h3>
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={newExpense.category}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Select category</option>
                {expenseCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
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
                value={newExpense.amount}
                onChange={handleChange}
                required
                min="0"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newExpense.date}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newExpense.description}
              onChange={handleChange}
              className="form-control"
              rows="2"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>

      {/* Expenses List */}
      <div className="expenses-list">
        <h3>Recent Expenses</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>UGX {Number(expense.amount).toLocaleString()}</td>
                <td>
                  <button 
                    className="btn btn-small btn-edit"
                    onClick={() => {/* Add edit functionality */}}
                  >
                    Edit
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

export default ExpenseTracker;
