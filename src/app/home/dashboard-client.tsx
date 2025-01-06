"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard, Star } from 'lucide-react'

type Feedback = {
  id: string
  name: string
  feedback: string
  rating: number
}

type DashboardClientProps = {
  feedbackUrl: string
  feedback: Feedback[]
}

export function DashboardClient({ feedbackUrl, feedback }: DashboardClientProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Feedback URL</CardTitle>
          <CardDescription>Share this URL to collect feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={feedbackUrl}
              readOnly
              className="flex-grow p-2 border rounded"
            />
            <Button
              onClick={() => navigator.clipboard.writeText(feedbackUrl)}
              variant="outline"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {feedback.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

