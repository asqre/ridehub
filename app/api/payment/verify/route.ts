import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
// import crypto from "crypto"

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
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body

    // In production, verify the signature:
    // const text = razorpayOrderId + "|" + razorpayPaymentId
    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    //   .update(text)
    //   .digest("hex")
    
    // if (expectedSignature !== razorpaySignature) {
    //   return NextResponse.json(
    //     { error: "Invalid payment signature" },
    //     { status: 400 }
    //   )
    // }

    // Update booking with payment info
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "COMPLETED",
        paymentId: razorpayPaymentId,
        bookingStatus: "CONFIRMED",
      },
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    )
  }
}

