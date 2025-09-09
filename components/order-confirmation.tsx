"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { usePhotobookStore } from "@/lib/store"

export function OrderConfirmation() {
  const {
    shipping,
    book,
    isOrderValid,
    isOrderConfirmed,
    isOrderModified,
    hasChanges,
    confirmOrder,
    editOrder,
    newOrder,
  } = usePhotobookStore()

  const handleOrderSubmit = () => {
    if (!isOrderValid()) return

    const orderData = {
      shipping: {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        address: shipping.address,
        city: shipping.city,
        zipCode: shipping.zipCode,
        country: shipping.country,
      },
      book: {
        format: book.format,
        size: book.format === "square" ? book.squareSize : book.dimensions,
        pageCount: book.pageCount,
        giftWrap: book.giftWrap,
        giftNote: book.giftNote,
        personalizedCover: book.personalizedCover,
        coverLayout: book.coverLayout,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("order", orderData)
  }

  const handleConfirmOrder = () => {
    handleOrderSubmit()
    confirmOrder()
  }
  
  const handleEditOrder = () => {
    handleOrderSubmit()
    editOrder()
  }

  const handleNewOrder = () => {
    newOrder()
  }

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Confirm Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isOrderConfirmed ? (
            <Button onClick={handleConfirmOrder} disabled={!isOrderValid()} className="w-full" size="lg">
              Confirm Order
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleEditOrder}
                disabled={!isOrderValid() || !hasChanges}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Edit Order
              </Button>
              <Button onClick={handleNewOrder} className="flex-1">
                New Order
              </Button>
            </div>
          )}

          {!isOrderValid() && !isOrderConfirmed && (
            <p className="text-sm text-muted-foreground text-center">
              Please complete all required fields to confirm your order
            </p>
          )}

          {(isOrderConfirmed || isOrderModified) && (
            <Alert className="items-baseline text-success-foreground">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="">
                {isOrderModified ? "Order modified!" : "Order confirmed! Thank you for your purchase."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
