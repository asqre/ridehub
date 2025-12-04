import { Vehicle } from '@prisma/client'

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RideHub',
    description: 'Premium car and bike rental services',
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    image: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
    telephone: '+1-234-567-890',
    email: 'info@ridehub.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '0.0',
      longitude: '0.0',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
  }
}

export function generateVehicleProductSchema(vehicle: Vehicle & { reviews?: any[] }) {
  const avgRating = vehicle.reviews && vehicle.reviews.length > 0
    ? vehicle.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / vehicle.reviews.length
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.images,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/vehicles/${vehicle.slug}`,
      priceCurrency: 'INR',
      price: vehicle.pricePerDay,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: vehicle.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/UsedCondition',
    },
    ...(avgRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: vehicle.reviews?.length || 0,
      },
    }),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

