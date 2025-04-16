const Babysitter = require('../models/babysitterModel');

exports.addBabysitter = (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  Babysitter.createBabysitter(req.body, (err, result) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }
    res.status(201).json({ message: 'Babysitter added successfully!', id: result.insertId });
  });
};
