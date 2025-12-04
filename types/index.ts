import { User, Vehicle, Booking, Review, Coupon } from '@prisma/client'

export type { User, Vehicle, Booking, Review, Coupon }

export interface VehicleWithReviews extends Vehicle {
  reviews: Review[]
  _count?: {
    reviews: number
  }
}

export interface BookingWithDetails extends Booking {
  vehicle: Vehicle
  user: User
}

export interface ReviewWithUser extends Review {
  user: User
}

export interface SearchParams {
  category?: 'CAR' | 'BIKE'
  brand?: string
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  transmission?: string
  seats?: number
  page?: number
}

