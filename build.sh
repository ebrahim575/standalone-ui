#!/bin/bash

# Error handling
set -e

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Building..."
npm run build

echo "Starting application..."
npm run start 