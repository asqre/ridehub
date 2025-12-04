#!/bin/bash

echo "🚀 RideHub - Complete Setup and Run"
echo "===================================="
echo ""

cd /home/asqre/Desktop/ridehub

# Step 1: Set PostgreSQL password
echo "Step 1: Setting up PostgreSQL..."
echo "Please run this command in your terminal:"
echo ""
echo "  sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'password';\""
echo ""
read -p "Press Enter after you've run the command above..."

# Step 2: Fix .env file (already done, but let's make sure)
echo ""
echo "Step 2: Updating .env file..."
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:password@localhost:5432/ridehub?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
RESEND_API_KEY=""
EMAIL_FROM="noreply@ridehub.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
echo "✅ .env updated"

# Step 3: Generate Prisma Client
echo ""
echo "Step 3: Generating Prisma Client..."
npx prisma generate

# Step 4: Run migrations
echo ""
echo "Step 4: Running database migrations..."
npx prisma migrate dev --name init

# Step 5: Seed database
echo ""
echo "Step 5: Seeding database..."
npx tsx prisma/seed.ts || echo "⚠️  Seeding failed, but you can continue. You can add data manually."

# Step 6: Start the application
echo ""
echo "========================================="
echo "🎉 Setup complete! Starting the server..."
echo "========================================="
echo ""
echo "The application will be available at:"
echo "  👉 http://localhost:3000"
echo ""
echo "Login credentials:"
echo "  Admin: admin@ridehub.com / admin123"
echo "  User:  user@test.com / password123"
echo ""

npm run dev

