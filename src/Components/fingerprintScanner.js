import React, { useEffect, useState } from 'react';
import Fingerprint2 from 'fingerprintjs2';

const FingerprintScanner = () => {
  const [credentialId, setCredentialId] = useState('');

  useEffect(() => {
    const scanFingerprint = async () => {
      const fingerprint = await new Promise((resolve) => {
        new Fingerprint2().get((result) => {
          resolve(result);
        });
      });

      const components = fingerprint.map((component) => component.value);
      const credentialId = components.join('');
      setCredentialId(credentialId);
    };

    scanFingerprint();
  }, []);

  return (
    <div>
      <p>Place your finger on the scanner.</p>
      <p>Credential ID: {credentialId}</p>
    </div>
  );
};

export default FingerprintScanner;
