"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Car, Menu, User, LogOut, LayoutDashboard, Settings } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">RideHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/vehicles?category=CAR" className="text-sm font-medium hover:text-primary transition-colors">
            Cars
          </Link>
          <Link href="/vehicles?category=BIKE" className="text-sm font-medium hover:text-primary transition-colors">
            Bikes
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {(session.user as any)?.role === 'ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-2">
          <Link
            href="/"
            className="block py-2 text-sm font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/vehicles?category=CAR"
            className="block py-2 text-sm font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cars
          </Link>
          <Link
            href="/vehicles?category=BIKE"
            className="block py-2 text-sm font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Bikes
          </Link>
          <Link
            href="/about"
            className="block py-2 text-sm font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-sm font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}

