const express = require('express');
const cors = require('cors');
const mathRoutes = require('./routes/mathRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',  // Allow React app to connect
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure JSON parsing with increased limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware
app.use(logger);

// Routes
app.use('/api', mathRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;