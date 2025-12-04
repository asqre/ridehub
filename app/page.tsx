import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { 
  Car, 
  Bike, 
  Shield, 
  Clock, 
  BadgeCheck, 
  Zap, 
  Star,
  MapPin,
  Calendar,
  Search
} from "lucide-react"

export default async function Home() {
  // Fetch featured vehicles
  const featuredVehicles = await prisma.vehicle.findMany({
    where: { featured: true, available: true },
    take: 6,
    include: {
      reviews: {
        select: { rating: true }
      }
    }
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Journey Starts Here
            </h1>
            <p className="text-xl text-muted-foreground">
              Rent premium cars and bikes at the best prices. Experience freedom on the road with RideHub.
            </p>
            
            {/* Search Bar */}
            <div className="bg-card border rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>
              <Button size="lg" className="w-full mt-4" asChild>
                <Link href="/vehicles">
                  <Search className="mr-2 h-5 w-5" />
                  Search Vehicles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground text-lg">Choose from our wide range of vehicles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/vehicles?category=CAR">
              <Card className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Car className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cars</CardTitle>
                  <CardDescription>Sedans, SUVs, Luxury Cars & More</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Explore our extensive collection of cars perfect for any journey
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/vehicles?category=BIKE">
              <Card className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Bike className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Bikes</CardTitle>
                  <CardDescription>Sport Bikes, Cruisers, Scooters & More</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Discover two-wheelers for every adventure and commute
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-muted-foreground text-lg">Handpicked premium vehicles for your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => {
              const avgRating = vehicle.reviews.length > 0
                ? vehicle.reviews.reduce((acc, r) => acc + r.rating, 0) / vehicle.reviews.length
                : 0

              return (
                <Link key={vehicle.id} href={`/vehicles/${vehicle.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group">
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
                        <span>{vehicle.name}</span>
                        {avgRating > 0 && (
                          <span className="flex items-center text-sm font-normal text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {avgRating.toFixed(1)}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {vehicle.brand} • {vehicle.fuelType} • {vehicle.transmission}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{formatCurrency(vehicle.pricePerDay)}</p>
                        <p className="text-sm text-muted-foreground">per day</p>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>

          {featuredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured vehicles available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/vehicles">View All Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RideHub?</h2>
            <p className="text-muted-foreground text-lg">We make renting vehicles easy and affordable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BadgeCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Verified Vehicles</h3>
              <p className="text-muted-foreground">
                All our vehicles are thoroughly inspected and well-maintained
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer support for your convenience
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Secure payment gateway and comprehensive insurance coverage
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Instant Booking</h3>
              <p className="text-muted-foreground">
                Quick and hassle-free booking process in just a few clicks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg">Don&apos;t just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Business Traveler",
                content: "Amazing service! The booking process was smooth and the car was in perfect condition. Will definitely use RideHub again.",
                rating: 5
              },
              {
                name: "Sarah Smith",
                role: "Weekend Explorer",
                content: "Rented a bike for a weekend trip. Great experience from start to finish. The staff was very helpful and professional.",
                rating: 5
              },
              {
                name: "Mike Johnson",
                role: "Daily Commuter",
                content: "Best rental service in town! Affordable prices, great vehicle selection, and excellent customer support.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">&quot;{testimonial.content}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Hit the Road?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Book your perfect ride today and experience the freedom of the open road
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/vehicles">Browse Vehicles</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
