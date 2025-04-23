const Attendance = require('../models/Attendance');
const Child = require('../models/Child');
const User = require('../models/User');
const { Op } = require('sequelize');

const attendanceController = {
  markAttendance: async (req, res) => {
    try {
      const { childId, type, notes } = req.body;
      const babysitterId = req.user.id;

      if (type === 'checkIn') {
        // Check if child has already been checked into another session
        const existingCheckIn = await Attendance.findOne({
          where: {
            childId,
            checkOut: null
          }
        });

        if (existingCheckIn) {
          return res.status(400).json({ message: 'Child is already checked in' });
        }

        const attendance = await Attendance.create({
          childId,
          babysitterId,
          checkIn: new Date(),
          notes
        });

        res.status(201).json({
          message: 'Check-in recorded successfully',
          attendance
        });
      } else {
        // Find the open attendance record
        const attendance = await Attendance.findOne({
          where: {
            childId,
            checkOut: null
          }
        });

        if (!attendance) {
          return res.status(404).json({ message: 'No active check-in found' });
        }

        attendance.checkOut = new Date();
        attendance.notes = notes || attendance.notes;
        await attendance.save();

        res.json({
          message: 'Check-out recorded successfully',
          attendance
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error recording attendance' });
    }
  },

  getAttendanceHistory: async (req, res) => {
    try {
      const { startDate, endDate, childId } = req.query;
      const whereClause = {};

      if (childId) {
        whereClause.childId = childId;
      }

      if (startDate && endDate) {
        whereClause.checkIn = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const attendance = await Attendance.findAll({
        where: whereClause,
        include: [
          {
            model: Child,
            attributes: ['firstName', 'lastName']
          },
          {
            model: User,
            as: 'babysitter',
            attributes: ['firstName', 'lastName']
          }
        ],
        order: [['checkIn', 'DESC']]
      });

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance records' });
    }
  },

  getDailyReport: async (req, res) => {
    try {
      const date = req.query.date || new Date();
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const attendance = await Attendance.findAll({
        where: {
          checkIn: {
            [Op.between]: [startOfDay, endOfDay]
          }
        },
        include: [
          {
            model: Child,
            attributes: ['firstName', 'lastName']
          },
          {
            model: User,
            as: 'babysitter',
            attributes: ['firstName', 'lastName']
          }
        ]
      });

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Error generating daily report' });
    }
  },

  scheduleSession: async (req, res) => {
    try {
      const { childId, babysitterId, date, startTime, endTime } = req.body;
      
      // Validate if child and babysitter exist
      const child = await Child.findByPk(childId);
      const babysitter = await User.findOne({
        where: { id: babysitterId, role: 'babysitter' }
      });

      if (!child || !babysitter) {
        return res.status(404).json({ message: 'Child or babysitter not found' });
      }

      // Check for scheduling conflicts
      const existingSession = await Attendance.findOne({
        where: {
          babysitterId,
          date,
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [startTime, endTime]
              }
            },
            {
              endTime: {
                [Op.between]: [startTime, endTime]
              }
            }
          ]
        }
      });

      if (existingSession) {
        return res.status(400).json({ message: 'Scheduling conflict detected' });
      }

      // Create the scheduled session
      const scheduledSession = await Attendance.create({
        childId,
        babysitterId,
        date,
        startTime,
        endTime,
        status: 'scheduled'
      });

      res.status(201).json(scheduledSession);
    } catch (error) {
      console.error('Error scheduling session:', error);
      res.status(500).json({ message: 'Error scheduling session' });
    }
  }
};

module.exports = attendanceController;
