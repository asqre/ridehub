import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about RideHub vehicle rentals",
}

const faqs = [
  {
    category: "Booking",
    questions: [
      {
        question: "How do I book a vehicle?",
        answer: "Simply browse our vehicle listings, select your desired vehicle, choose your dates, and proceed with the booking. You'll need to create an account or sign in to complete your reservation."
      },
      {
        question: "Can I cancel or modify my booking?",
        answer: "Yes, you can cancel or modify your booking from your dashboard. Cancellation policies vary depending on how far in advance you cancel. Please check our terms for specific details."
      },
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 24-48 hours in advance, especially during peak seasons. However, same-day bookings may be available depending on vehicle availability."
      },
    ]
  },
  {
    category: "Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, and UPI payments through our secure payment gateway powered by Razorpay."
      },
      {
        question: "When will I be charged?",
        answer: "Payment is processed immediately after booking confirmation. The full rental amount is charged upfront."
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, refunds are processed based on our cancellation policy. Early cancellations typically receive full or partial refunds. Please refer to our terms for details."
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, we believe in transparent pricing. The price you see during booking is the final price. Any additional charges (like extra hours or damage) will be communicated clearly."
      },
    ]
  },
  {
    category: "Vehicles",
    questions: [
      {
        question: "Are your vehicles insured?",
        answer: "Yes, all our vehicles come with comprehensive insurance coverage for your safety and peace of mind."
      },
      {
        question: "What is your vehicle maintenance policy?",
        answer: "All vehicles undergo regular maintenance and inspection before each rental. We ensure our fleet is in excellent condition and roadworthy."
      },
      {
        question: "Can I choose a specific vehicle model?",
        answer: "Yes, when you book a specific vehicle listing, that exact vehicle (or equivalent in case of unforeseen circumstances) will be provided."
      },
      {
        question: "What should I do if the vehicle breaks down?",
        answer: "Contact our 24/7 support immediately. We provide roadside assistance and will arrange a replacement vehicle if needed."
      },
    ]
  },
  {
    category: "Requirements",
    questions: [
      {
        question: "What documents do I need to rent a vehicle?",
        answer: "You'll need a valid driver's license, government-issued ID proof, and a major credit/debit card. For two-wheelers, an appropriate vehicle license is required."
      },
      {
        question: "What is the minimum age requirement?",
        answer: "Renters must be at least 21 years old for cars and 18 years old for bikes. Valid driving license with minimum 1 year experience is required."
      },
      {
        question: "Can someone else drive the rented vehicle?",
        answer: "Additional drivers can be added during booking. They must meet the same requirements and be present during vehicle handover with valid documents."
      },
    ]
  },
  {
    category: "Usage & Rules",
    questions: [
      {
        question: "Is there a mileage limit?",
        answer: "Most rentals include unlimited mileage within the city. For outstation trips, please check the specific vehicle listing for any mileage restrictions."
      },
      {
        question: "Can I take the vehicle to another state?",
        answer: "Interstate travel is allowed for most vehicles. Please inform us during booking so we can provide necessary documentation."
      },
      {
        question: "What happens if I return the vehicle late?",
        answer: "Late returns are charged on an hourly basis. If you know you'll be late, please contact us to extend your booking and avoid additional charges."
      },
      {
        question: "Is smoking allowed in the vehicles?",
        answer: "No, smoking is strictly prohibited in all our vehicles. A cleaning fee will be charged if this policy is violated."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

