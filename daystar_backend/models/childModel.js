const db = require('../config/database');

exports.createChild = (child, callback) => {
  const { first_name, last_name, date_of_birth, gender, parent_email, allergies, special_needs } = child;
  const query = `
    INSERT INTO children (first_name, last_name, date_of_birth, gender, parent_email, allergies, special_needs)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [first_name, last_name, date_of_birth, gender, parent_email, allergies, special_needs], callback);
};
