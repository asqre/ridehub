# Database Setup Instructions

Your PostgreSQL needs to be configured. Follow these steps:

## Option 1: Quick Setup (Recommended for Development)

Run these commands in your terminal:

```bash
# 1. Set up PostgreSQL user and database
sudo -u postgres psql << 'EOF'
CREATE USER asqre WITH PASSWORD 'asqre123';
ALTER USER asqre CREATEDB;
CREATE DATABASE ridehub OWNER asqre;
GRANT ALL PRIVILEGES ON DATABASE ridehub TO asqre;
\q
EOF

# 2. Update your .env file
cat > /home/asqre/Desktop/ridehub/.env << 'EOL'
DATABASE_URL="postgresql://asqre:asqre123@localhost:5432/ridehub?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="yGR2IiJLaAaA7MfQ00GrKboGSnJ11Hsaj0Cj/hDxPcU="
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
EOL

# 3. Generate Prisma Client
cd /home/asqre/Desktop/ridehub
npx prisma generate

# 4. Run migrations
npx prisma migrate deploy

# 5. Seed the database
npx prisma db seed

# 6. Start the app
npm run dev
```

## Option 2: Using Existing PostgreSQL Password

If you already have PostgreSQL set up with a password:

1. Find your PostgreSQL password (you set this when installing PostgreSQL)
2. Update the .env file:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ridehub?schema=public"
   ```
3. Create the database:
   ```bash
   sudo -u postgres createdb ridehub
   ```
4. Then run:
   ```bash
   cd /home/asqre/Desktop/ridehub
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   npm run dev
   ```

## Troubleshooting

### If you get "peer authentication failed":
Edit PostgreSQL config:
```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```
Change this line:
```
local   all             postgres                                peer
```
To:
```
local   all             postgres                                md5
```
Then restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

### If PostgreSQL is not running:
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Check PostgreSQL status:
```bash
sudo systemctl status postgresql
```

## After Database Setup

Once the database is configured, your app should work. You can test with:
```bash
cd /home/asqre/Desktop/ridehub
npm run dev
```

Then visit: http://localhost:3000

Test accounts:
- Admin: admin@ridehub.com / admin123
- User: user@test.com / password123

