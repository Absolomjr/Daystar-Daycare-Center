const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);
router.use(roleCheck(['manager']));

router.get('/dashboard-stats', managerController.getDashboardStats);
router.get('/babysitters', managerController.getAllBabysitters);

module.exports = router; 