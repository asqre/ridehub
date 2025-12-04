import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Car, Clock, CreditCard } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CancelBookingButton } from "@/components/cancel-booking-button"

export const metadata = {
  title: "Dashboard",
  description: "Manage your bookings and profile",
}

async function getUserBookings(userId: string) {
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      vehicle: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return bookings
}

function getBookingStatusVariant(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "default"
    case "ONGOING":
      return "default"
    case "COMPLETED":
      return "secondary"
    case "CANCELLED":
      return "destructive"
    default:
      return "secondary"
  }
}

function getPaymentStatusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default"
    case "PENDING":
      return "secondary"
    case "FAILED":
      return "destructive"
    default:
      return "secondary"
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const bookings = await getUserBookings((session.user as any).id)
  const upcomingBookings = bookings.filter(b => 
    b.bookingStatus === "CONFIRMED" || b.bookingStatus === "PENDING"
  )
  const pastBookings = bookings.filter(b =>
    b.bookingStatus === "COMPLETED" || b.bookingStatus === "CANCELLED"
  )

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name}!</h1>
        <p className="text-muted-foreground">Manage your bookings and profile</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.bookingStatus === "COMPLETED").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                bookings
                  .filter(b => b.paymentStatus === "COMPLETED")
                  .reduce((sum, b) => sum + b.finalPrice, 0)
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
        {upcomingBookings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No upcoming bookings</p>
              <Button asChild>
                <Link href="/vehicles">Browse Vehicles</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {booking.vehicle.images[0] && (
                      <div className="relative h-32 w-full md:w-48 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={booking.vehicle.images[0]}
                          alt={booking.vehicle.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.vehicle.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.vehicle.brand} • {booking.vehicle.category}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant={getBookingStatusVariant(booking.bookingStatus)}>
                            {booking.bookingStatus}
                          </Badge>
                          <Badge variant={getPaymentStatusVariant(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pickup:</span>{" "}
                          <span className="font-medium">{formatDate(booking.startDate)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Return:</span>{" "}
                          <span className="font-medium">{formatDate(booking.endDate)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>{" "}
                          <span className="font-medium">{booking.totalDays} day(s)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>{" "}
                          <span className="font-medium">{formatCurrency(booking.finalPrice)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.paymentStatus === "PENDING" && (
                          <Button size="sm" asChild>
                            <Link href={`/booking/${booking.id}`}>Complete Payment</Link>
                          </Button>
                        )}
                        {booking.bookingStatus === "CONFIRMED" && (
                          <CancelBookingButton bookingId={booking.id} />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {booking.vehicle.images[0] && (
                      <div className="relative h-32 w-full md:w-48 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={booking.vehicle.images[0]}
                          alt={booking.vehicle.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.vehicle.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.vehicle.brand} • {booking.vehicle.category}
                          </p>
                        </div>
                        <Badge variant={getBookingStatusVariant(booking.bookingStatus)}>
                          {booking.bookingStatus}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pickup:</span>{" "}
                          <span className="font-medium">{formatDate(booking.startDate)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Return:</span>{" "}
                          <span className="font-medium">{formatDate(booking.endDate)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Paid:</span>{" "}
                          <span className="font-medium">{formatCurrency(booking.finalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

