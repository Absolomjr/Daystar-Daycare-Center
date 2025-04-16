const express = require('express');
const profileRoutes = express.Router();
const db = require('../config/database');

// GET babysitter profile by id
profileRoutes.get('/:email', (req, res) => {
  const babysitterEmail = req.params.email;
console.log(babysitterEmail)
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [babysitterEmail], (err, results) => {
    if (err) {
      console.error('Error fetching babysitter profile:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(results[0]);
  });
});

module.exports = profileRoutes;
