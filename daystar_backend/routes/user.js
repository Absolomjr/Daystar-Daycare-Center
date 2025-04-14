const express = require('express');
const userRoutes = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

// POST create new user
userRoutes.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    nin,
    date_of_birth,
    next_of_kin_name,
    next_of_kin_phone,
    next_of_kin_relationship
  } = req.body;

  console.log(req.body)

  const encryptedPassword = await bcrypt.hash(password, 10);
  

  // Fixing the column names and handling the fields correctly

    const query = `INSERT INTO users (first_name, last_name, email, password, role, nin, date_of_birth, next_of_kin_name, next_of_kin_phone, next_of_kin_relationship)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  `;

  db.query(query, [
    firstName,
    lastName,
    email,
    encryptedPassword,
    role,
    nin || 'N/A', // If NIN is not provided, use 'N/A'
    date_of_birth || null, // If no date of birth is provided, use null
    next_of_kin_name || 'N/A', // If next of kin name is missing, use 'N/A'
    next_of_kin_phone || 'N/A', // If next of kin phone number is missing, use 'N/A'
    next_of_kin_relationship || 'N/A' // If no relationship is provided, default to 'other'
  ], (err, result) => {
    if (err) {
      console.error('Error inserting user: ', err);
      return res.status(500).json({ error: 'Failed to add user.' });
    }
    res.status(201).json({ message: 'User added successfully!', userId: result.insertId });
  });
});

module.exports = userRoutes;
