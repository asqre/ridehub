import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for RideHub services",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <Card>
          <CardContent className="pt-6 prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Driver&apos;s license information</li>
              <li>Payment information</li>
              <li>Booking and rental history</li>
              <li>Communications with our support team</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Process and manage your bookings</li>
              <li>Provide customer support</li>
              <li>Send booking confirmations and updates</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li>Service providers who help us operate our platform</li>
              <li>Payment processors for transaction processing</li>
              <li>Law enforcement when required by law</li>
              <li>Insurance providers in case of accidents</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. You can control cookies through your browser settings.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 18. We do not knowingly collect information from children under 18.
            </p>

            <h2>9. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account at any time.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our platform.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: privacy@ridehub.com
              <br />
              Phone: +1 (234) 567-890
              <br />
              Address: 123 Main Street, City, State 12345
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

