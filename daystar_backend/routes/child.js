const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');


router.post('/add', childController.addChild);

module.exports = router;
