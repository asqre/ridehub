#!/bin/bash

echo "🔄 Restarting RideHub..."

# Kill any running Next.js processes
pkill -f "next dev" 2>/dev/null

# Wait a moment
sleep 2

cd /home/asqre/Desktop/ridehub

# Check Node version
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

# Ensure Node 20 is active (if nvm is available)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
    nvm use 20 2>/dev/null || echo "Using current Node version"
fi

echo ""
echo "🚀 Starting server..."
echo "Open: http://localhost:3000"
echo ""

# Start the dev server
npm run dev

