// Validation utility functions
export const validation = {
  Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format (Uganda)
  isValidPhone: (phone) => {
    const phoneRegex = /^(\+256|0)[7,4][0-9]{8}$/;
    return phoneRegex.test(phone);
  },

  // Validate National ID Number
  isValidNIN: (nin) => {
    // Uganda NIN format: CM[A-Z0-9]{12}
    const ninRegex = /^CM[A-Z0-9]{12}$/;
    return ninRegex.test(nin);
  },

  // Validate age range for babysitters (21-35)
  isValidBabysitterAge: (age) => {
    const numAge = parseInt(age);
    return numAge >= 21 && numAge <= 35;
  },

  // Validate amount (positive number)
  isValidAmount: (amount) => {
    return !isNaN(amount) && parseFloat(amount) > 0;
  },

  // Validate required fields
  isNotEmpty: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  }
};
