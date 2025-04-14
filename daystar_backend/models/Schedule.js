// Import Sequelize's DataTypes and the configured sequelize instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Define the Schedule model
const Schedule = sequelize.define('Schedule', {
  id: {// Primary key: auto-incrementing integer ID
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Foreign key referencing the ID of a child in the Children table
  childId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Children',  // references the 'Children' model/table
      key: 'id'           // uses the 'id' field from the Children table
    }
  },
  // Foreign key referencing the ID of a babysitter in the Users table
  babysitterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',   // references the 'Users' model/table (assuming babysitters are users)
      key: 'id'         // uses the 'id' field from the Users table
    }
  },
  // Date of the scheduled babysitting
  date: {
    type: DataTypes.DATEONLY,    // Stores only the date (no time)
    allowNull: false
  },
  // Start time of the babysitting session
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  // End time of the babysitting session
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  // Status of the schedule (can be 'scheduled', 'completed', or 'cancelled')
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  }
});
// Export the model so it can be used in other parts of the app
module.exports = Schedule; 
