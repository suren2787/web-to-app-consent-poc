import React, { useState } from 'react';
import './App.css';

// Fictional bank name for partner: "Celestial Finance"

function App() {
  const [redirecting, setRedirecting] = useState(false);

  const handleConnect = () => {
    setRedirecting(true);
    // Simulate redirect after short delay
    setTimeout(() => {
      window.location.href = 'http://localhost:5174/?partner=CelestialFinance&scope=account,transactions&purpose=OpenAPI-IADS-POC&redirect_uri=http://localhost:5173/consent-result';
    }, 2000);
  };

  return (
    <div className="partner-container">
      <header className="partner-header">
        <h1>Celestial Finance</h1>
        <p className="subtitle">Connect your account securely</p>
      </header>
      <main className="partner-main">
        <h2>Get Consent to Access Your Summit Trust Bank Account</h2>
        <p>
          To provide you with enhanced financial services, Celestial Finance needs your consent to access your account information from Summit Trust Bank.
        </p>
        <ul>
          <li>Account balance and transaction history</li>
          <li>Personal details for verification</li>
        </ul>
        <p className="disclaimer">
          You will be redirected to Summit Trust Bank to review and approve this request. Your data will be handled securely and you can revoke access at any time.
        </p>
        <button className="connect-btn" onClick={handleConnect} disabled={redirecting}>
          {redirecting ? 'Redirecting...' : 'Connect to Summit Trust Bank'}
        </button>
      </main>
      <footer className="partner-footer">
        <small>&copy; {new Date().getFullYear()} Celestial Finance</small>
      </footer>
    </div>
  );
}

export default App
