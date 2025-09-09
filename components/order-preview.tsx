"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePhotobookStore } from "@/lib/store"

export function OrderPreview() {
  const { shipping, book } = usePhotobookStore()

  const getFormatDisplay = () => {
    if (!book.format) return "Not selected"

    if (book.format === "square") {
      return `Square ${book.squareSize || "(size not selected)"}`
    }

    return `${book.format.charAt(0).toUpperCase() + book.format.slice(1)} ${book.dimensions || "(dimensions not selected)"}`
  }

  const getMissingFields = () => {
    const missing = []

    if (!shipping.isSaved) missing.push("Shipping details not saved")
    if (!shipping.firstName.trim()) missing.push("First name")
    if (!shipping.lastName.trim()) missing.push("Last name")
    if (!shipping.address.trim()) missing.push("Address")
    if (!shipping.city.trim()) missing.push("City")
    if (!shipping.zipCode.trim()) missing.push("ZIP code")
    if (!shipping.country) missing.push("Country")
    if (!book.format) missing.push("Book format")
    if (book.format === "square" && !book.squareSize) missing.push("Square size")
    if ((book.format === "horizontal" || book.format === "vertical") && !book.dimensions)
      missing.push("Book dimensions")
    if (book.personalizedCover && !book.coverLayout) missing.push("Cover layout")

    return missing
  }

  const missingFields = getMissingFields()

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Order Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Shipping Details</h4>
          {shipping.isSaved ? (
            <div className="text-sm space-y-1">
              <p>
                {shipping.firstName} {shipping.lastName}
              </p>
              <p>{shipping.address}</p>
              <p>
                {shipping.city}, {shipping.zipCode}
              </p>
              <p>{shipping.country.toUpperCase()}</p>
              <Badge variant="secondary">✓ Saved</Badge>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Not completed</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Book Configuration</h4>
          <div className="text-sm space-y-1">
            <p>
              <strong>Format:</strong> {getFormatDisplay()}
            </p>
            <p>
              <strong>Pages:</strong> {book.pageCount}
            </p>
            <p>
              <strong>Gift wrap:</strong> {book.giftWrap ? "Yes" : "No"}
            </p>
            {book.giftWrap && book.giftNote && (
              <p>
                <strong>Gift note:</strong> "{book.giftNote}"
              </p>
            )}
            <p>
              <strong>Personalized cover:</strong> {book.personalizedCover ? "Yes" : "No"}
            </p>
            {book.personalizedCover && book.coverLayout && (
              <p>
                <strong>Cover layout:</strong> {book.coverLayout}
              </p>
            )}
          </div>
        </div>

        {missingFields.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-destructive">Missing Required Fields</h4>
            <ul className="text-sm text-destructive space-y-1">
              {missingFields.map((field, index) => (
                <li key={index}>• {field}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
