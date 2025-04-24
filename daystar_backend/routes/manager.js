// Import required modules
const express = require('express');
const router = express.Router();
// Import controller and middleware functions
const managerController = require('../controllers/managerController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
// Apply authentication middleware to all routes in this router
router.use(auth);
// Applying role-based access control, allowing only users with the 'manager' role
router.use(roleCheck(['manager']));
// Route to fetch dashboard statistics for managers
router.get('/dashboard-stats', managerController.getDashboardStats);
// Route to fetch the list of all babysitters managed by the manager
router.get('/babysitters', managerController.getAllBabysitters);
// Export the router so it can be used in the main application
module.exports = router; 
