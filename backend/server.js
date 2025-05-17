// backend/server.js
const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes.js');


// Middleware
app.use(express.json()); // Allows parsing of JSON bodies
app.use(cors()); // Allows requests from different origins (useful for development with React)

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Student Management API!');
});

// Use student routes
app.use('/api', studentRoutes);

// Start the server
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
