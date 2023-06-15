import React from 'react';

const FingerprintAuth = () => {
  const handleFingerprintAuth = async () => {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          timeout: 5000,
        },
      });

      // Fingerprint authentication succeeded
      // Process the credential or trigger further actions

      // Example: Trigger a login function
      loginWithFingerprint(credential);
    } catch (error) {
      // Fingerprint authentication failed
      // Handle the error or show a message to the user
    }
  };

  const loginWithFingerprint = (credential) => {
    // Send the credential to the server for verification
    // Perform any necessary authentication logic
    console.log(credential)
  };

  return (
    <button onClick={handleFingerprintAuth}>
      Authenticate with Fingerprint
    </button>
  );
};

export default FingerprintAuth;
