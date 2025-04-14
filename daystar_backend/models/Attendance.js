const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Attendance extends Model {}

Attendance.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  childId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  babysitterId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late'),
    defaultValue: 'present'
  }
}, {
  sequelize,
  modelName: 'Attendance',
  timestamps: true
});

module.exports = Attendance;
