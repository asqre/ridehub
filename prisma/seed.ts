import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ridehub.com' },
    update: {},
    create: {
      email: 'admin@ridehub.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log({ admin })

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Test User',
      password: await bcrypt.hash('password123', 12),
      role: 'USER',
    },
  })

  console.log({ testUser })

  // Create vehicles
  const vehicles = [
    {
      name: 'Honda City 2023',
      slug: 'honda-city-2023',
      description: 'Experience luxury and comfort with the Honda City 2023. Perfect for city rides and long journeys with premium interiors and advanced safety features.',
      category: 'CAR' as const,
      brand: 'Honda',
      model: 'City',
      year: 2023,
      pricePerDay: 2500,
      images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800'],
      fuelType: 'PETROL' as const,
      transmission: 'AUTOMATIC' as const,
      seats: 5,
      enginePower: '1.5L i-VTEC',
      mileage: '17.8 km/l',
      color: 'White',
      available: true,
      featured: true,
    },
    {
      name: 'Maruti Swift Dzire',
      slug: 'maruti-swift-dzire',
      description: 'Fuel-efficient and reliable sedan perfect for daily commutes and family trips. Spacious interiors with modern amenities.',
      category: 'CAR' as const,
      brand: 'Maruti',
      model: 'Swift Dzire',
      year: 2023,
      pricePerDay: 2000,
      images: ['https://images.unsplash.com/photo-1583267746897-c94138eb2b2e?w=800'],
      fuelType: 'PETROL' as const,
      transmission: 'MANUAL' as const,
      seats: 5,
      enginePower: '1.2L K12N',
      mileage: '22 km/l',
      color: 'Silver',
      available: true,
      featured: true,
    },
    {
      name: 'Hyundai Creta',
      slug: 'hyundai-creta',
      description: 'Stylish SUV with powerful performance and premium features. Perfect for family adventures and road trips.',
      category: 'CAR' as const,
      brand: 'Hyundai',
      model: 'Creta',
      year: 2023,
      pricePerDay: 3500,
      images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'],
      fuelType: 'DIESEL' as const,
      transmission: 'AUTOMATIC' as const,
      seats: 5,
      enginePower: '1.5L CRDi',
      mileage: '18 km/l',
      color: 'Black',
      available: true,
      featured: true,
    },
    {
      name: 'Mahindra Thar',
      slug: 'mahindra-thar',
      description: 'The ultimate off-road adventure vehicle. Powerful, rugged, and built for extreme terrains.',
      category: 'CAR' as const,
      brand: 'Mahindra',
      model: 'Thar',
      year: 2023,
      pricePerDay: 4000,
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'],
      fuelType: 'DIESEL' as const,
      transmission: 'MANUAL' as const,
      seats: 4,
      enginePower: '2.2L mHawk',
      mileage: '15 km/l',
      color: 'Red',
      available: true,
      featured: true,
    },
    {
      name: 'Honda Activa 6G',
      slug: 'honda-activa-6g',
      description: 'India\'s most trusted scooter. Reliable, fuel-efficient, and perfect for daily commutes.',
      category: 'BIKE' as const,
      brand: 'Honda',
      model: 'Activa 6G',
      year: 2023,
      pricePerDay: 500,
      images: ['https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'],
      fuelType: 'PETROL' as const,
      transmission: 'AUTOMATIC' as const,
      seats: 2,
      enginePower: '110cc',
      mileage: '50 km/l',
      color: 'Grey',
      available: true,
      featured: true,
    },
    {
      name: 'Royal Enfield Classic 350',
      slug: 'royal-enfield-classic-350',
      description: 'Iconic cruiser motorcycle with timeless design. Perfect for long rides and weekend getaways.',
      category: 'BIKE' as const,
      brand: 'Royal Enfield',
      model: 'Classic 350',
      year: 2023,
      pricePerDay: 1200,
      images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'],
      fuelType: 'PETROL' as const,
      transmission: 'MANUAL' as const,
      seats: 2,
      enginePower: '349cc',
      mileage: '35 km/l',
      color: 'Black',
      available: true,
      featured: true,
    },
  ]

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: {},
      create: vehicle,
    })
  }

  console.log('Vehicles created')

  // Create coupons
  const coupons = [
    {
      code: 'WELCOME50',
      description: 'Welcome discount for new users',
      discount: 50,
      discountType: 'FIXED' as const,
      validFrom: new Date(),
      validUntil: new Date('2025-12-31'),
      active: true,
      usageLimit: 100,
    },
    {
      code: 'SAVE20',
      description: '20% off on all bookings',
      discount: 20,
      discountType: 'PERCENTAGE' as const,
      maxDiscount: 500,
      validFrom: new Date(),
      validUntil: new Date('2025-12-31'),
      active: true,
    },
  ]

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    })
  }

  console.log('Coupons created')
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

