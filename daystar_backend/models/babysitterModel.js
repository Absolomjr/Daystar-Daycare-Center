const db = require('../config/database');

exports.createBabysitter = (babysitter, callback) => {
  const { first_name, last_name, email, username, password } = babysitter;
  const query = `
    INSERT INTO babysitters (first_name, last_name, email, username, password)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [first_name, last_name, email, username, password], callback);
};
