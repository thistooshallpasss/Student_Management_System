// // backend/db/db.js
// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',      // MySQL host (usually localhost)
//   user: 'root',           // MySQL username
//   password: 'Harsh123',   // MySQL password
//   database: 'Student_Management_System' // The correct database name
// }); 

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// module.exports = connection; // Export to use in other files


// backend/db/db.js
const mysql = require('mysql2');

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Harsh123',
  database: 'Student_Management_System',
  waitForConnections: true,
  connectionLimit: 10,  // Number of connections to allow
  queueLimit: 0         // No limit on query queue
});

// Wrap the pool in a promise-based interface
const promisePool = pool.promise(); // This enables async/await with MySQL queries

module.exports = promisePool; // Export the promisePool to use in other files
