const sequelize = require('../config/database');
const User = require('./User');
const Child = require('./Child');
const Attendance = require('./Attendance');
const Payment = require('./Payment');

Define associations
User.hasMany(Child, { foreignKey: 'parentId' });
Child.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });

User.hasMany(Attendance, { foreignKey: 'babysitterId' });
Attendance.belongsTo(User, { as: 'babysitter', foreignKey: 'babysitterId' });

Child.hasMany(Attendance);
Attendance.belongsTo(Child);

User.hasMany(Payment, { foreignKey: 'parentId' });
Payment.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });

module.exports = {
  sequelize,
  User,
  Child,
  Attendance,
  Payment
}; 