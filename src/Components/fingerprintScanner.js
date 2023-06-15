import React, { useState } from 'react';

const FingerprintScanner = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [output,setOutput]=useState('');
  const handleRegister = async () => {
    try {
      const publicKey = await navigator.credentials.create({
        publicKey: {
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
          },
          attestation: 'direct',
          challenge: new Uint8Array(16), // Generate a random challenge
          rp: {
            name: 'ITM',
          },
          user: {
            id: new Uint8Array(16), // Generate a random user ID
            name: 'User Name',
            displayName: 'User Display Name',
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, // ES256 algorithm
          ],
        },
      });

      console.log('Registered credentials:', publicKey);
      setOutput(publicKey);
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const handleAuthenticate = async () => {
    try {
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(16), // Generate a random challenge
          allowCredentials: [], // Retrieve allowed credentials from the server
          userVerification: 'required',
        },
      });

      console.log('Authentication assertion:', assertion);
      // Process the authentication response from the server
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div>
      {isRegistered ? (
        <button onClick={handleAuthenticate}>Authenticate with Fingerprint</button>
      ) : (
        <button onClick={handleRegister}>Register Fingerprint</button>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      {output && <p>{output}</p>}
    </div>
  );
};

export default FingerprintScanner;
