"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VehicleImageGalleryProps {
  images: string[]
  name: string
}

export function VehicleImageGallery({ images, name }: VehicleImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
        <img
          src={images[currentIndex]}
          alt={`${name} - Image ${currentIndex + 1}`}
          className="object-cover w-full h-full"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              <img
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

