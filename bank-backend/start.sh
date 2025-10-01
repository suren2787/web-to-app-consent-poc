#!/bin/bash
# Start the bank-backend server on port 3001
cd "$(dirname "$0")"
PORT=3001 exec node server.js
