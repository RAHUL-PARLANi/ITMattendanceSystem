import React, { useState } from 'react';

const FingerprintScanner = () => {
  const [authenticationStatus, setAuthenticationStatus] = useState('');

  const handleFingerprintAuthentication = async () => {
    try {
      const credential = await navigator.credentials.create({
        publicKey: {
          // Configuration options for fingerprint authentication
          mediation: 'silent',
          // Other options for credential creation
        },
      });

      // Perform server-side validation with the credential
      console.log(credential)
      setAuthenticationStatus('Success');
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      setAuthenticationStatus('Failure');
    }
  };

  return (
    <div>
      <button onClick={handleFingerprintAuthentication}>Authenticate with Fingerprint</button>
      {authenticationStatus && <p>{`Authentication Status: ${authenticationStatus}`}</p>}
    </div>
  );
};

export default FingerprintScanner;
