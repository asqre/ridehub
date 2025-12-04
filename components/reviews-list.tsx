"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Review {
  id: string
  rating: number
  comment: string | null
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

interface ReviewsListProps {
  reviews: Review[]
  vehicleId: string
}

export function ReviewsList({ reviews, vehicleId }: ReviewsListProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit review")
      }

      setShowForm(false)
      setRating(0)
      setComment("")
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Reviews ({reviews.length})</CardTitle>
          {session && !showForm && (
            <Button onClick={() => setShowForm(true)}>
              Write a Review
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 border-b pb-6">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        value <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading || rating === 0}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setRating(0)
                  setComment("")
                  setError("")
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.user.name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-muted-foreground">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

