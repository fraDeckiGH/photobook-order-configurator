"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePhotobookStore } from "@/lib/store"

export function ExtraOptions() {
  const { book, setBook } = usePhotobookStore()

  const coverLayouts = [
    { value: "single", label: "Single Photo" },
    { value: "collage", label: "Collage" },
  ]

  return (
    <Card className="fancy-card transition-all duration-300">
      <CardHeader>
        <CardTitle>Extra Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="giftWrap"
              checked={book.giftWrap}
              onCheckedChange={(checked) => {
                setBook({
                  giftWrap: !!checked,
                  giftNote: checked ? book.giftNote : "",
                })
              }}
            />
            <Label htmlFor="giftWrap">Gift wrap</Label>
          </div>

          {book.giftWrap && (
            <div className="ml-6 flex flex-col gap-2">
              <Label htmlFor="giftNote">Personalized note (optional)</Label>
              <Input
                id="giftNote"
                placeholder="Enter your personalized message..."
                value={book.giftNote}
                onChange={(e) => setBook({ giftNote: e.target.value })}
                className="mt-1"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="personalizedCover"
              checked={book.personalizedCover}
              onCheckedChange={(checked) => {
                setBook({
                  personalizedCover: !!checked,
                  coverLayout: checked ? book.coverLayout : "",
                })
              }}
            />
            <Label htmlFor="personalizedCover">Personalized photo cover</Label>
          </div>

          {book.personalizedCover && (
            <div className="ml-6">
              <Label>Layout *</Label>
              <div className="flex flex-col 2sm:flex-row gap-2 mt-2">
                {coverLayouts.map((layout) => (
                  <Button
                    key={layout.value}
                    type="button"
                    variant={book.coverLayout === layout.value ? "default" : "outline"}
                    onClick={() => setBook({ coverLayout: layout.value as any })}
                  >
                    {layout.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
