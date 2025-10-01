import React, { useState, useEffect } from 'react';
import './App.css';
import QRCode from 'react-qr-code';


function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    partner: params.get('partner') || 'Unknown Partner',
    scope: params.get('scope') ? params.get('scope').split(',') : [],
    purpose: params.get('purpose') || '',
    redirectUri: params.get('redirect_uri') || '',
    customerId: params.get('customer_id') || '',
  };
}

function App() {
  const [status, setStatus] = useState('Waiting for consent...');
  const [sessionId, setSessionId] = useState('');
  const params = getQueryParams();

  useEffect(() => {
    // Create consent session only once on initial mount
    async function createSession() {
      try {
        const response = await fetch('http://localhost:3001/api/consent-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partner: params.partner,
            scope: params.scope.join(','),
            purpose: params.purpose,
            redirect_uri: params.redirectUri,
            customer_id: params.customerId,
          }),
        });
        const data = await response.json();
        setSessionId(data.session_id);
      } catch (err) {
        setStatus('Error creating session');
      }
    }
    createSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Poll backend for consent status every 3 seconds
  useEffect(() => {
    if (!sessionId) return;
    let polling = true;
    const pollStatus = async () => {
      while (polling) {
        try {
          const response = await fetch(`http://localhost:3001/api/consent-session/${sessionId}`);
          const data = await response.json();
          if (data.status && data.status !== 'Waiting for consent') {
            setStatus(data.status);
            polling = false;
            break;
          }
        } catch (err) {
          setStatus('Error fetching status');
          polling = false;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
    pollStatus();
    return () => { polling = false; };
  }, [sessionId]);

  useEffect(() => {
    if ((status === 'Consent Approved' || status === 'Consent Rejected') && params.redirectUri) {
      setTimeout(() => {
        window.location.href = `${params.redirectUri}?status=${encodeURIComponent(status)}`;
      }, 2000); // 2 seconds to show status before redirect
    }
  }, [status, params.redirectUri]);

  const qrLink = sessionId
    ? `bankapp://consent?session_id=${sessionId}&customer_id=${encodeURIComponent(params.customerId)}`
    : '';

  return (
    <div className="consent-container">
      <header className="consent-header">
        <img src="/bank-logo.png" alt="Summit Trust Bank Logo" className="bank-logo" />
        <h1>Summit Trust Bank Consent</h1>
      </header>
      <main className="consent-main">
        <h2>Partner: {params.partner}</h2>
        <p><strong>Requested Info:</strong> {params.scope.join(', ')}</p>
        <p><strong>Purpose:</strong> {params.purpose}</p>
        <div className="qr-section">
          <p>Scan this QR code with your Summit Trust Bank mobile app to continue.</p>
          <div className="qr-code">
            {qrLink ? <QRCode value={qrLink} size={180} /> : <span>Loading QR code...</span>}
          </div>
          <div className="qr-warning" style={{marginTop: '1.5rem', color: '#b71c1c', fontWeight: 'bold'}}>
            <span role="img" aria-label="warning">⚠️</span> Please do not close, refresh, or use the back button on this page until the consent process is complete.
          </div>
        </div>
        <div className="status-section">
          <p>Status: {status}</p>
        </div>
      </main>
      <footer className="consent-footer">
        <small>&copy; {new Date().getFullYear()} Summit Trust Bank</small>
      </footer>
    </div>
  );
}

export default App
