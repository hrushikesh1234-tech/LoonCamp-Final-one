const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static files from React admin panel
const adminPath = path.join(__dirname, 'public/admin');

// Middleware to handle /admin trailing slash
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  if (req.path === '/admin') {
    console.log('Redirecting /admin to /admin/');
    return res.redirect(301, '/admin/');
  }
  next();
});

// Inject environment variables into the admin panel
app.get('/admin/config.js', (req, res) => {
  const config = {
    REACT_APP_CLOUDINARY_CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || '/api'
  };
  res.header('Content-Type', 'application/javascript');
  res.send(`window._env_ = ${JSON.stringify(config)};`);
});

// Serve static files for admin
app.use('/admin', express.static(adminPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Root route - redirect to admin or show welcome message
app.get('/', (req, res) => {
  res.redirect('/admin/');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'LoonCamp API is running',
    timestamp: new Date().toISOString(),
  });
});

// Admin SPA routing - specifically for React Router inside /admin
// This catches any URL that starts with /admin and isn't a file or API
app.get(/^\/admin.*/, (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

// 404 handler for API routes
app.use(/^\/api.*/, (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err.message && err.message.includes('File size too large')) {
    return res.status(400).json({
      success: false,
      message: 'Image file size is too large (max 10MB). Please compress the image or use a smaller file.',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=================================`);
  console.log(`LoonCamp API Server`);
  console.log(`=================================`);
  console.log(`Cloudinary Config: { cloud_name: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Present' : 'Missing'}, api_key: ${process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing'}, api_secret: ${process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'} }`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
  console.log(`Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`=================================\n`);
});

module.exports = app;
