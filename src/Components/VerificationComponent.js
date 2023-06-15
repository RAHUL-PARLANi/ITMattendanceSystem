import React, { useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const VerificationComponent = ({ enrolledStudents }) => {
  const [verificationResult, setVerificationResult] = useState('');

  const verifyStudent = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const capturedFingerprintData = result.visitorId; // Retrieve the fingerprint data provided by FingerprintJS

    const matchedStudent = enrolledStudents.find(
      (student) => student.fingerprintData === capturedFingerprintData
    );

    if (matchedStudent) {
      setVerificationResult(`Student ${matchedStudent.studentId} verified successfully!`);
    } else {
      setVerificationResult('Student verification failed!');
    }
  };

  return (
    <div>
      <h2>Verification</h2>
      <button onClick={verifyStudent}>Verify Student</button>
      <p>{verificationResult}</p>
    </div>
  );
};

export default VerificationComponent;
