const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

// Import models
const User = require('../models/User');
const Child = require('../models/Child');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const Schedule = require('../models/Schedule');

// Define associations
User.hasMany(Child, { foreignKey: 'parentId' });
Child.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });

User.hasMany(Schedule, { foreignKey: 'babysitterId' });
Schedule.belongsTo(User, { as: 'babysitter', foreignKey: 'babysitterId' });

Child.hasMany(Schedule);
Schedule.belongsTo(Child);

Child.hasMany(Attendance);
Attendance.belongsTo(Child);

User.hasMany(Attendance, { foreignKey: 'babysitterId' });
Attendance.belongsTo(User, { as: 'babysitter', foreignKey: 'babysitterId' });

User.hasMany(Payment, { foreignKey: 'parentId' });
Payment.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });

module.exports = sequelize; 