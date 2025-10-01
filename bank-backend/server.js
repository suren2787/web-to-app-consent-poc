// Simple Express backend for consent session management
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for sessions
const sessions = {};

// Debug: List all sessions
app.get('/api/consent-session', (req, res) => {
  res.json(sessions);
});

// Create consent session
app.post('/api/consent-session', (req, res) => {
  const { partner, scope, purpose, redirect_uri, customer_id } = req.body;
  const session_id = uuidv4();
  sessions[session_id] = {
    partner,
    scope,
    purpose,
    redirect_uri,
    customer_id,
    status: 'Waiting for consent',
  };

  // Simulate consent status update at random interval (30-60s)
  const updateDelay = Math.floor(Math.random() * 30) + 30; // 30-60 seconds
  setTimeout(() => {
    // Randomly approve or reject
    const approved = Math.random() > 0.2; // 80% approve, 20% reject
    sessions[session_id].status = approved ? 'Consent Approved' : 'Consent Rejected';
  }, updateDelay * 1000);

  res.json({ session_id, customer_id });
});

// Get consent session status
app.get('/api/consent-session/:session_id', (req, res) => {
  const session = sessions[req.params.session_id];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({ status: session.status, ...session });
});

// Update consent status (approve/reject)
app.post('/api/consent-session/:session_id/status', (req, res) => {
  const session = sessions[req.params.session_id];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  const { status } = req.body;
  if (!['Consent Approved', 'Consent Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  session.status = status;
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Consent backend running on port ${PORT}`);
});
