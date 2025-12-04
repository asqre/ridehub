import Link from "next/link"
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">RideHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for premium car and bike rentals. Experience the freedom of the road with our top-quality vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className="font-semibold mb-4">Vehicles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles?category=CAR" className="text-muted-foreground hover:text-primary transition-colors">
                  Cars
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=BIKE" className="text-muted-foreground hover:text-primary transition-colors">
                  Bikes
                </Link>
              </li>
              <li>
                <Link href="/vehicles?fuelType=ELECTRIC" className="text-muted-foreground hover:text-primary transition-colors">
                  Electric Vehicles
                </Link>
              </li>
              <li>
                <Link href="/vehicles?featured=true" className="text-muted-foreground hover:text-primary transition-colors">
                  Featured Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Main Street, City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@ridehub.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@ridehub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RideHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

