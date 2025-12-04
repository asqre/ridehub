# 🧪 Testing Guide for RideHub

This guide will help you test all the features of the RideHub application.

## 🚀 Quick Start Test

After setting up the application, follow this checklist to ensure everything works:

### ✅ Basic Functionality Tests

#### 1. Homepage (/)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Search bar is visible and functional
- [ ] Categories (Cars & Bikes) are clickable
- [ ] Featured vehicles section shows sample vehicles
- [ ] "Why Choose Us" section is visible
- [ ] Testimonials display correctly
- [ ] Footer has all links
- [ ] Navigation bar is responsive

#### 2. Authentication
- [ ] **Register New Account** (`/register`)
  - Fill form with: name, email, password
  - Click "Create Account"
  - Should redirect to dashboard after registration
  
- [ ] **Login with Test Account** (`/login`)
  - Email: `user@test.com`
  - Password: `password123`
  - Should redirect to dashboard
  
- [ ] **Login as Admin** (`/login`)
  - Email: `admin@ridehub.com`
  - Password: `admin123`
  - Should redirect to dashboard with admin access

#### 3. Vehicle Browsing (`/vehicles`)
- [ ] Vehicle listing page loads
- [ ] Filters work:
  - Category filter (CAR/BIKE)
  - Fuel type filter
  - Transmission filter
  - Price range filter
- [ ] Vehicles display with images
- [ ] Pagination works (if more than 12 vehicles)
- [ ] Clicking on a vehicle goes to detail page

#### 4. Vehicle Details (`/vehicles/[slug]`)
- [ ] Vehicle images gallery works
- [ ] Specifications display correctly
- [ ] Features list is visible
- [ ] Booking form is functional
- [ ] Reviews section shows (if any reviews exist)
- [ ] "Add Review" button visible for logged-in users

#### 5. Booking Flow
- [ ] **Create Booking:**
  - Select dates in booking form
  - Enter coupon code: `WELCOME50` or `SAVE20`
  - Click "Proceed to Payment"
  - Should redirect to booking page
  
- [ ] **Booking Page** (`/booking/[id]`)
  - Booking summary displays
  - Price calculation is correct
  - Coupon discount applied (if used)
  - Razorpay button visible

#### 6. User Dashboard (`/dashboard`)
- [ ] Statistics cards display:
  - Total Bookings
  - Upcoming Bookings
  - Completed Bookings
  - Total Spent
- [ ] Upcoming bookings list shows active bookings
- [ ] Past bookings list shows completed/cancelled bookings
- [ ] "Cancel Booking" button works for confirmed bookings

#### 7. Admin Panel (`/admin`)
**Note: Must be logged in as admin**

- [ ] Admin dashboard loads
- [ ] Statistics display:
  - Total Vehicles
  - Total Bookings
  - Total Users
  - Total Revenue
- [ ] Recent bookings list shows
- [ ] Navigation to sub-pages works:
  - Manage Vehicles
  - Manage Bookings
  - Manage Coupons
  - Messages

#### 8. Public Pages
- [ ] About Us page (`/about`)
- [ ] Contact page (`/contact`)
  - Form submission works
- [ ] FAQ page (`/faq`)
  - Accordion items expand/collapse
- [ ] Terms of Service (`/terms`)
- [ ] Privacy Policy (`/privacy`)

## 🔍 Detailed Test Scenarios

### Scenario 1: Complete User Journey

