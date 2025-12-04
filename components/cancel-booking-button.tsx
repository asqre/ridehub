"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CancelBookingButtonProps {
  bookingId: string
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCancel = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to cancel booking")
      }

      setOpen(false)
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Cancel Booking
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Keep Booking
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
            {isLoading ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

