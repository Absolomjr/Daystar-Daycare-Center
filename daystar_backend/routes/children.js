const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);

// Routes accessible by managers and babysitters
router.get('/', roleCheck(['manager', 'babysitter']), childController.getAllChildren);
router.get('/:id', roleCheck(['manager', 'babysitter']), childController.getChildById);

// Routes accessible only by managers
router.post('/', roleCheck(['manager']), childController.registerChild);
router.put('/:id', roleCheck(['manager']), childController.updateChild);
router.delete('/:id', roleCheck(['manager']), childController.deleteChild);

module.exports = router;
