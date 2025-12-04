import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { calculateDays } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { vehicleId, startDate, endDate, couponCode, notes } = body

    // Validate dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (end <= start) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      )
    }

    // Check vehicle availability
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle || !vehicle.available) {
      return NextResponse.json(
        { error: "Vehicle not available" },
        { status: 400 }
      )
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId,
        bookingStatus: { in: ["PENDING", "CONFIRMED", "ONGOING"] },
        OR: [
          {
            AND: [
              { startDate: { lte: start } },
              { endDate: { gte: start } }
            ]
          },
          {
            AND: [
              { startDate: { lte: end } },
              { endDate: { gte: end } }
            ]
          },
          {
            AND: [
              { startDate: { gte: start } },
              { endDate: { lte: end } }
            ]
          }
        ]
      }
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Vehicle is already booked for these dates" },
        { status: 400 }
      )
    }

    // Calculate pricing
    const totalDays = calculateDays(start, end)
    const pricePerDay = vehicle.pricePerDay
    const totalPrice = totalDays * pricePerDay
    let discount = 0
    let finalPrice = totalPrice

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      })

      if (coupon && coupon.active) {
        const now = new Date()
        if (now >= coupon.validFrom && now <= coupon.validUntil) {
          if (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit) {
            if (coupon.discountType === "PERCENTAGE") {
              discount = (totalPrice * coupon.discount) / 100
              if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount)
              }
            } else {
              discount = coupon.discount
            }
            finalPrice = totalPrice - discount

            // Update coupon usage
            await prisma.coupon.update({
              where: { id: coupon.id },
              data: { usedCount: { increment: 1 } }
            })
          }
        }
      }
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: (session.user as any).id,
        vehicleId,
        startDate: start,
        endDate: end,
        totalDays,
        pricePerDay,
        totalPrice,
        couponCode: couponCode?.toUpperCase() || null,
        discount,
        finalPrice,
        notes,
      },
      include: {
        vehicle: true
      }
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: (session.user as any).id
      },
      include: {
        vehicle: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Fetch bookings error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

