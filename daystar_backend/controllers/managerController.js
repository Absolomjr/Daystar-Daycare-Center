const User = require('../models/User');
const Child = require('../models/Child');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

const managerController = {
  getDashboardStats: async (req, res) => {
    try {
      const totalChildren = await Child.count();
      const totalBabysitters = await User.count({ where: { role: 'babysitter' } });
      const todayAttendance = await Attendance.count({
        where: {
          checkIn: {
            [Op.gte]: new Date().setHours(0, 0, 0, 0)
          }
        }
      });

      res.json({
        totalChildren,
        totalBabysitters,
        todayAttendance
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
  },

  getAllBabysitters: async (req, res) => {
    try {
      const babysitters = await User.findAll({
        where: { role: 'babysitter' },
        attributes: ['id', 'firstName', 'lastName', 'email']
      });
      res.json(babysitters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching babysitters' });
    }
  },

  // Add more manager-specific functions
};

module.exports = managerController;
