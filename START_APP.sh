#!/bin/bash

echo "🚀 Starting RideHub Application Setup..."
echo ""

# Check Node version
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v20" ]]; then
    echo "⚠️  Warning: Node.js 20+ is recommended. Current version: $NODE_VERSION"
    echo "   You can upgrade using: nvm install 20 && nvm use 20"
    echo ""
fi

# Check if PostgreSQL is installed
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL client found"
else
    echo "❌ PostgreSQL not found. Installing..."
    echo "   Run: sudo apt update && sudo apt install postgresql postgresql-contrib"
    exit 1
fi

# Start PostgreSQL service
echo ""
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql 2>/dev/null || echo "Please start PostgreSQL manually"

# Check if database exists, create if not
echo ""
echo "Setting up database..."
sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw ridehub
if [ $? -ne 0 ]; then
    echo "Creating database 'ridehub'..."
    sudo -u postgres psql -c "CREATE DATABASE ridehub;"
else
    echo "✅ Database 'ridehub' already exists"
fi

# Navigate to project directory
cd /home/asqre/Desktop/ridehub

# Generate Prisma client
echo ""
echo "Generating Prisma client..."
npx prisma generate

# Run migrations
echo ""
echo "Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo ""
echo "Seeding database with sample data..."
npx prisma db seed

# Start the application
echo ""
echo "🎉 Starting development server..."
echo "   The app will be available at: http://localhost:3000"
echo ""
npm run dev

