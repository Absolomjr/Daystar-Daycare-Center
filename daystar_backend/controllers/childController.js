const Child = require('../models/childModel');
const db = require('../config/database');

exports.addChild  = (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, parentEmail, allergies, specialNeeds } = req.body;
  // Validate required fields
  if (!firstName || !lastName || !dateOfBirth || !gender || !parentEmail) {
    return res.status(400).json({
      message: 'Required fields are missing.',
      details: 'firstName, lastName, dateOfBirth, gender, and parentEmail are required.',
    });
  }

  console.log(firstName)

  // Prepare the query
  const query = `INSERT INTO children (first_name, last_name, date_of_birth, gender, parent_email, allergies, special_needs)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Use 'N/A' for allergies and special needs if they are not provided, or null if needed
  db.query(query, [
    firstName,
    lastName,
    dateOfBirth,
    gender,
    parentEmail,
    allergies || 'N/A',   // Default 'N/A' if allergies are not provided
    specialNeeds || 'N/A'  // Default 'N/A' if special needs are not provided
  ], (err, result) => {
    if (err) {
      console.error('Error inserting child: ', err);
      return res.status(500).json({
        error: 'Failed to add child.',
        details: err.message,
      });
    }
    res.status(201).json({
      message: 'Child added successfully!',
      childId: result.insertId,  // Return the ID of the inserted child
    });
  });
};

