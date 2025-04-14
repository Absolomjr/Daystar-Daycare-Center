const Child = require('../models/Child');
const Attendance = require('../models/Attendance');

const babysitterController = {
  getAssignedChildren: async (req, res) => {
    try {
      const children = await Child.findAll({
        include: [{
          model: Attendance,
          where: { babysitterId: req.user.id },
          required: false
        }]
      });
      res.json(children);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching assigned children' });
    }
  },

  markAttendance: async (req, res) => {
    try {
      const { childId, type } = req.body;
      
      if (type === 'checkIn') {
        await Attendance.create({
          childId,
          babysitterId: req.user.id,
          checkIn: new Date()
        });
      } else {
        await Attendance.update(
          { checkOut: new Date() },
          { 
            where: { 
              childId,
              babysitterId: req.user.id,
              checkOut: null
            }
          }
        );
      }

      res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error marking attendance' });
    }
  }
};

module.exports = babysitterController;
