"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { calculateDays, formatCurrency } from "@/lib/utils"
import { Vehicle } from "@prisma/client"
import { Calendar } from "lucide-react"

interface BookingFormProps {
  vehicle: Vehicle
}

export function BookingForm({ vehicle }: BookingFormProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const days = startDate && endDate ? calculateDays(new Date(startDate), new Date(endDate)) : 0
  const totalPrice = days * vehicle.pricePerDay

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/vehicles/${vehicle.slug}`)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          couponCode: couponCode || undefined,
          notes: notes || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking")
      }

      // Redirect to payment page
      router.push(`/booking/${data.booking.id}`)
    } catch (error: any) {
      setError(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="startDate">Pickup Date</Label>
        <Input
          id="startDate"
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">Return Date</Label>
        <Input
          id="endDate"
          type="date"
          min={startDate || today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
        <Input
          id="couponCode"
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special requirements..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {days > 0 && (
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Duration</span>
            <span>{days} day{days > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price per day</span>
            <span>{formatCurrency(vehicle.pricePerDay)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isLoading || !startDate || !endDate}
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>

      {status === "unauthenticated" && (
        <p className="text-xs text-center text-muted-foreground">
          You&apos;ll be redirected to login before booking
        </p>
      )}
    </form>
  )
}

