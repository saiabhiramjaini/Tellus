"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "next/navigation"
import { StarIcon, Send, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function FeedbackPage() {
  const params = useParams()
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    rating: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          code: params.code,
        }),
      })

      if (response.ok) {
        setMessage("Thank you for your feedback!")
        setFormData({ name: "", feedback: "", rating: 0 })
        setIsSuccess(true)
      } else {
        setMessage("Failed to submit feedback. Please try again.")
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.")
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid absolute inset-0 opacity-20" />

      <div className="relative py-12 px-4 flex items-center justify-center min-h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto w-full">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-accent" />
              </motion.div>
              <CardTitle className="text-3xl text-foreground">Share Your Experience</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your feedback helps us improve and grow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="bg-background/50 border-border focus:border-accent"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label className="text-foreground">Rating</Label>
                  <div className="flex gap-2 justify-center p-6 bg-card/30 rounded-lg border border-border/30">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none focus:ring-2 focus:ring-accent rounded-full p-1"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <StarIcon
                          className={`w-8 h-8 transition-all duration-200 ${
                            formData.rating >= star
                              ? "text-accent fill-accent"
                              : "text-muted-foreground hover:text-accent/60"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm text-muted-foreground"
                    >
                      {formData.rating === 5
                        ? "Excellent!"
                        : formData.rating === 4
                          ? "Great!"
                          : formData.rating === 3
                            ? "Good!"
                            : formData.rating === 2
                              ? "Fair"
                              : "Needs improvement"}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="feedback" className="text-foreground">
                    Your Feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Tell us about your experience..."
                    required
                    className="min-h-32 bg-background/50 border-border focus:border-accent resize-none"
                  />
                </motion.div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border ${
                        isSuccess
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-t-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
