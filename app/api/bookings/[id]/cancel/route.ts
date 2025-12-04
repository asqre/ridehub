import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        userId: (session.user as any).id,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    if (booking.bookingStatus === "CANCELLED") {
      return NextResponse.json(
        { error: "Booking already cancelled" },
        { status: 400 }
      )
    }

    if (booking.bookingStatus === "COMPLETED") {
      return NextResponse.json(
        { error: "Cannot cancel completed booking" },
        { status: 400 }
      )
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        bookingStatus: "CANCELLED",
      },
    })

    return NextResponse.json({ booking: updatedBooking })
  } catch (error) {
    console.error("Cancel booking error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

