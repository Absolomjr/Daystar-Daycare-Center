const express = require('express');
const childRoutes = express.Router();
const childController = require('../controllers/childController');


childRoutes.post('/add', childController.addChild);

module.exports = childRoutes;
