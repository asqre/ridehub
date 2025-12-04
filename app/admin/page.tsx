import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing RideHub",
}

async function getAdminStats() {
  const [totalVehicles, totalBookings, totalUsers, totalRevenue] = await Promise.all([
    prisma.vehicle.count(),
    prisma.booking.count(),
    prisma.user.count(),
    prisma.booking.aggregate({
      where: { paymentStatus: "COMPLETED" },
      _sum: { finalPrice: true }
    })
  ])

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true }
      },
      vehicle: {
        select: { name: true }
      }
    }
  })

  return {
    totalVehicles,
    totalBookings,
    totalUsers,
    totalRevenue: totalRevenue._sum.finalPrice || 0,
    recentBookings
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  const stats = await getAdminStats()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your rental business</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button asChild>
          <Link href="/admin/vehicles">Manage Vehicles</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/bookings">Manage Bookings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/coupons">Manage Coupons</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/messages">Messages</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="font-medium">{booking.vehicle.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.user.name} ({booking.user.email})
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{booking.finalPrice}</p>
                  <p className="text-sm text-muted-foreground capitalize">{booking.bookingStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

