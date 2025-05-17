// // backend/controllers/studentController.js
// const connection = require('../db/db'); // Import the MySQL connection

// // Get all students
// exports.getAllStudents = (req, res) => {
//   connection.query('SELECT * FROM students', (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching students', error: err });
//     }
//     res.json(results);
//   });
// };

// // Get a student by ID
// exports.getStudentById = (req, res) => {
//   const { id } = req.params;
//   connection.query('SELECT * FROM students WHERE id = ?', [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching student', error: err });
//     }
//     res.json(result[0]);
//   });
// };

// // Add a new student
// exports.addStudent = (req, res) => {
//   const { name, email, course } = req.body;
//   connection.query(
//     'INSERT INTO students (name, email, course) VALUES (?, ?, ?)', 
//     [name, email, course], 
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error adding student', error: err });
//       }
//       res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
//     }
//   );
// };

// // Update a student's info
// exports.updateStudent = (req, res) => {
//   const { id } = req.params;
//   const { name, email, course } = req.body;
//   connection.query(
//     'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?', 
//     [name, email, course, id], 
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error updating student', error: err });
//       }
//       res.json({ message: 'Student updated successfully' });
//     }
//   );
// };

// // Delete a student
// exports.deleteStudent = (req, res) => {
//   const { id } = req.params;
//   connection.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error deleting student', error: err });
//     }
//     res.json({ message: 'Student deleted successfully' });
//   });
// };

// ---------------------------------------------------------------------
// PART 1

// backend/controllers/studentController.js

// ---------------------------------------------------------------------

// backend/controllers/studentController.js
const db = require('../db/db'); // Import the promise-based pool

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM students');
    res.json(results);
  } catch (err) {
    console.error('Error getting students:', err);
    res.status(500).json({ message: 'Database query error', error: err });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error getting student:', err);
    res.status(500).json({ message: 'Database query error', error: err });
  }
};

// Add a new student
const addStudent = async (req, res) => {
  const { name, age, grade } = req.body;
  try {
    const [result] = await db.query('INSERT INTO students (name, age, grade) VALUES (?, ?, ?)', [name, age, grade]);
    res.status(201).json({ message: 'Student added', id: result.insertId });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: 'Database insert error', error: err });
  }
};

// Update student details
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, grade } = req.body;
  try {
    const [result] = await db.query('UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?', [name, age, grade, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student updated' });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Database update error', error: err });
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Database delete error', error: err });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
