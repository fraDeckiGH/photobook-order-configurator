"use client"

import { ShippingForm } from "@/components/shipping-form"
import { BookFormat } from "@/components/book-format"
import { PageCount } from "@/components/page-count"
import { ExtraOptions } from "@/components/extra-options"
import { OrderPreview } from "@/components/order-preview"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function PhotobookConfigurator() {
  return (
    <div className="min-h-screen fancy-background p-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold premium-header mb-2">Photobook Configurator</h1>
          <p className="text-muted-foreground text-sm">
            Create your personalized photobook with custom shipping details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShippingForm />
            <BookFormat />
            <PageCount />
            <ExtraOptions />
          </div>

          <div className="space-y-6">
            <OrderPreview />
            <OrderConfirmation />
          </div>
        </div>
      </div>
    </div>
  )
}
