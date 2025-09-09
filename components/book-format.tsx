"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usePhotobookStore } from "@/lib/store"

export function BookFormat() {
  const { book, setBook } = usePhotobookStore()

  const formats = [
    { value: "square", label: "Square" },
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
  ]

  const squareSizes = [
    { value: "20x20", label: "20x20 cm" },
    { value: "30x30", label: "30x30 cm" },
  ]

  const dimensions = [
    { value: "15x21", label: "15x21 cm" },
    { value: "21x28", label: "21x28 cm" },
    { value: "28x35", label: "28x35 cm" },
  ]

  const handleFormatChange = (format: "square" | "horizontal" | "vertical") => {
    setBook({
      format,
      squareSize: format === "square" ? book.squareSize : "",
      dimensions: format !== "square" ? book.dimensions : "",
    })
  }

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Book Format</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Format *</Label>
          <div className="flex flex-col 2sm:flex-row gap-2 mt-2">
            {formats.map((format) => (
              <Button
                key={format.value}
                type="button"
                variant={book.format === format.value ? "default" : "outline"}
                onClick={() => handleFormatChange(format.value as any)}
              >
                {format.label}
              </Button>
            ))}
          </div>
        </div>

        {book.format === "square" && (
          <div>
            <Label>Size *</Label>
            <div className="flex gap-2 mt-2">
              {squareSizes.map((size) => (
                <Button
                  key={size.value}
                  type="button"
                  variant={book.squareSize === size.value ? "default" : "outline"}
                  onClick={() => setBook({ squareSize: size.value as any })}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {(book.format === "horizontal" || book.format === "vertical") && (
          <div>
            <Label>Dimensions *</Label>
            <Select value={book.dimensions} onValueChange={(value) => setBook({ dimensions: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select dimensions" />
              </SelectTrigger>
              <SelectContent>
                {dimensions.map((dimension) => (
                  <SelectItem key={dimension.value} value={dimension.value}>
                    {dimension.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
