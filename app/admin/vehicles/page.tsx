import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Manage Vehicles - Admin",
}

async function getVehicles() {
  return await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true }
      }
    }
  })
}

export default async function AdminVehiclesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  const vehicles = await getVehicles()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Vehicles</h1>
          <p className="text-muted-foreground">Add, edit or remove vehicles</p>
        </div>
        <Button asChild>
          <Link href="/admin/vehicles/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardContent className="pt-6">
              <div className="relative h-48 bg-muted rounded-lg overflow-hidden mb-4">
                {vehicle.images[0] && (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge>{vehicle.category}</Badge>
                  {vehicle.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-1">{vehicle.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {vehicle.brand} • {vehicle.model}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(vehicle.pricePerDay)}</p>
                  <p className="text-sm text-muted-foreground">per day</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{vehicle._count.bookings} bookings</p>
                  <Badge variant={vehicle.available ? "default" : "secondary"}>
                    {vehicle.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No vehicles yet</p>
            <Button asChild>
              <Link href="/admin/vehicles/new">Add Your First Vehicle</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

