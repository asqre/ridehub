# 🚀 RideHub Setup Guide

Complete step-by-step guide to set up RideHub on your local machine.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18.19.1 or higher installed
- [ ] PostgreSQL 12+ installed and running
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

## 🔧 Step-by-Step Setup

### Step 1: Install Node.js

If you don't have Node.js installed:

**Windows/Mac:**
- Download from [nodejs.org](https://nodejs.org/)
- Install the LTS version

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify installation:
```bash
node --version  # Should show v18+ or v20+
npm --version
```

### Step 2: Install PostgreSQL

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run the installer
- Remember the password you set for the 'postgres' user

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 3: Create Database

1. Access PostgreSQL:
```bash
# Windows
psql -U postgres

# Mac/Linux
sudo -u postgres psql
```

2. Create database:
```sql
CREATE DATABASE ridehub;
\q
```

### Step 4: Clone and Setup Project

1. Navigate to your projects folder:
```bash
cd ~/Desktop  # or wherever you want the project
```

2. Clone the repository (if not already done):
```bash
# If you have a git repo
git clone <your-repo-url>
cd ridehub

# Or if you're already in the ridehub folder
cd /home/asqre/Desktop/ridehub
```

3. Install dependencies:
```bash
npm install
```

### Step 5: Configure Environment Variables

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Edit `.env` with your favorite editor:
```bash
nano .env  # or use your preferred editor
```

3. Update these values:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ridehub?schema=public"

# NextAuth - Generate a secret key
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="PASTE_GENERATED_SECRET_HERE"

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Razorpay (Optional - for payments in demo mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```
Copy the output and paste it in `.env` as `NEXTAUTH_SECRET`

### Step 6: Setup Database Schema

1. Generate Prisma Client:
```bash
npm run prisma:generate
```

2. Run database migrations:
```bash
npm run prisma:migrate
```
When prompted, enter a name like "init" for the migration.

3. Seed the database with sample data:
```bash
npm run prisma:seed
```

This will create:
- 2 users (admin and test user)
- 6 sample vehicles (3 cars, 3 bikes)
- 2 sample coupons

### Step 7: Verify Database Setup

Open Prisma Studio to view your data:
```bash
npm run prisma:studio
```

This opens a browser window where you can see all your database tables.

### Step 8: Start Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000)

## 🎉 You're Done!

### Test Your Setup

1. **Visit the homepage:** http://localhost:3000
2. **Try logging in:**
   - Admin: `admin@ridehub.com` / `admin123`
   - User: `user@test.com` / `password123`
3. **Browse vehicles:** Click on any vehicle to see details
4. **Test booking:** Try to book a vehicle (won't charge real money)
5. **Access admin panel:** Login as admin and visit http://localhost:3000/admin

## 🔍 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
1. Ensure PostgreSQL is running:
```bash
# Windows
services.msc  # Look for PostgreSQL service

# Mac
brew services list

# Linux
sudo systemctl status postgresql
```

2. Check your DATABASE_URL in `.env`:
   - Username is usually 'postgres'
   - Port is usually 5432
   - Database name is 'ridehub'

### Issue: "Module not found"

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: Database migration fails

**Solution:**
1. Drop and recreate the database:
```sql
DROP DATABASE ridehub;
CREATE DATABASE ridehub;
```

2. Run migrations again:
```bash
npm run prisma:migrate
```

## 📚 Next Steps

1. **Customize the application:**
   - Update branding in `app/layout.tsx`
   - Modify colors in `tailwind.config.ts`
   - Add your own images

2. **Setup Google OAuth (Optional):**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth credentials
   - Add to `.env`

3. **Setup Razorpay (Optional):**
   - Sign up at [Razorpay](https://razorpay.com/)
   - Get API keys from Dashboard
   - Add to `.env`

4. **Deploy to production:**
   - See README.md for deployment instructions

## 🆘 Getting Help

If you encounter any issues:

1. Check the [README.md](./README.md) for more information
2. Review error messages carefully
3. Check the browser console (F12) for frontend errors
4. Check terminal logs for backend errors

## 📞 Support

For additional help:
- Email: info@ridehub.com
- GitHub Issues: Create an issue on the repository

---

Happy coding! 🚀

