const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/stats - Aggregation route (3 stages: $match -> $group -> $sort)
router.get('/', async (req, res) => {
  try {
    const stats = await Student.aggregate([
      // Stage 1: Filter active students
      { 
        $match: { status: 'active' } 
      },
      // Stage 2: Group by department and compute metrics
      { 
        $group: {
          _id: '$department',
          totalStudents: { $sum: 1 },
          averageGpa: { $avg: '$gpa' }
        }
      },
      // Stage 3: Sort by totalStudents descending
      { 
        $sort: { totalStudents: -1 } 
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;