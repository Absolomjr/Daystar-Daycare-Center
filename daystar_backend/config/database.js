const mysql = require('mysql');
require('dotenv').config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Establish the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // SQL query to create the 'users' table
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('manager', 'babysitter') NOT NULL,
      nin CHAR(14) DEFAULT 'N/A',
      date_of_birth DATE DEFAULT NULL,
      next_of_kin_name VARCHAR(100) DEFAULT 'N/A',
      next_of_kin_phone CHAR(10) DEFAULT 'N/A',
      next_of_kin_relationship ENUM('parent', 'spouse', 'sibling', 'other', 'N/A') DEFAULT 'N/A',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // SQL query to create the 'babysitters' table
  const createBabysitterTable = `
    CREATE TABLE IF NOT EXISTS babysitters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  const createChildrenTable = `
  CREATE TABLE children (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  parent_email VARCHAR(255) NOT NULL,
  allergies TEXT,
  special_needs TEXT
);

`;

  // Create 'users' table
  db.query(createUserTable, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });

  // Create 'babysitters' table
  db.query(createBabysitterTable, (err, result) => {
    if (err) {
      console.error('Error creating babysitters table:', err);
      return;
    }
    console.log('Babysitters table created or already exists');
  });
});

module.exports = db;
