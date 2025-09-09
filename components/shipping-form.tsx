"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShippingDetails, usePhotobookStore } from "@/lib/store"
import { useEffect } from "react"

type ShippingFormData = ShippingDetails

export function ShippingForm() {
  const { shipping, setShipping, resetShipping, hasNonEmptyShippingFields } = usePhotobookStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ShippingFormData>({
    defaultValues: {
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      address: shipping.address,
      city: shipping.city,
      zipCode: shipping.zipCode,
      country: shipping.country,
    },
  })

  const watchedCountry = watch("country")

  useEffect(() => {
    setShipping({ country: watchedCountry })
  }, [watchedCountry, setShipping])

  const onSubmit = (data: ShippingFormData) => {
    if (!data.country) {
      return
    }
    setShipping({ ...data, isSaved: true })
  }

  const handleEditAddress = () => {
    setShipping({ isSaved: false })
  }

  const handleReset = () => {
    resetShipping()
    reset()
  }

  const countries = [
    { value: "us", label: "United States" },
    { value: "it", label: "Italy" },
    { value: "uk", label: "United Kingdom" },
  ]

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Shipping Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                disabled={shipping.isSaved}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                disabled={shipping.isSaved}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              disabled={shipping.isSaved}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
                disabled={shipping.isSaved}
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                {...register("zipCode", {
                  required: "ZIP code is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "ZIP code must contain only numbers",
                  },
                  minLength: {
                    value: 3,
                    message: "ZIP code must be at least 3 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "ZIP code must be no more than 10 digits",
                  },
                })}
                disabled={shipping.isSaved}
                className={errors.zipCode ? "border-destructive" : ""}
              />
              {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="country">Country *</Label>
            <Select
              value={watchedCountry}
              onValueChange={(value) => setValue("country", value)}
              disabled={shipping.isSaved}
            >
              <SelectTrigger className={`${errors.country ? "border-destructive" : ""} w-64 max-w-full`}>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
          </div>

          <div className="flex gap-2">
            {!shipping.isSaved ? (
              <>
                <Button type="submit" disabled={!watchedCountry}>
                  Save Address
                </Button>
                {hasNonEmptyShippingFields() && (
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                )}
              </>
            ) : (
              <div className="flex flex-col 2sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={handleEditAddress}>
                  Edit Address
                </Button>
                <span className="text-sm flex items-center">
                  <span className="text-success-foreground mr-1 mb-0.25">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Address saved
                  </span>
                </span>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
