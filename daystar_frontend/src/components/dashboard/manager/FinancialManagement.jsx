import React, { useState, useEffect } from 'react';
import './FinancialManagement.css';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const FinancialManagement = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // Mock financial data
  const financialData = {
    income: {
      total: 15000000,
      breakdown: {
        fullDaySessions: 10000000,
        halfDaySessions: 5000000
      },
      trends: [
        { month: 'Jan', amount: 12000000 },
        { month: 'Feb', amount: 13500000 },
        { month: 'Mar', amount: 15000000 }
      ]
    },
    expenses: {
      total: 9000000,
      breakdown: {
        babysitterSalaries: 5000000,
        toys: 1000000,
        maintenance: 2000000,
        utilities: 1000000
      }
    },
    budget: {
      monthly: 12000000,
      used: 9000000,
      categories: {
        salaries: { allocated: 6000000, used: 5000000 },
        supplies: { allocated: 2000000, used: 1000000 },
        maintenance: { allocated: 2500000, used: 2000000 },
        utilities: { allocated: 1500000, used: 1000000 }
      }
    }
  };

  // Add more mock data for income tracking
  const incomeData = {
    today: {
      total: 500000,
      sessions: [
        {
          id: 1,
          parentName: 'Mr. & Mrs. Johnson',
          childName: 'Emma Johnson',
          sessionType: 'full-day',
          amount: 5000,
          paymentStatus: 'paid',
          paymentDate: '2024-01-22',
          paymentMethod: 'Mobile Money'
        },
        {
          id: 2,
          parentName: 'Mr. & Mrs. Smith',
          childName: 'John Smith',
          sessionType: 'half-day',
          amount: 2000,
          paymentStatus: 'paid',
          paymentDate: '2024-01-22',
          paymentMethod: 'Cash'
        }
        // Add more sessions as needed
      ]
    },
    monthly: {
      fullDayTotal: 3500000,
      halfDayTotal: 1500000,
      paymentMethods: {
        mobileMoney: 2500000,
        cash: 1500000,
        bankTransfer: 1000000
      },
      dailyBreakdown: [
        { date: '2024-01-01', amount: 150000 },
        { date: '2024-01-02', amount: 180000 },
        // Add more daily data
      ]
    }
  };

  const Overview = () => {
    const overviewData = {
      summary: {
        totalRevenue: 15000000,
        totalExpenses: 9300000,
        netIncome: 5700000,
        previousMonthGrowth: 12.5
      },
      quickStats: [
        {
          title: "Active Children",
          value: 45,
          change: "+5",
          icon: "fa-child",
          color: "#4A90E2"
        },
        {
          title: "Active Babysitters",
          value: 8,
          change: "+2",
          icon: "fa-user-tie",
          color: "#50D2C2"
        },
        {
          title: "Monthly Sessions",
          value: 280,
          change: "+24",
          icon: "fa-calendar-check",
          color: "#F5A623"
        },
        {
          title: "Pending Payments",
          value: "850K",
          change: "-120K",
          icon: "fa-money-bill-wave",
          color: "#FF7373"
        }
      ],
      expenses: [
        {
          category: "Salaries",
          amount: 5000000,
          spent: 3500000,
          color: "#4A90E2"
        },
        {
          category: "Equipment",
          amount: 2000000,
          spent: 1200000,
          color: "#50D2C2"
        },
        {
          category: "Maintenance",
          amount: 1500000,
          spent: 900000,
          color: "#F5A623"
        },
        {
          category: "Utilities",
          amount: 800000,
          spent: 600000,
          color: "#FF7373"
        }
      ]
    };

    return (
      <div className="financial-overview">
        {/* Summary Cards */}
        <div className="summary-section">
          <div className="summary-card main-summary">
            <div className="summary-header">
              <h2>Financial Summary</h2>
              <select className="period-selector">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Total Revenue</span>
                <span className="value positive">
                  UGX {overviewData.summary.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Total Expenses</span>
                <span className="value negative">
                  UGX {overviewData.summary.totalExpenses.toLocaleString()}
                </span>
              </div>
              <div className="summary-item highlight">
                <span className="label">Net Income</span>
                <span className="value">
                  UGX {overviewData.summary.netIncome.toLocaleString()}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Monthly Growth</span>
                <span className="value positive">
                  <i className="fas fa-arrow-up"></i> {overviewData.summary.previousMonthGrowth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          {overviewData.quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color + '15', color: stat.color }}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <div className="stat-numbers">
                  <span className="stat-value">{stat.value}</span>
                  <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expense Overview */}
        <div className="expense-overview">
          <div className="expense-header">
            <h2>Expense Overview</h2>
            <div className="expense-total">
              <span>Total Budget: </span>
              <span className="total-amount">
                UGX {overviewData.expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="expense-cards">
            {overviewData.expenses.map((expense, index) => {
              const percentage = (expense.spent / expense.amount) * 100;
              return (
                <div key={index} className="expense-overview-card">
                  <div className="expense-card-header">
                    <h3>{expense.category}</h3>
                    <span className="percentage" style={{ color: expense.color }}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: expense.color
                      }}
                    />
                  </div>
                  <div className="expense-details">
                    <div className="detail-row">
                      <span>Budget</span>
                      <span>UGX {expense.amount.toLocaleString()}</span>
                    </div>
                    <div className="detail-row">
                      <span>Spent</span>
                      <span>UGX {expense.spent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ExpenseTracking = () => {
    const expenses = [
      {
        id: 1,
        category: "Babysitter Salaries",
        budget: 5000000,
        spent: 3500000,
        color: "#4A90E2",
        icon: "fa-users"
      },
      {
        id: 2,
        category: "Toys and Equipment",
        budget: 2000000,
        spent: 1200000,
        color: "#50D2C2",
        icon: "fa-toys"
      },
      {
        id: 3,
        category: "Center Maintenance",
        budget: 1500000,
        spent: 900000,
        color: "#F5A623",
        icon: "fa-tools"
      },
      {
        id: 4,
        category: "Utility Bills",
        budget: 800000,
        spent: 600000,
        color: "#FF7373",
        icon: "fa-file-invoice"
      }
    ];

    return (
      <div className="expense-tracking-container">
        <div className="expense-header-section">
          <h2>Expense Tracking</h2>
          <div className="total-expenses">
            <div className="total-card">
              <div className="total-info">
                <h3>Total Budget</h3>
                <p>UGX {expenses.reduce((acc, curr) => acc + curr.budget, 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="total-card">
              <div className="total-info">
                <h3>Total Spent</h3>
                <p>UGX {expenses.reduce((acc, curr) => acc + curr.spent, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="expense-grid">
          {expenses.map(expense => {
            const percentage = (expense.spent / expense.budget) * 100;
            const remaining = expense.budget - expense.spent;
            
            return (
              <div key={expense.id} className="expense-card">
                <div className="expense-card-content">
                  <div className="expense-icon">
                    <i className={`fas ${expense.icon}`}></i>
                  </div>
                  <div className="expense-info">
                    <div className="expense-header">
                      <h3>{expense.category}</h3>
                      <span className="percentage">{percentage.toFixed(1)}%</span>
                    </div>
                    
                    <div className="expense-progress-container">
                      <div 
                        className="expense-progress-bar"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: expense.color
                        }}
                      />
                    </div>

                    <div className="expense-amounts">
                      <div className="amount-row">
                        <div className="amount-item">
                          <span className="label">Budget</span>
                          <span className="value">UGX {expense.budget.toLocaleString()}</span>
                        </div>
                        <div className="amount-item">
                          <span className="label">Spent</span>
                          <span className="value">UGX {expense.spent.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="remaining-amount">
                        <span className="label">Remaining</span>
                        <span className="value" style={{ color: remaining < 0 ? '#FF4444' : '#4CAF50' }}>
                          UGX {remaining.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ThresholdAlertModal = ({ alert, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content alert-modal">
        <div className="alert-header">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Budget Threshold Alert</h3>
        </div>
        <div className="alert-body">
          <p className="alert-category">Category: <strong>{alert.name}</strong></p>
          <div className="alert-details">
            <div className="detail-item">
              <span>Budget:</span>
              <span>UGX {alert.budget.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span>Spent:</span>
              <span>UGX {alert.spent.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span>Remaining:</span>
              <span>UGX {(alert.budget - alert.spent).toLocaleString()}</span>
            </div>
            <div className="detail-item threshold-detail">
              <span>Threshold Level:</span>
              <span>{(alert.threshold * 100)}%</span>
            </div>
          </div>
          <div className="alert-message">
            <p>This category has exceeded its budget threshold. Immediate attention required.</p>
          </div>
        </div>
        <div className="alert-actions">
          <button className="acknowledge-btn" onClick={onClose}>
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );

  const BudgetPlanning = () => {
    const [showThresholdAlert, setShowThresholdAlert] = useState(false);
    const [alertDetails, setAlertDetails] = useState(null);

    // Mock budget data
    const budgetData = {
      categories: [
        {
          id: 1,
          name: "Babysitter Salaries",
          budget: 5000000,
          spent: 4800000,
          threshold: 0.9, // 90% threshold
        },
        {
          id: 2,
          name: "Toys and Equipment",
          budget: 2000000,
          spent: 1900000,
          threshold: 0.85, // 85% threshold
        },
        {
          id: 3,
          name: "Center Maintenance",
          budget: 1500000,
          spent: 1400000,
          threshold: 0.8, // 80% threshold
        },
        {
          id: 4,
          name: "Utility Bills",
          budget: 800000,
          spent: 750000,
          threshold: 0.9, // 90% threshold
        }
      ]
    };

    useEffect(() => {
      const checkThresholds = () => {
        budgetData.categories.forEach(category => {
          const spentPercentage = category.spent / category.budget;
          if (spentPercentage >= category.threshold) {
            setAlertDetails(category);
            setShowThresholdAlert(true);
          }
        });
      };

      checkThresholds();
      // Check thresholds every hour
      const interval = setInterval(checkThresholds, 3600000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="budget-planning-section">
        <div className="section-header">
          <h2>Budget Planning</h2>
          <div className="alert-indicator">
            {budgetData.categories.some(cat => (cat.spent / cat.budget) >= cat.threshold) && (
              <span className="alert-badge">
                <i className="fas fa-exclamation-circle"></i>
                Alert
              </span>
            )}
          </div>
        </div>

        <div className="budget-categories">
          {budgetData.categories.map(category => {
            const spentPercentage = (category.spent / category.budget) * 100;
            const isOverThreshold = (category.spent / category.budget) >= category.threshold;

            return (
              <div 
                key={category.id} 
                className={`budget-card ${isOverThreshold ? 'threshold-warning' : ''}`}
              >
                <div className="budget-card-header">
                  <h3>{category.name}</h3>
                  {isOverThreshold && (
                    <i className="fas fa-exclamation-triangle warning-icon"></i>
                  )}
                </div>
                <div className="budget-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${spentPercentage}%`,
                      backgroundColor: isOverThreshold ? '#ff4444' : '#4CAF50'
                    }}
                  ></div>
                </div>
                <div className="budget-details">
                  <div className="budget-item">
                    <span>Budget:</span>
                    <span>UGX {category.budget.toLocaleString()}</span>
                  </div>
                  <div className="budget-item">
                    <span>Spent:</span>
                    <span>UGX {category.spent.toLocaleString()}</span>
                  </div>
                  <div className="budget-item">
                    <span>Remaining:</span>
                    <span>UGX {(category.budget - category.spent).toLocaleString()}</span>
                  </div>
                  <div className="budget-percentage">
                    <span>{spentPercentage.toFixed(1)}% Used</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showThresholdAlert && alertDetails && (
          <ThresholdAlertModal 
            alert={alertDetails} 
            onClose={() => {
              setShowThresholdAlert(false);
              setAlertDetails(null);
            }}
          />
        )}
      </div>
    );
  };

  const ReportsSection = () => {
    const [dateRange, setDateRange] = useState('month');

    // Mock data for charts
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      income: [15000000, 17000000, 16500000, 18000000, 17500000, 19000000],
      expenses: [12000000, 13500000, 13000000, 14500000, 14000000, 15000000],
      categories: {
        labels: ['Salaries', 'Equipment', 'Maintenance', 'Utilities', 'Supplies'],
        data: [45, 20, 15, 12, 8],
        colors: ['#4A90E2', '#50D2C2', '#F5A623', '#FF7373', '#B8E986']
      }
    };

    const lineChartData = {
      labels: monthlyData.labels,
      datasets: [
        {
          label: 'Income',
          data: monthlyData.income,
          borderColor: '#4CAF50',
          tension: 0.4,
          fill: false
        },
        {
          label: 'Expenses',
          data: monthlyData.expenses,
          borderColor: '#FF5252',
          tension: 0.4,
          fill: false
        }
      ]
    };

    const barChartData = {
      labels: monthlyData.labels,
      datasets: [
        {
          label: 'Net Income',
          data: monthlyData.income.map((inc, idx) => inc - monthlyData.expenses[idx]),
          backgroundColor: '#4A90E2'
        }
      ]
    };

    const doughnutData = {
      labels: monthlyData.categories.labels,
      datasets: [{
        data: monthlyData.categories.data,
        backgroundColor: monthlyData.categories.colors
      }]
    };

    const exportToPDF = () => {
      // Create new document
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Add title
      doc.setFontSize(20);
      doc.text('Financial Report', pageWidth / 2, 20, { align: 'center' });

      // Add financial summary table
      autoTable(doc, {
        startY: 40,
        head: [['Month', 'Income', 'Expenses', 'Net Income']],
        body: monthlyData.labels.map((month, idx) => [
          month,
          `UGX ${monthlyData.income[idx].toLocaleString()}`,
          `UGX ${monthlyData.expenses[idx].toLocaleString()}`,
          `UGX ${(monthlyData.income[idx] - monthlyData.expenses[idx]).toLocaleString()}`
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [74, 144, 226],
          textColor: 255,
          fontSize: 12,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        }
      });

      // Add expense distribution title
      doc.setFontSize(16);
      doc.text('Expense Distribution', pageWidth / 2, doc.lastAutoTable.finalY + 20, { align: 'center' });

      // Add expense distribution table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 30,
        head: [['Category', 'Percentage']],
        body: monthlyData.categories.labels.map((category, idx) => [
          category,
          `${monthlyData.categories.data[idx]}%`
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [74, 144, 226],
          textColor: 255,
          fontSize: 12,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        }
      });

      // Save the PDF
      doc.save('financial-report.pdf');
    };

    const exportToCSV = () => {
      let csvContent = "Month,Income,Expenses,Net Income\n";
      
      monthlyData.labels.forEach((month, idx) => {
        csvContent += `${month},${monthlyData.income[idx]},${monthlyData.expenses[idx]},${monthlyData.income[idx] - monthlyData.expenses[idx]}\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'financial-report.csv';
      link.click();
    };

    return (
      <div className="reports-container">
        <div className="reports-header">
          <div className="report-selectors">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              <option value="month">Last 6 Months</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <div className="export-buttons">
            <button onClick={exportToPDF} className="export-btn pdf">
              <i className="fas fa-file-pdf"></i> Export PDF
            </button>
            <button onClick={exportToCSV} className="export-btn csv">
              <i className="fas fa-file-csv"></i> Export CSV
            </button>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card wide">
            <h3>Income vs Expenses Trend</h3>
            <div className="chart-container">
              <Line 
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top'
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Net Income Analysis</h3>
            <div className="chart-container">
              <Bar 
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Expense Distribution</h3>
            <div className="chart-container">
              <Doughnut 
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>
        </div>

        <div className="summary-tables">
          <div className="table-card">
            <h3>Financial Summary</h3>
            <div className="table-container">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Net Income</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.labels.map((month, idx) => (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>UGX {monthlyData.income[idx].toLocaleString()}</td>
                      <td>UGX {monthlyData.expenses[idx].toLocaleString()}</td>
                      <td>UGX {(monthlyData.income[idx] - monthlyData.expenses[idx]).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IncomeTracking = () => {
    const incomeData = {
      summary: {
        totalIncome: 15000000,
        monthlyTarget: 18000000,
        lastMonth: 14200000,
        percentageGrowth: 5.6
      },
      recentPayments: [
        {
          id: 1,
          parent: "John Doe",
          amount: 500000,
          date: "2024-03-15",
          status: "completed",
          type: "Full Day",
          children: 2
        },
        // Add more payment records as needed
      ],
      incomeCategories: [
        {
          category: "Full Day Care",
          amount: 8500000,
          percentage: 56.7,
          color: "#4A90E2"
        },
        {
          category: "Half Day Care",
          amount: 4200000,
          percentage: 28,
          color: "#50D2C2"
        },
        {
          category: "Registration Fees",
          amount: 1800000,
          percentage: 12,
          color: "#F5A623"
        },
        {
          category: "Additional Services",
          amount: 500000,
          percentage: 3.3,
          color: "#FF7373"
        }
      ],
      monthlyTrend: [
        { month: "Jan", amount: 13200000 },
        { month: "Feb", amount: 14200000 },
        { month: "Mar", amount: 15000000 }
      ]
    };

    return (
      <div className="income-tracking-container">
        {/* Income Summary Cards */}
        <div className="income-summary-grid">
          <div className="income-card total-income">
            <div className="income-card-content">
              <div className="income-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="income-details">
                <h3>Total Income</h3>
                <p className="amount">UGX {incomeData.summary.totalIncome.toLocaleString()}</p>
                <span className="trend positive">
                  <i className="fas fa-arrow-up"></i> {incomeData.summary.percentageGrowth}%
                </span>
              </div>
            </div>
            <div className="target-progress">
              <div className="progress-label">
                <span>Target Progress</span>
                <span>{((incomeData.summary.totalIncome / incomeData.summary.monthlyTarget) * 100).toFixed(1)}%</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${(incomeData.summary.totalIncome / incomeData.summary.monthlyTarget) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Income Categories Distribution */}
          <div className="income-card categories">
            <h3>Income Distribution</h3>
            <div className="category-list">
              {incomeData.incomeCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{category.category}</span>
                    <span className="category-percentage">{category.percentage}%</span>
                  </div>
                  <div className="category-progress-container">
                    <div 
                      className="category-progress"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                  <span className="category-amount">
                    UGX {category.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments Table */}
        <div className="recent-payments-card">
          <div className="card-header">
            <h3>Recent Payments</h3>
            <div className="header-actions">
              <button className="filter-btn">
                <i className="fas fa-filter"></i> Filter
              </button>
              <button className="export-btn">
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          <div className="payments-table-container">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Parent</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Children</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomeData.recentPayments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.parent}</td>
                    <td>UGX {payment.amount.toLocaleString()}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                    <td>{payment.type}</td>
                    <td>{payment.children}</td>
                    <td>
                      <span className={`status-badge ${payment.status}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-btn">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="receipt-btn">
                          <i className="fas fa-file-invoice"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'income':
        return <IncomeTracking />;
      case 'expenses':
        return <ExpenseTracking />;
      case 'budget':
        return <BudgetPlanning />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="financial-management-container">
      <div className="section-header">
        <h2>Financial Management</h2>
        <div className="section-nav">
          <button 
            className={activeSection === 'overview' ? 'active' : ''}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button 
            className={activeSection === 'income' ? 'active' : ''}
            onClick={() => setActiveSection('income')}
          >
            Income Tracking
          </button>
          <button 
            className={activeSection === 'expenses' ? 'active' : ''}
            onClick={() => setActiveSection('expenses')}
          >
            Expense Tracking
          </button>
          <button 
            className={activeSection === 'budget' ? 'active' : ''}
            onClick={() => setActiveSection('budget')}
          >
            Budget Planning
          </button>
          <button 
            className={activeSection === 'reports' ? 'active' : ''}
            onClick={() => setActiveSection('reports')}
          >
            Reports
          </button>
        </div>
      </div>

      <div className="section-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default FinancialManagement; 