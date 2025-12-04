import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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
    const { vehicleId, rating, comment } = body

    if (!vehicleId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    // Check if user has already reviewed this vehicle
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: (session.user as any).id,
        vehicleId
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this vehicle" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        userId: (session.user as any).id,
        vehicleId,
        rating,
        comment: comment || null,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error("Review error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

