// // frontend/src/components/StudentTable.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentTable = () => {
//   const [students, setStudents] = useState([]);

//   // Fetch students from the backend API
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/students')
//       .then(response => setStudents(response.data))
//       .catch(error => console.log('Error fetching students:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Student List</h2>
//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Course</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.id}>
//               <td>{student.name}</td>
//               <td>{student.email}</td>
//               <td>{student.course}</td>
//               <td>
//                 <button onClick={() => alert(`Edit student ${student.id}`)}>Edit</button>
//                 <button onClick={() => alert(`Delete student ${student.id}`)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentTable;

import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Course</th>
            <th className="px-4 py-2">Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.course}</td>
                <td className="px-4 py-2">{new Date(student.enrollment_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
