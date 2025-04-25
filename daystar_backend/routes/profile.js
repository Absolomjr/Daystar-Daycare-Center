const express = require('express');
const profileRoutes = express.Router();
const profileRoute = express.Router();
const db = require('../config/database');

// helps to GET babysitter profile by id
profileRoutes.get('/:email', (req, res) => {
  const babysitterEmail = req.params.email;
console.log(babysitterEmail)
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [babysitterEmail], (err, results) => {
    if (err) {
      console.error('Error fetching the babysitter profile:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(results[0]);
  });
});

profileRoute.put('/api/profile/:email', (req, res) => {
    const { email } = req.params;
    const { first_name, last_name, role, nin, date_of_birth, next_of_kin_name, next_of_kin_phone, next_of_kin_relationship } = req.body;
  
    // Validate the data
    if (!first_name || !last_name || !role) {
      return res.status(400).json({ message: 'First Name, Last Name, and Role are required' });
    }
  
    // helps to Update profile in MySQL database
    db.query(
      'UPDATE users SET first_name = ?, last_name = ?, role = ?, nin = ?, date_of_birth = ?, next_of_kin_name = ?, next_of_kin_phone = ?, next_of_kin_relationship = ? WHERE email = ?',
      [first_name, last_name, role, nin, date_of_birth, next_of_kin_name, next_of_kin_phone, next_of_kin_relationship, email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to update profile' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Profile not found' });
        }
  
        res.json({ message: 'Profile updated successfully' });
      }
    );
  });

module.exports = profileRoutes, profileRoute;
