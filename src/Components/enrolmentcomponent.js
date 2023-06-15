import React, { useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const EnrollmentComponent = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const enrollStudent = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const enrolledStudent = {
      studentId: 'sd',
      fingerprintData: result.visitorId, // Store the fingerprint data provided by FingerprintJS
    };

    setEnrolledStudents([...enrolledStudents, enrolledStudent]);
  };

  return (
    <div>
      <h2>Enrollment</h2>
      <button onClick={enrollStudent}>Enroll Student</button>
      <ul>
        {enrolledStudents.map((student) => (
          <li key={student.studentId}>{student.studentId}</li>
        ))}
      </ul>
    </div>
  );
};

export default EnrollmentComponent;
