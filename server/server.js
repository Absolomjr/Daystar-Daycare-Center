const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load models
require('./models/User');
require('./models/Child');
require('./models/Attendance');
require('./models/Payment');

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
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Import routes
const authRoutes = require('./routes/auth');
const childrenRoutes = require('./routes/children');
const attendanceRoutes = require('./routes/attendance');
const paymentRoutes = require('./routes/payment');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set port
const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  }); 