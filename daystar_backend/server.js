const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const db = require('./config/database');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const babysitterRoutes = require('./routes/babysitter');
const profileRoutes = require('./routes/profile');
const profileRoute  = require('./routes/profile');
const childRoutes = require('./routes/child')
// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Test route
app.use('/api', userRoutes);
app.use('/api/users', loginRoutes);

app.use('/api/babysitters', babysitterRoutes);
app.use('/api/children', childRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/profile', profileRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

Set port
const PORT = process.env.PORT || 5000;

// Start the server and listen on the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
