import { Suspense } from "react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Star } from "lucide-react"
import { VehicleFilters } from "@/components/vehicle-filters"

export const metadata = {
  title: "Browse Vehicles",
  description: "Explore our wide range of cars and bikes available for rent",
}

interface PageProps {
  searchParams: Promise<{
    category?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    fuelType?: string
    transmission?: string
    seats?: string
    page?: string
  }>
}

type SearchParamsType = {
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  fuelType?: string
  transmission?: string
  seats?: string
  page?: string
}

async function getVehicles(searchParams: SearchParamsType) {
  const page = parseInt(searchParams.page || "1")
  const pageSize = 12
  const skip = (page - 1) * pageSize

  const where: any = {
    available: true,
  }

  if (searchParams.category) {
    where.category = searchParams.category
  }

  if (searchParams.brand) {
    where.brand = searchParams.brand
  }

  if (searchParams.fuelType) {
    where.fuelType = searchParams.fuelType
  }

  if (searchParams.transmission) {
    where.transmission = searchParams.transmission
  }

  if (searchParams.seats) {
    where.seats = parseInt(searchParams.seats)
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.pricePerDay = {}
    if (searchParams.minPrice) {
      where.pricePerDay.gte = parseFloat(searchParams.minPrice)
    }
    if (searchParams.maxPrice) {
      where.pricePerDay.lte = parseFloat(searchParams.maxPrice)
    }
  }

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      include: {
        reviews: {
          select: { rating: true }
        }
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }
    }),
    prisma.vehicle.count({ where })
  ])

  return { vehicles, total, page, pageSize }
}

export default async function VehiclesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const { vehicles, total, page, pageSize } = await getVehicles(resolvedSearchParams)
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse Vehicles</h1>
        <p className="text-muted-foreground">
          Find the perfect vehicle for your journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Suspense fallback={<div>Loading filters...</div>}>
            <VehicleFilters searchParams={resolvedSearchParams} />
          </Suspense>
        </aside>

        {/* Vehicle Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {vehicles.length} of {total} vehicles
            </p>
          </div>

          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No vehicles found matching your filters.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/vehicles">Clear Filters</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => {
                  const avgRating = vehicle.reviews.length > 0
                    ? vehicle.reviews.reduce((acc, r) => acc + r.rating, 0) / vehicle.reviews.length
                    : 0

                  return (
                    <Link key={vehicle.id} href={`/vehicles/${vehicle.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all group h-full">
                        <div className="relative h-48 bg-muted">
                          {vehicle.images[0] && (
                            <img
                              src={vehicle.images[0]}
                              alt={vehicle.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          <Badge className="absolute top-2 right-2">
                            {vehicle.category}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="truncate">{vehicle.name}</span>
                            {avgRating > 0 && (
                              <span className="flex items-center text-sm font-normal text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                {avgRating.toFixed(1)}
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="truncate">
                            {vehicle.brand} • {vehicle.fuelType} • {vehicle.transmission}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold">{formatCurrency(vehicle.pricePerDay)}</p>
                            <p className="text-sm text-muted-foreground">per day</p>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {page > 1 && (
                    <Button variant="outline" asChild>
                      <Link href={`/vehicles?${new URLSearchParams({ ...resolvedSearchParams, page: String(page - 1) }).toString()}`}>
                        Previous
                      </Link>
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          asChild
                        >
                          <Link href={`/vehicles?${new URLSearchParams({ ...resolvedSearchParams, page: String(pageNum) }).toString()}`}>
                            {pageNum}
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                  {page < totalPages && (
                    <Button variant="outline" asChild>
                      <Link href={`/vehicles?${new URLSearchParams({ ...resolvedSearchParams, page: String(page + 1) }).toString()}`}>
                        Next
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

