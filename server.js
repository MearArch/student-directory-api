require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Added cors import

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // 2. Added cors middleware

// Import Routes
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));