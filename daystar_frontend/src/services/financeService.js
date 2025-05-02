import api from './api';
// importing the services api
export const financeService = {
  async getFinancialSummary(period) {
    const response = await api.get(`/finances/summary?period=${period}`);
    return response.data;
  },

  async getTransactions(params) {
    const response = await api.get('/finances/transactions', { params });
    return response.data;
  },

  async addExpense(expenseData) {
    const response = await api.post('/finances/expenses', expenseData);
    return response.data;
  },

  async addIncome(incomeData) {
    const response = await api.post('/finances/income', incomeData);
    return response.data;
  },

  async generateReport(params) {
    const response = await api.get('/finances/report', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  },

  async getBudgetStatus() {
    const response = await api.get('/finances/budget-status');
    return response.data;
  },

  async updateBudget(budgetData) {
    const response = await api.put('/finances/budget', budgetData);
    return response.data;
  },
};
