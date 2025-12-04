import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Calendar, MapPin, CreditCard } from "lucide-react"
import { RazorpayButton } from "@/components/razorpay-button"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getBooking(id: string, userId: string) {
  const booking = await prisma.booking.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      vehicle: true,
    },
  })

  return booking
}

export default async function BookingPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const { id } = await params
  const booking = await getBooking(id, (session.user as any).id)

  if (!booking) {
    notFound()
  }

  // If already paid, redirect to dashboard
  if (booking.paymentStatus === "COMPLETED") {
    redirect("/dashboard")
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid gap-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vehicle Info */}
              <div className="flex gap-4">
                {booking.vehicle.images[0] && (
                  <div className="relative h-24 w-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={booking.vehicle.images[0]}
                      alt={booking.vehicle.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.vehicle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.vehicle.brand} • {booking.vehicle.fuelType} • {booking.vehicle.transmission}
                      </p>
                    </div>
                    <Badge>{booking.vehicle.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Rental Period</p>
                    <p className="text-muted-foreground">
                      {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                    </p>
                    <p className="text-muted-foreground">{booking.totalDays} day(s)</p>
                  </div>
                </div>

                {booking.notes && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Special Requests</p>
                      <p className="text-muted-foreground">{booking.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per day</span>
                  <span>{formatCurrency(booking.pricePerDay)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of days</span>
                  <span>{booking.totalDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(booking.totalPrice)}</span>
                </div>
                {booking.discount > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount {booking.couponCode && `(${booking.couponCode})`}</span>
                      <span>-{formatCurrency(booking.discount)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>{formatCurrency(booking.finalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Complete your payment securely using Razorpay. All major credit cards, debit cards, and UPI are accepted.
              </p>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Payment Status</p>
                <Badge variant={
                  booking.paymentStatus === "COMPLETED" ? "default" :
                  booking.paymentStatus === "FAILED" ? "destructive" :
                  "secondary"
                }>
                  {booking.paymentStatus}
                </Badge>
              </div>

              <RazorpayButton 
                bookingId={booking.id}
                amount={booking.finalPrice}
                vehicleName={booking.vehicle.name}
                userEmail={session.user.email || ""}
                userName={session.user.name || ""}
              />

              <p className="text-xs text-muted-foreground text-center">
                By proceeding, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

