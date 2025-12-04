# 🚗 RideHub - Car & Bike Rental Platform

A full-stack, production-grade car and bike rental web application built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

![RideHub](https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop)

## ✨ Features

### 🌐 Public Features
- **Modern Homepage** with hero section, search functionality, and featured vehicles
- **Vehicle Listings** with advanced filters (category, brand, price, fuel type, transmission)
- **Detailed Vehicle Pages** with image galleries, specifications, and reviews
- **Booking System** with date selection and coupon support
- **User Reviews & Ratings**
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, Open Graph, sitemap, robots.txt
- **About, Contact, FAQ, Terms & Privacy pages**

### 🔐 Authentication
- Email & Password authentication
- Google OAuth integration
- JWT-based sessions
- Protected routes

### 👤 User Dashboard
- View all bookings (upcoming & past)
- Booking statistics
- Cancel bookings
- Profile management
- Booking status tracking

### 💳 Payment Integration
- Razorpay payment gateway (demo mode)
- Secure payment processing
- Payment verification
- Booking confirmation emails

### 🛠️ Admin Panel
- Dashboard with analytics
- Vehicle management (CRUD)
- Booking management
- Coupon management
- Contact message management
- Real-time statistics

### 🎨 UI/UX
- Clean, modern design with Tailwind CSS
- ShadCN UI components
- Smooth animations
- Dark mode support
- Loading states and error handling

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, ShadCN UI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Razorpay
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 📋 Prerequisites

- Node.js 18+ (recommended: 20+)
- PostgreSQL database
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ridehub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ridehub?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Razorpay (optional for demo)
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
```

4. **Generate NextAuth secret**
```bash
openssl rand -base64 32
```

5. **Set up the database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
```

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

### Local PostgreSQL

1. Install PostgreSQL
2. Create a database:
```sql
CREATE DATABASE ridehub;
```

3. Update `DATABASE_URL` in `.env`

### Using Docker

```bash
docker run --name ridehub-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=ridehub \
  -p 5432:5432 \
  -d postgres:15
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database with sample data
```

## 👥 Default Users

After running the seed script:

**Admin User:**
- Email: `admin@ridehub.com`
- Password: `admin123`

**Test User:**
- Email: `user@test.com`
- Password: `password123`

## 🔑 API Routes

### Public Routes
- `POST /api/auth/register` - User registration
- `POST /api/contact` - Contact form submission
- `GET /api/vehicles` - List vehicles
- `POST /api/reviews` - Create review (authenticated)

### Protected Routes (User)
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `POST /api/bookings/[id]/cancel` - Cancel booking
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

### Admin Routes
- Access via `/admin` route (requires ADMIN role)

## 🎨 Project Structure

```
ridehub/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── booking/           # Booking pages
│   ├── dashboard/         # User dashboard
│   ├── vehicles/          # Vehicle pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Helper functions
│   ├── validations.ts    # Zod schemas
│   └── schema-org.ts     # SEO schemas
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── public/               # Static files
└── types/                # TypeScript types
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key | No |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | No |

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## 🎯 Features Roadmap

- [ ] Email notifications (booking confirmations)
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Live chat support
- [ ] Vehicle comparison tool
- [ ] Loyalty program

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support, please contact:
- Email: info@ridehub.com
- Website: https://ridehub.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [ShadCN UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)

---

Made with ❤️ by RideHub Team
