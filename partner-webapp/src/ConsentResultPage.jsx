import React from 'react';

function ConsentResultPage() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');

  let statusColor = '#333';
  let bgColor = '#fff';
  if (status === 'Consent Approved') {
    statusColor = '#fff';
    bgColor = '#4caf50';
  } else if (status === 'Consent Rejected') {
    statusColor = '#fff';
    bgColor = '#f44336';
  }

  return (
    <div className="partner-container" style={{textAlign: 'center', marginTop: '4rem', background: bgColor, borderRadius: '10px', padding: '2rem'}}>
      <h1 style={{color: statusColor}}>Consent Status</h1>
      {status === 'Consent Approved' ? (
        <>
          <h2 style={{color: statusColor}}>Consent Approved</h2>
          <p style={{color: statusColor}}>Your account access has been granted. You may now continue using Celestial Finance.</p>
        </>
      ) : status === 'Consent Rejected' ? (
        <>
          <h2 style={{color: statusColor}}>Consent Rejected</h2>
          <p style={{color: statusColor}}>Your account access request was denied. Please contact support if you need assistance.</p>
        </>
      ) : (
        <>
          <h2>Unknown Status</h2>
          <p>Unable to determine consent result.</p>
        </>
      )}
    </div>
  );
}

export default ConsentResultPage;