1. **Visit homepage** → Browse featured vehicles
2. **Click on a vehicle** → View details
3. **Click "Register"** → Create account
4. **Book the vehicle** → Select dates
5. **Apply coupon** → Enter "WELCOME50"
6. **Proceed to payment** → Mock payment (don't actually pay)
7. **View dashboard** → See your booking
8. **Cancel booking** → Cancel the test booking

### Scenario 2: Admin Management

1. **Login as admin** → Use admin credentials
2. **Go to Admin Panel** → `/admin`
3. **View statistics** → Check dashboard metrics
4. **Manage Vehicles** → View all vehicles
5. **Manage Bookings** → See all user bookings
6. **Manage Coupons** → View active coupons

### Scenario 3: Search and Filter

1. **Go to Vehicles** → `/vehicles`
2. **Filter by category** → Select "CAR"
3. **Filter by fuel type** → Select "PETROL"
4. **Set price range** → Min: 1000, Max: 3000
5. **Clear filters** → Click "Clear Filters"
6. **Search bikes** → Filter category to "BIKE"

### Scenario 4: Review System

1. **Login as user**
2. **Find a vehicle** → Go to vehicle details
3. **Click "Write a Review"**
4. **Rate 5 stars** → Click on stars
5. **Write comment** → Add your experience
6. **Submit review** → Should appear in reviews list

## 🐛 Common Issues and Solutions

### Issue: "Cannot connect to database"
**Fix:** Ensure PostgreSQL is running and DATABASE_URL is correct in `.env`

### Issue: "No vehicles showing"
**Fix:** Run seed script: `npm run prisma:seed`

### Issue: "Login not working"
**Fix:** 
- Check NEXTAUTH_SECRET is set in `.env`
- Clear browser cookies
- Check console for errors

### Issue: "Images not loading"
**Fix:** 
- Check if image URLs in seed data are accessible
- Try using different image URLs
- Check browser console for 404 errors

### Issue: "Payment not processing"
**Fix:**
- This is demo mode - payment won't actually charge
- RAZORPAY keys are optional
- Mock payment should still create booking

## 📊 Database Verification

Check database contents using Prisma Studio:

```bash
npm run prisma:studio
```

Verify:
- **Users table:** Should have at least 2 users (admin + test)
- **Vehicle table:** Should have 6 sample vehicles
- **Coupon table:** Should have 2 coupons
- **Booking table:** Will populate as you test bookings

## 🎯 Performance Testing

### Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance", "Accessibility", "Best Practices", "SEO"
4. Click "Generate Report"
5. **Expected Scores:**
   - Performance: 85+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 95+

### Mobile Testing

1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Test all pages for mobile responsiveness

## 📱 Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 🔐 Security Testing

Basic security checks:
- [ ] Cannot access `/admin` without admin role
- [ ] Cannot access `/dashboard` without login
- [ ] Cannot book without authentication
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)

## 📝 Test Data

### Sample Coupons
- **WELCOME50:** ₹50 off
- **SAVE20:** 20% off (max ₹500)

### Sample Users
- **Admin:** admin@ridehub.com / admin123
- **User:** user@test.com / password123

### Sample Vehicles
1. Honda City 2023 (Car) - ₹2,500/day
2. Maruti Swift Dzire (Car) - ₹2,000/day
3. Hyundai Creta (Car) - ₹3,500/day
4. Mahindra Thar (Car) - ₹4,000/day
5. Honda Activa 6G (Bike) - ₹500/day
6. Royal Enfield Classic 350 (Bike) - ₹1,200/day

## ✅ Final Checklist

Before considering the application production-ready:

- [ ] All pages load without console errors
- [ ] Authentication works (both email and OAuth if configured)
- [ ] Booking flow completes successfully
- [ ] Admin panel accessible only to admins
- [ ] Forms validate correctly
- [ ] Error messages display appropriately
- [ ] Mobile responsive on all pages
- [ ] Dark mode toggle works
- [ ] SEO meta tags present on all pages
- [ ] Database operations work correctly
- [ ] No sensitive data exposed in client
- [ ] Environment variables properly configured

## 🎉 Success Criteria

Your RideHub installation is successful if:

1. ✅ You can register and login
2. ✅ You can browse and filter vehicles
3. ✅ You can create a booking
4. ✅ You can access user dashboard
5. ✅ Admin can access admin panel
6. ✅ All public pages load correctly
7. ✅ No critical errors in console
8. ✅ Application is responsive on mobile

---

**Happy Testing! 🚗🏍️**

If you find any bugs, please report them or fix them and contribute back to the project!

