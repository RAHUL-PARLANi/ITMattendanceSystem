import React, { useState } from 'react';
import { create } from '@github/webauthn-json';

const FingerprintAuthenticator = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEnroll = async () => {
    try {
      const authenticator = create();
      const credential = await authenticator.register();
      // Send the credential to the server for storage
      alert(credential);
      setIsEnrolled(true);
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  const handleAuthenticate = async () => {
    try {
      const authenticator = create();
      const assertion = await authenticator.authenticate();
      // Send the assertion to the server for verification
      console.log(assertion);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div>
      {!isEnrolled && (
        <button onClick={handleEnroll}>Enroll fingerprint</button>
      )}
      {isEnrolled && !isAuthenticated && (
        <button onClick={handleAuthenticate}>Authenticate fingerprint</button>
      )}
      {isAuthenticated && <p>User authenticated!</p>}
    </div>
  );
};

export default FingerprintAuthenticator
