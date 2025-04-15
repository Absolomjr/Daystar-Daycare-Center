const express = require('express');
const router = express.Router();
const babysitterController = require('../controllers/babysitterController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);
router.use(roleCheck(['babysitter']));

router.get('/assigned-children', babysitterController.getAssignedChildren);
router.post('/mark-attendance', babysitterController.markAttendance);

module.exports = router; 