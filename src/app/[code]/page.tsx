"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from 'next/navigation'
import { StarIcon, Send } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function FeedbackPage() {
    const params = useParams()
    const [formData, setFormData] = useState({
        name: '',
        feedback: '',
        rating: 0
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage('')

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    code: params.code,
                }),
            })

            if (response.ok) {
                setMessage('Thank you for your feedback!')
                setFormData({ name: '', feedback: '', rating: 0 })
                setIsSuccess(true)
            } else {
                setMessage('Failed to submit feedback. Please try again.')
                setIsSuccess(false)
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.')
            setIsSuccess(false)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-lightBlue to-white py-12 px-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto">
                <Card className="bg-white/50 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">Share Your Experience</CardTitle>
                        <CardDescription>Your feedback helps us improve</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="John Doe"
                                    required
                                    className="bg-white/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Rating</Label>
                                <div className="flex gap-2 justify-center p-4 bg-white/30 rounded-lg">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({...formData, rating: star})}
                                            className="focus:outline-none"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <StarIcon
                                                className={`w-8 h-8 transition-colors ${
                                                    formData.rating >= star
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300 hover:text-yellow-200'
                                                }`}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feedback">Your Feedback</Label>
                                <Textarea
                                    id="feedback"
                                    value={formData.feedback}
                                    onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                                    placeholder="Tell us about your experience..."
                                    required
                                    className="min-h-32 bg-white/50"
                                />
                            </div>

                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`p-4 rounded-lg ${
                                            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Send className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Feedback
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

