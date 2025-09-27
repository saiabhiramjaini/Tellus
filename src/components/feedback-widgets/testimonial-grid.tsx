"use client"

import { TestimonialCard } from "./testimonial-card"
import { motion } from "framer-motion"

interface Feedback {
  id: string
  name: string
  feedback: string
  rating: number
  createdAt?: string
}

interface TestimonialGridProps {
  feedback: Feedback[]
  variant?: "masonry" | "grid" | "carousel"
  showDate?: boolean
}

export function TestimonialGrid({ feedback, variant = "grid", showDate = false }: TestimonialGridProps) {
  if (!feedback.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No testimonials yet.</p>
      </div>
    )
  }

  if (variant === "masonry") {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {feedback.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid"
          >
            <TestimonialCard
              name={item.name}
              feedback={item.feedback}
              rating={item.rating}
              variant={index % 4 === 0 ? "featured" : "default"}
              showDate={showDate}
              createdAt={item.createdAt}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {feedback.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TestimonialCard
            name={item.name}
            feedback={item.feedback}
            rating={item.rating}
            variant={index === 0 ? "featured" : "default"}
            showDate={showDate}
            createdAt={item.createdAt}
          />
        </motion.div>
      ))}
    </div>
  )
}
