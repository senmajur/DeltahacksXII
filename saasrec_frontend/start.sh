#!/bin/bash
# Quick start script for SaaSRec Frontend

echo "Starting SaaSRec Frontend..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Start the dev server
echo "Starting Vite dev server on http://localhost:5173"
npm run dev


