# ⚡ RideHub - Quick Start Guide

Get your RideHub application running in 5 minutes!

## 🎯 Prerequisites
- Node.js 18+ installed
- PostgreSQL running
- Terminal/Command prompt

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies
```bash
cd /home/asqre/Desktop/ridehub
npm install
```

### 2. Setup Database
```bash
# Create database in PostgreSQL
psql -U postgres -c "CREATE DATABASE ridehub;"

# Or if using sudo
sudo -u postgres psql -c "CREATE DATABASE ridehub;"
```

### 3. Configure Environment
```bash
# Generate a secret key
openssl rand -base64 32

# Create .env file (if not exists)
cat > .env << 'EOL'
DATABASE_URL="postgresql://postgres:password@localhost:5432/ridehub?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="PASTE_YOUR_GENERATED_SECRET_HERE"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOL
```

Replace `PASTE_YOUR_GENERATED_SECRET_HERE` with the output from the openssl command.

### 4. Setup Database Schema & Seed Data
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

## 🎉 You're Ready!

Open http://localhost:3000 in your browser.

## 🔑 Test Accounts

**Admin Login:**
- Email: `admin@ridehub.com`
- Password: `admin123`

**User Login:**
- Email: `user@test.com`
- Password: `password123`

## 🧪 Quick Test

1. Visit homepage → http://localhost:3000
2. Click "Login" → Use test credentials
3. Browse vehicles → http://localhost:3000/vehicles
4. Click any vehicle → See details
5. Try booking → Select dates and proceed
6. View dashboard → http://localhost:3000/dashboard
7. Access admin → http://localhost:3000/admin (use admin account)

## 📚 Sample Data Included

After seeding:
- ✅ 6 Sample Vehicles (3 cars, 3 bikes)
- ✅ 2 Test Users (admin + user)
- ✅ 2 Active Coupons

### Try These Coupons:
- `WELCOME50` - Get ₹50 off
- `SAVE20` - Get 20% off (max ₹500)

## 🐛 Troubleshooting

**Database Connection Error?**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Or restart it
sudo systemctl restart postgresql
```

**Port 3000 in use?**
```bash
# Use a different port
PORT=3001 npm run dev
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Next Steps

- Read [README.md](./README.md) for full documentation
- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- Read [TESTING.md](./TESTING.md) for testing guide

## 🎨 Customize Your App

1. **Change Branding:**
   - Edit `app/layout.tsx` for site title
   - Update `components/navbar.tsx` for logo

2. **Modify Theme:**
   - Edit `app/globals.css` for colors
   - Update `tailwind.config.ts` for theme

3. **Add Your Vehicles:**
   - Login as admin
   - Go to `/admin/vehicles`
   - Add your own vehicles

## 🚀 Production Deployment

Ready to deploy? See [README.md](./README.md) deployment section.

## 💡 Tips

- Use Prisma Studio to view database: `npm run prisma:studio`
- Check logs in terminal if something fails
- Use browser DevTools (F12) to debug frontend
- Admin panel is at `/admin` (requires admin role)

## 🆘 Need Help?

- Check console logs for errors
- Review error messages carefully
- Refer to detailed guides in the repo
- Create an issue on GitHub

---

**Built with ❤️ using Next.js 14, TypeScript, Prisma, and Tailwind CSS**

Happy coding! 🚗🏍️

