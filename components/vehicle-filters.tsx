"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VehicleFiltersProps {
  searchParams: Record<string, string | undefined>
}

export function VehicleFilters({ searchParams }: VehicleFiltersProps) {
  const router = useRouter()
  const params = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()))
    
    // Treat "ALL" as clearing the filter
    if (value && value !== "ALL") {
      current.set(key, value)
    } else {
      current.delete(key)
    }
    
    // Reset to page 1 when filters change
    current.set("page", "1")
    
    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    router.push(`/vehicles${query}`)
  }

  const clearFilters = () => {
    router.push("/vehicles")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={searchParams.category || "ALL"}
            onValueChange={(value) => updateFilter("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All categories</SelectItem>
              <SelectItem value="CAR">Car</SelectItem>
              <SelectItem value="BIKE">Bike</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fuel Type</Label>
          <Select
            value={searchParams.fuelType || "ALL"}
            onValueChange={(value) => updateFilter("fuelType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All fuel types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All fuel types</SelectItem>
              <SelectItem value="PETROL">Petrol</SelectItem>
              <SelectItem value="DIESEL">Diesel</SelectItem>
              <SelectItem value="ELECTRIC">Electric</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
              <SelectItem value="CNG">CNG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Transmission</Label>
          <Select
            value={searchParams.transmission || "ALL"}
            onValueChange={(value) => updateFilter("transmission", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All transmissions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All transmissions</SelectItem>
              <SelectItem value="MANUAL">Manual</SelectItem>
              <SelectItem value="AUTOMATIC">Automatic</SelectItem>
              <SelectItem value="SEMI_AUTOMATIC">Semi-Automatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Seats</Label>
          <Select
            value={searchParams.seats || "ALL"}
            onValueChange={(value) => updateFilter("seats", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Any</SelectItem>
              <SelectItem value="2">2 seater</SelectItem>
              <SelectItem value="4">4 seater</SelectItem>
              <SelectItem value="5">5 seater</SelectItem>
              <SelectItem value="7">7 seater</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Min Price (per day)</Label>
          <Input
            type="number"
            placeholder="0"
            value={searchParams.minPrice || ""}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Max Price (per day)</Label>
          <Input
            type="number"
            placeholder="10000"
            value={searchParams.maxPrice || ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}

