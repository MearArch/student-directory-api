const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students - Return all students with populated user details
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('user', 'email role -_id'); // Field selection: populates email & role, excludes password
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;