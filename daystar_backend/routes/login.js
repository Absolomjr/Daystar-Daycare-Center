const express = require('express');
const loginRoute = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const db = require('../config/database'); // adjust as necessary

// User Login
loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
  
    const sql = 'SELECT * FROM users WHERE email = ?';
  
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const user = results[0];
        // console.log(user)
      // Compare password with hash
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ message: 'Server error.' });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
  
        // If everything checks out
        return res.status(200).json({
          message: 'Login successful!',
          userinfo: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
          }
          
        });

       
      });
    });
  });
  

module.exports = loginRoute;
