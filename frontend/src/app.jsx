// /frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentTable from './components/StudentTable'; // Import your table component

const App = () => {
  const [students, setStudents] = useState([]); // State to store student data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State for any potential errors

  // Fetch students data from the backend API
  useEffect(() => {
    axios.get('http://localhost:5001/api/students') // Replace with your backend URL
      .then(response => {
        setStudents(response.data); // Store the student data in state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        setError('Failed to fetch students'); // Handle any error during the fetch
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Student Management System</h1>
      
      {/* Pass student data to StudentTable component */}
      <StudentTable students={students} />
    </div>
  );
};

export default App;
