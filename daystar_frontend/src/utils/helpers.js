// Helper utility functions
export const helpers = {
  // Format currency (UGX)
  formatCurrency: (amount) => {
    return `UGX ${Number(amount).toLocaleString()}`;
  },

  // Format date to local string
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-UG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Calculate age from date of birth
  calculateAge: (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  },

  // Generate time slots for scheduling
  generateTimeSlots: (startTime = '07:00', endTime = '18:00', interval = 30) => {
    const slots = [];
    let start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);

    while (start <= end) {
      slots.push(start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
      start = new Date(start.getTime() + interval * 60000);
    }
    return slots;
  },

  // Calculate payment based on session type
  calculatePayment: (sessionType, days) => {
    const rates = {
      'half-day': 2000,
      'full-day': 5000
    };
    return rates[sessionType] * days;
  },

  // Generate unique reference number
  generateReference: (prefix = 'PAY') => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
  }
};
