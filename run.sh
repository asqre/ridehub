#!/bin/bash

echo "🚀 Starting RideHub..."

cd /home/asqre/Desktop/ridehub

# Check if nvm is available and use Node 20
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
    nvm use 20 2>/dev/null || nvm use default
fi

# Display Node version
NODE_VERSION=$(node --version)
echo "Using Node.js: $NODE_VERSION"

# Start the application
echo ""
echo "Starting development server..."
echo "Once started, open: http://localhost:3000"
echo ""
echo "Login credentials:"
echo "  Admin: admin@ridehub.com / admin123"
echo "  User:  user@test.com / password123"
echo ""

npm run dev

