import React from 'react';
import EnrollmentComponent from './Components/enrolmentcomponent';
import VerificationComponent from './Components/VerificationComponent';

const App = () => {
  const enrolledStudents = [];

  return (
    <div>
      <h1>Biometric Student Management</h1>
      <EnrollmentComponent />
      <VerificationComponent enrolledStudents={enrolledStudents} />
    </div>
  );
};

export default App;
