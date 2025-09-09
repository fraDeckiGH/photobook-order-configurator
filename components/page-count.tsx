"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { usePhotobookStore } from "@/lib/store"

export function PageCount() {
  const { book, setBook } = usePhotobookStore()

  const handlePageCountChange = (value: number) => {
    if (value >= 10 && value <= 100) {
      setBook({ pageCount: value })
    }
  }

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Number of Pages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="pageCount">Pages (10-100)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              value={[book.pageCount]}
              onValueChange={(value) => handlePageCountChange(value[0])}
              min={10}
              max={100}
              step={1}
              className="flex-1"
            />
            <Input
              id="pageCount"
              type="number"
              min={10}
              max={100}
              value={book.pageCount}
              onChange={(e) => handlePageCountChange(Number.parseInt(e.target.value) || 20)}
              className="w-20"
            />
          </div>
        </div>

        {book.pageCount > 60 && (
          <Alert className="text-warning-foreground">
            <AlertTriangle className="h-4 w-4 " />
            <AlertDescription className="">
              Warning: the cost will increase for the addition of extra pages.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
