import React, { useState } from 'react';
import EmailVerificationForm from './components/EmailVerificationForm';
import './style.css';
import ProtectedForm from './components/ProtectedForm';
const App = () => {
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const handleEmailVerified = (email) => {
    setVerifiedEmail(email);
  };

  const handleRestart = () => {
    setVerifiedEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center">
      {!verifiedEmail ? (
        <EmailVerificationForm onEmailVerified={handleEmailVerified} />
      ) : (
        <ProtectedForm email={verifiedEmail} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;

