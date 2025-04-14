const validator = {
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  validatePassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  },

  validateDate: (date) => {
    return !isNaN(Date.parse(date));
  },

  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  },

  validateChildData: (data) => {
    const errors = [];
    
    if (!data.firstName) errors.push('First name is required');
    if (!data.lastName) errors.push('Last name is required');
    if (!data.dateOfBirth) errors.push('Date of birth is required');
    if (!data.gender) errors.push('Gender is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validatePayment: (data) => {
    const errors = [];
    
    if (!data.parentId) errors.push('Parent ID is required');
    if (!data.amount || data.amount <= 0) errors.push('Valid amount is required');
    if (!data.paymentMethod) errors.push('Payment method is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

module.exports = validator;
