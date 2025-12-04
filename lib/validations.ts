import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const bookingSchema = z.object({
  vehicleId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  couponCode: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
})

export const vehicleSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['CAR', 'BIKE']),
  brand: z.string().min(2, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(2000).max(new Date().getFullYear() + 1),
  pricePerDay: z.number().positive('Price must be positive'),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG']),
  transmission: z.enum(['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC']),
  seats: z.number().optional(),
  enginePower: z.string().optional(),
  mileage: z.string().optional(),
  color: z.string().optional(),
  registrationNo: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
})

export const couponSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').toUpperCase(),
  description: z.string().optional(),
  discount: z.number().positive('Discount must be positive'),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  minAmount: z.number().optional(),
  maxDiscount: z.number().optional(),
  validFrom: z.date(),
  validUntil: z.date(),
  active: z.boolean().default(true),
  usageLimit: z.number().optional(),
})

export const reviewSchema = z.object({
  vehicleId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

