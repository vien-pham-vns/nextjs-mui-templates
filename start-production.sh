#!/bin/bash

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Copy static files to standalone directory
echo "Copying static files..."
cp -r .next/static .next/standalone/.next/

# Copy public directory if it exists
if [ -d "public" ]; then
    echo "Copying public directory..."
    cp -r public .next/standalone/
fi

# Start the standalone server
echo "Starting production server..."
cd .next/standalone && node server.js