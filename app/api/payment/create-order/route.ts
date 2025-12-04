import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
    const { bookingId, amount } = body

    // In demo mode, we'll create a mock order
    // In production, you would integrate with Razorpay's API
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // For actual Razorpay integration:
    // const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({
    //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    
    // const order = await razorpay.orders.create({
    //   amount: amount * 100,
    //   currency: "INR",
    //   receipt: bookingId,
    // });

    return NextResponse.json({ 
      orderId,
      amount: amount * 100,
      currency: "INR"
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

