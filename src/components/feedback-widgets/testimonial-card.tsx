"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  name: string
  feedback: string
  rating: number
  variant?: "default" | "compact" | "featured"
  showDate?: boolean
  createdAt?: string
}

export function TestimonialCard({
  name,
  feedback,
  rating,
  variant = "default",
  showDate = false,
  createdAt,
}: TestimonialCardProps) {
  const renderStars = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "text-accent fill-accent" : "text-muted-foreground"}`} />
      ))}
    </div>
  )

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm">{name}</h4>
          {renderStars()}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{feedback}</p>
        {showDate && createdAt && (
          <p className="text-xs text-muted-foreground mt-2">{new Date(createdAt).toLocaleDateString()}</p>
        )}
      </motion.div>
    )
  }

  if (variant === "featured") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <Card className="bg-gradient-to-br from-accent/10 to-card border-accent/20 hover:border-accent/40 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">{name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-semibold">{name}</h3>
                {renderStars()}
              </div>
            </div>
            <blockquote className="text-foreground/90 italic">"{feedback}"</blockquote>
            {showDate && createdAt && (
              <p className="text-xs text-muted-foreground mt-4">{new Date(createdAt).toLocaleDateString()}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold">{name}</h3>
            {renderStars()}
          </div>
          <p className="text-muted-foreground">{feedback}</p>
          {showDate && createdAt && (
            <p className="text-xs text-muted-foreground mt-3">{new Date(createdAt).toLocaleDateString()}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
