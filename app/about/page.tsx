import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Car, Users, Shield, Award, Target, Heart } from "lucide-react"

export const metadata = {
  title: "About Us",
  description: "Learn more about RideHub and our mission to provide the best vehicle rental experience",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About RideHub</h1>
        <p className="text-xl text-muted-foreground">
          Your trusted partner for premium vehicle rentals. We&apos;re committed to making your journey memorable with top-quality vehicles and exceptional service.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide accessible, reliable, and affordable vehicle rental services that empower people to explore, commute, and experience freedom on the road with confidence and convenience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To become the most trusted and preferred vehicle rental platform, known for exceptional customer service, innovative technology, and a commitment to sustainable transportation solutions.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose RideHub?</h2>
          <p className="text-muted-foreground text-lg">
            We go the extra mile to ensure your satisfaction
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
              <p className="text-muted-foreground">
                Wide selection of well-maintained, modern vehicles for every need
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Comprehensive insurance coverage and verified vehicles for your peace of mind
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer service to assist you anytime, anywhere
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground rounded-lg p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-sm opacity-90">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-90">Vehicles</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-90">Cities</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.8★</div>
            <div className="text-sm opacity-90">Average Rating</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
        <p className="text-muted-foreground mb-8">
          Explore our wide range of vehicles and book your perfect ride today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/vehicles">Browse Vehicles</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

