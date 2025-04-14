const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function initializeDefaultUsers() {
  try {
    // Create manager
    const managerExists = await User.findOne({ where: { email: 'hummy@gmail.com' } });
    if (!managerExists) {
      const managerPassword = await bcrypt.hash('hummy123', 10);
      await User.create({
        firstName: 'Hummy',
        lastName: 'Manager',
        username: 'hummy',
        email: 'hummy@gmail.com',
        password: managerPassword,
        role: 'manager'
      });
      console.log('Manager account created');
    }

    // Create babysitter
    const babysitterExists = await User.findOne({ where: { email: 'timothy@gmail.com' } });
    if (!babysitterExists) {
      const babysitterPassword = await bcrypt.hash('timothy123', 10);
      await User.create({
        firstName: 'Timothy',
        lastName: 'Sitter',
        username: 'timothy',
        email: 'timothy@gmail.com',
        password: babysitterPassword,
        role: 'babysitter'
      });
      console.log('Babysitter account created');
    }
  } catch (error) {
    console.error('Error initializing default users:', error);
  }
}

module.exports = initializeDefaultUsers; 