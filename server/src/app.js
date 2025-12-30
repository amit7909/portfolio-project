// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// === IMPORT ROUTES ===
const projectRoutes = require('./routes/projectRoutes'); 
const authRoutes = require('./routes/authRoutes'); // <--- NEW LINE 1: Import Auth

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); 
app.use(express.json()); 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// === CONNECT ROUTES ===
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes); // <--- NEW LINE 2: Mount Auth Routes

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;