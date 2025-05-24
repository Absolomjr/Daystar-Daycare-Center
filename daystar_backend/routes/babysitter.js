const express = require('express');
const babysitterRoutes = express.Router();
const babysitterController = require('../controllers/babysitterController');

Add babysitter from form
babysitterRoutes.post('/add', babysitterController.addBabysitter);

module.exports = babysitterRoutes;
