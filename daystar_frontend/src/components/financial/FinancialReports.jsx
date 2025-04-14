import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinancialReports = () => {
  // State management for financial data and filters
  const [reportData, setReportData] = useState({
    income: [],
    expenses: [],
    summary: {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    }
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Move fetchFinancialData into useCallback
  const fetchFinancialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/finances/reports', {
        params: dateRange
      });
      setReportData(response.data);
    } catch (err) {
      setError('Failed to fetch financial data');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  // Use isLoading in your JSX
  if (isLoading) return <div>Loading...</div>;

  // Handle date range changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate PDF report
  const generatePDFReport = async () => {
    try {
      const response = await api.get('/finances/report/pdf', {
        params: dateRange,
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `financial-report-${dateRange.startDate}-${dateRange.endDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to generate PDF report');
    }
  };

  // Chart configuration for income vs expenses
  const chartData = {
    labels: reportData.income.map(item => item.date),
    datasets: [
      {
        label: 'Income',
        data: reportData.income.map(item => item.amount),
        borderColor: '#4CAF50',
        fill: false
      },
      {
        label: 'Expenses',
        data: reportData.expenses.map(item => item.amount),
        borderColor: '#F44336',
        fill: false
      }
    ]
  };

  return (
    <div className="financial-reports">
      <div className="reports-header">
        <h2>Financial Reports</h2>
        
        {/* Date Range Selector */}
        <div className="date-range-selector">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="form-control"
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={generatePDFReport}
          >
            Generate PDF Report
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Financial Summary Cards */}
      <div className="summary-cards">
        <div className="card summary-card income">
          <h3>Total Income</h3>
          <p className="amount">UGX {reportData.summary.totalIncome.toLocaleString()}</p>
        </div>
        <div className="card summary-card expenses">
          <h3>Total Expenses</h3>
          <p className="amount">UGX {reportData.summary.totalExpenses.toLocaleString()}</p>
        </div>
        <div className="card summary-card balance">
          <h3>Net Balance</h3>
          <p className="amount">UGX {reportData.summary.balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="card chart-card">
          <h3>Income vs Expenses Trend</h3>
          <Line data={chartData} options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `UGX ${value.toLocaleString()}`
                }
              }
            }
          }} />
        </div>

        {/* Expense Categories Chart */}
        <div className="card chart-card">
          <h3>Expense Categories</h3>
          <Bar
            data={{
              labels: ['Salaries', 'Supplies', 'Utilities', 'Maintenance', 'Other'],
              datasets: [{
                label: 'Expenses by Category',
                data: reportData.expenses.reduce((acc, expense) => {
                  acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                  return acc;
                }, {}),
                backgroundColor: [
                  '#4CAF50',
                  '#2196F3',
                  '#FFC107',
                  '#9C27B0',
                  '#FF5722'
                ]
              }]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>

      {/* Detailed Transactions Table */}
      <div className="transactions-table">
        <h3>Recent Transactions</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[...reportData.income, ...reportData.expenses]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(transaction => (
                <tr key={transaction.id} className={transaction.type}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td className={`amount ${transaction.type}`}>
                    UGX {transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialReports;
