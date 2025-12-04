import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"

export const metadata = {
  title: "Manage Bookings - Admin",
}

async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true }
      },
      vehicle: {
        select: { name: true, brand: true }
      }
    }
  })
}

function getStatusVariant(status: string) {
  switch (status) {
    case "CONFIRMED":
    case "COMPLETED":
      return "default"
    case "CANCELLED":
      return "destructive"
    default:
      return "secondary"
  }
}

export default async function AdminBookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  const bookings = await getBookings()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
        <p className="text-muted-foreground">View and manage all bookings</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vehicle</p>
                  <p className="font-medium">{booking.vehicle.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.vehicle.brand}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer</p>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{formatDate(booking.startDate)}</p>
                  <p className="text-sm text-muted-foreground">to {formatDate(booking.endDate)}</p>
                  <p className="text-sm">{booking.totalDays} day(s)</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="font-bold text-lg">{formatCurrency(booking.finalPrice)}</p>
                  <div className="flex flex-col gap-1 mt-2">
                    <Badge variant={getStatusVariant(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </Badge>
                    <Badge variant={booking.paymentStatus === "COMPLETED" ? "default" : "secondary"}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No bookings yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

