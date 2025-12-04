import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using RideHub services",
}

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <Card>
          <CardContent className="pt-6 prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using RideHub&apos;s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Rental Agreement</h2>
            <p>
              When you book a vehicle through RideHub, you enter into a rental agreement with us. This agreement includes:
            </p>
            <ul>
              <li>Agreed rental period and pricing</li>
              <li>Vehicle condition and specifications</li>
              <li>Insurance coverage details</li>
              <li>Payment terms and conditions</li>
            </ul>

            <h2>3. Eligibility Requirements</h2>
            <p>
              To rent a vehicle, you must:
            </p>
            <ul>
              <li>Be at least 21 years old for cars, 18 years old for bikes</li>
              <li>Possess a valid driver&apos;s license</li>
              <li>Provide valid government-issued identification</li>
              <li>Have a valid payment method</li>
            </ul>

            <h2>4. Booking and Payment</h2>
            <p>
              All bookings must be made through our platform. Payment is required at the time of booking. We accept major credit cards, debit cards, and UPI payments.
            </p>

            <h2>5. Cancellation and Refunds</h2>
            <p>
              Cancellation policies vary based on when you cancel:
            </p>
            <ul>
              <li>More than 48 hours before pickup: Full refund</li>
              <li>24-48 hours before pickup: 50% refund</li>
              <li>Less than 24 hours before pickup: No refund</li>
            </ul>

            <h2>6. Vehicle Use</h2>
            <p>
              The renter agrees to:
            </p>
            <ul>
              <li>Use the vehicle in a safe and lawful manner</li>
              <li>Not sublease or lend the vehicle to others</li>
              <li>Not use the vehicle for illegal activities</li>
              <li>Return the vehicle in the same condition as received</li>
              <li>Be responsible for all traffic violations and fines</li>
            </ul>

            <h2>7. Insurance and Liability</h2>
            <p>
              All vehicles come with comprehensive insurance. However, the renter is liable for:
            </p>
            <ul>
              <li>The insurance deductible in case of accidents</li>
              <li>Damage caused by negligence or misuse</li>
              <li>Loss or theft of vehicle accessories</li>
            </ul>

            <h2>8. Vehicle Return</h2>
            <p>
              Vehicles must be returned at the agreed time and location. Late returns will incur additional charges. The vehicle must be returned with the same fuel level as provided.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your use of RideHub is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
            </p>

            <h2>10. Modifications to Terms</h2>
            <p>
              RideHub reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: info@ridehub.com
              <br />
              Phone: +1 (234) 567-890
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

