const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);

Routes accessible by both managers and babysitters
router.post('/mark', roleCheck(['manager', 'babysitter']), attendanceController.markAttendance);
router.get('/history', roleCheck(['manager', 'babysitter']), attendanceController.getAttendanceHistory);

// Routes accessible only by managers
router.get('/daily-report', roleCheck(['manager']), attendanceController.getDailyReport);

router.post('/schedule', auth, roleCheck(['manager']), attendanceController.scheduleSession);

module.exports = router;
