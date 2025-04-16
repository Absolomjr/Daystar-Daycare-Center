const Child = require('../models/childModel');

exports.addChild = (req, res) => {
  const { first_name, last_name, date_of_birth, gender, parent_email, allergies, special_needs } = req.body;

  if (!first_name || !last_name || !date_of_birth || !gender || !parent_email) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  Child.createChild(req.body, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }
    res.status(201).json({ message: 'Child added successfully!', id: result.insertId });
  });
};
