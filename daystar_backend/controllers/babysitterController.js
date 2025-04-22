const bcrypt = require('bcryptjs');
const Babysitter = require('../models/babysitterModel');

exports.addBabysitter = (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Hashes the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Password hashing error:', err);
      return res.status(500).json({ message: 'Error hashing password.' });
    }

    // Add hashed password to the request body
    const babysitterData = { ...req.body, password: hashedPassword };

    Babysitter.createBabysitter(babysitterData, (err, result) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Database error.' });
      }
      res.status(201).json({ message: 'Babysitter added successfully!', id: result.insertId });
    });
  });
};
