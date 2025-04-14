import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/financial/PaymentForm';
import ExpenseTracker from '../components/financial/ExpenseTracker';
import FinancialReports from '../components/financial/FinancialReports';
import api from '../services/api';

const FinancialManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('payments');

  // Calculate current month's financial summary
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/finances/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="financial-management">
      {/* Page Header */}
      <div className="page-header">
        <h1>Financial Management</h1>
        <div className="financial-summary">
          <div className="summary-item">
            <span className="label">Total Income:</span>
            <span className="amount positive">
              UGX {summary.totalIncome.toLocaleString()}
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Total Expenses:</span>
            <span className="amount negative">
              UGX {summary.totalExpenses.toLocaleString()}
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Balance:</span>
            <span className={`amount ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
              UGX {summary.balance.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('payments');
            navigate('/finances/payments');
          }}
        >
          Payments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('expenses');
            navigate('/finances/expenses');
          }}
        >
          Expenses
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('reports');
            navigate('/finances/reports');
          }}
        >
          Reports
        </button>
      </div>

      {/* Routes for different sections */}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/payments" element={<PaymentForm />} />
          <Route path="/expenses" element={<ExpenseTracker />} />
          <Route path="/reports" element={<FinancialReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default FinancialManagement;
