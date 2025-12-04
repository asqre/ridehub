import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { 
  Star, 
  Fuel, 
  Gauge, 
  Users, 
  Zap, 
  Calendar,
  MapPin,
  CheckCircle
} from "lucide-react"
import { VehicleImageGallery } from "@/components/vehicle-image-gallery"
import { BookingForm } from "@/components/booking-form"
import { ReviewsList } from "@/components/reviews-list"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getVehicle(slug: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  return vehicle
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const vehicle = await getVehicle(slug)

  if (!vehicle) {
    return {
      title: "Vehicle Not Found"
    }
  }

  return {
    title: `${vehicle.name} - Rent Now`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.name} - Rent Now`,
      description: vehicle.description,
      images: vehicle.images,
    },
  }
}

export default async function VehicleDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const vehicle = await getVehicle(slug)

  if (!vehicle) {
    notFound()
  }

  const avgRating = vehicle.reviews.length > 0
    ? vehicle.reviews.reduce((acc, r) => acc + r.rating, 0) / vehicle.reviews.length
    : 0

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        {" / "}
        <Link href="/vehicles" className="hover:text-primary">Vehicles</Link>
        {" / "}
        <span className="text-foreground">{vehicle.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <VehicleImageGallery images={vehicle.images} name={vehicle.name} />

          {/* Vehicle Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{vehicle.name}</h1>
                  <Badge>{vehicle.category}</Badge>
                  {vehicle.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <p className="text-muted-foreground">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
              </div>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{avgRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({vehicle.reviews.length} reviews)</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Fuel className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-medium">{vehicle.transmission}</p>
                  </div>
                </div>

                {vehicle.seats && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seats</p>
                      <p className="font-medium">{vehicle.seats} Seater</p>
                    </div>
                  </div>
                )}

                {vehicle.enginePower && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Engine Power</p>
                      <p className="font-medium">{vehicle.enginePower}</p>
                    </div>
                  </div>
                )}

                {vehicle.mileage && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-medium">{vehicle.mileage}</p>
                    </div>
                  </div>
                )}

                {vehicle.color && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-5 w-5 rounded-full border-2" style={{ backgroundColor: vehicle.color.toLowerCase() }} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Color</p>
                      <p className="font-medium">{vehicle.color}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "24/7 Customer Support",
                  "Free Home Delivery",
                  "Comprehensive Insurance",
                  "No Hidden Charges",
                  "Flexible Booking",
                  "Well Maintained",
                  "GPS Enabled",
                  "Roadside Assistance"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <ReviewsList reviews={vehicle.reviews} vehicleId={vehicle.id} />
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Now</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{formatCurrency(vehicle.pricePerDay)}</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm vehicle={vehicle} />
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="mt-4">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Free pickup & drop</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Flexible cancellation</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <span>Verified & insured</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

