"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { TestimonialGrid } from "@/components/feedback-widgets/testimonial-grid"
import { motion } from "framer-motion"

interface Feedback {
  id: string
  name: string
  feedback: string
  rating: number
  createdAt: string
}

export default function EmbedTestimonialsPage() {
  const { code } = useParams()
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!code) return

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/testimonials/${code}`)

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials")
        }

        const data = await response.json()
        setFeedbackData(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [code])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading testimonials</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid absolute inset-0 opacity-10" />
      <div className="relative p-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Customer Testimonials</h1>
          <p className="text-muted-foreground">See what our customers are saying</p>
        </motion.div>

        <TestimonialGrid feedback={feedbackData} variant="masonry" showDate={true} />
      </div>
    </div>
  )
}
