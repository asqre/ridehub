"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Script from "next/script"

interface RazorpayButtonProps {
  bookingId: string
  amount: number
  vehicleName: string
  userEmail: string
  userName: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayButton({ 
  bookingId, 
  amount, 
  vehicleName,
  userEmail,
  userName
}: RazorpayButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Create order on backend
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          amount,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "RideHub",
        description: `Booking for ${vehicleName}`,
        order_id: orderData.orderId,
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#000000",
        },
        handler: async function (response: any) {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          })

          if (verifyResponse.ok) {
            router.push("/dashboard?payment=success")
            router.refresh()
          } else {
            setError("Payment verification failed")
          }
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false)
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      setError(error.message || "Failed to process payment")
      setIsLoading(false)
    }
  }

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button 
        onClick={handlePayment}
        disabled={isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? "Processing..." : `Pay ${(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}`}
      </Button>
    </>
  )
}

