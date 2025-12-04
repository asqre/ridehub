import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus } from "lucide-react"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Manage Coupons - Admin",
}

async function getCoupons() {
  return await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" }
  })
}

export default async function AdminCouponsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  const coupons = await getCoupons()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Coupons</h1>
          <p className="text-muted-foreground">Create and manage discount coupons</p>
        </div>
        <Button asChild>
          <Link href="/admin/coupons/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Coupon
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const isExpired = new Date() > new Date(coupon.validUntil)
          const isActive = coupon.active && !isExpired

          return (
            <Card key={coupon.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-2xl mb-1">{coupon.code}</h3>
                    {coupon.description && (
                      <p className="text-sm text-muted-foreground">{coupon.description}</p>
                    )}
                  </div>
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "Active" : isExpired ? "Expired" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-medium">
                      {coupon.discountType === "PERCENTAGE" 
                        ? `${coupon.discount}%` 
                        : `₹${coupon.discount}`
                      }
                    </span>
                  </div>

                  {coupon.minAmount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Amount:</span>
                      <span className="font-medium">₹{coupon.minAmount}</span>
                    </div>
                  )}

                  {coupon.maxDiscount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Discount:</span>
                      <span className="font-medium">₹{coupon.maxDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="font-medium">{formatDate(coupon.validUntil)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Used:</span>
                    <span className="font-medium">
                      {coupon.usedCount}
                      {coupon.usageLimit && ` / ${coupon.usageLimit}`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {coupons.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No coupons yet</p>
            <Button asChild>
              <Link href="/admin/coupons/new">Create Your First Coupon</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

