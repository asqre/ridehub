#!/bin/bash

# Fix .env file with correct database credentials
cd /home/asqre/Desktop/ridehub

cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ridehub?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production-use-openssl-rand-base64-32"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# UploadThing (optional)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Razorpay (optional - demo mode works without keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# Email (optional)
RESEND_API_KEY=""
EMAIL_FROM="noreply@ridehub.com"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF

echo "✅ .env file has been updated with correct credentials!"

