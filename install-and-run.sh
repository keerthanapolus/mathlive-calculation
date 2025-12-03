#!/bin/bash

echo "Installing React Flow Examples..."
echo

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error installing dependencies. Please check your Node.js installation."
    exit 1
fi

echo
echo "Starting development server..."
echo "Open your browser to http://localhost:5173"
echo

npm run dev
