const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Initial in-memory student data
let students = [
  { id: 1, name: 'Alice', course: 'Computer Science' },
  { id: 2, name: 'Bob', course: 'Information Technology' }
];

// 1. GET /api/students - Fetch all
app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

// 2. GET /api/students/:id - Fetch single
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.status(200).json(student);
});

// 3. POST /api/students - Create
app.post('/api/students', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ error: 'Name and course are required fields' });
  }

  const newStudent = {
    id: Date.now(),
    name,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. DELETE /api/students/:id - Delete
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students.splice(studentIndex, 1);
  res.status(200).json({ message: `Student with ID ${studentId} deleted successfully` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});