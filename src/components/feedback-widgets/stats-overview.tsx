"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface Feedback {
  id: string
  name: string
  rating: number
}

interface StatsOverviewProps {
  feedback: Feedback[]
}

export function StatsOverview({ feedback }: StatsOverviewProps) {
  const totalFeedback = feedback.length
  const averageRating = feedback.length > 0 ? feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length : 0
  const uniqueUsers = new Set(feedback.map((f) => f.name)).size
  const highRatings = feedback.filter((f) => f.rating >= 4).length
  const satisfactionRate = totalFeedback > 0 ? (highRatings / totalFeedback) * 100 : 0

  const stats = [
    {
      title: "Total Feedback",
      value: totalFeedback.toString(),
      icon: MessageSquare,
      description: "Collected responses",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      description: "Out of 5 stars",
      extra: (
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.round(averageRating) ? "text-accent fill-accent" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Unique Users",
      value: uniqueUsers.toString(),
      icon: Users,
      description: "Individual contributors",
    },
    {
      title: "Satisfaction Rate",
      value: `${satisfactionRate.toFixed(0)}%`,
      icon: TrendingUp,
      description: "4+ star ratings",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              {stat.extra && stat.extra}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
