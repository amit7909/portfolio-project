// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// === IMPORT ROUTES ===
const projectRoutes = require('./routes/projectRoutes'); 
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

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
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/ai', aiRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;