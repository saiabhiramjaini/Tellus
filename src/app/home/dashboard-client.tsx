"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"

import { TestimonialGrid } from "@/components/feedback-widgets/testimonial-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsOverview } from "@/components/feedback-widgets/stats-overview"

type Feedback = {
  id: string
  name: string
  feedback: string
  rating: number
  createdAt?: string
}

type DashboardClientProps = {
  feedbackUrl: string
  feedback: Feedback[]
  userCode: string
}

export function DashboardClient({ feedbackUrl, feedback, userCode }: DashboardClientProps) {
  const [isEmbedCodeOpen, setIsEmbedCodeOpen] = useState(false)
  const [copyConfirmation, setCopyConfirmation] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopyConfirmation(type)
    setTimeout(() => setCopyConfirmation(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid absolute inset-0 opacity-20" />
      <Navbar />

      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Feedback Dashboard</h1>
            <p className="text-lg text-muted-foreground">Monitor and manage your customer feedback</p>
          </motion.div>

          {/* Stats Overview */}
          <StatsOverview feedback={feedback} />

          {/* Feedback URL and Embed Code */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Share & Embed</CardTitle>
                <CardDescription>Share your feedback form or embed testimonials on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input type="text" value={feedbackUrl} readOnly className="font-mono text-sm bg-background/50" />
                  <Button onClick={() => handleCopy(feedbackUrl, "url")} variant="secondary">
                    <Clipboard className="w-4 h-4 mr-2" />
                    {copyConfirmation === "url" ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <Button
                  onClick={() => setIsEmbedCodeOpen(true)}
                  variant="outline"
                  className="border-accent/20 hover:bg-accent/10"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Get Embed Code
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feedback Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Customer Feedback</CardTitle>
                <CardDescription>View and manage all collected testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grid" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-background/50">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="masonry">Masonry View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="grid" className="mt-6">
                    <TestimonialGrid feedback={feedback} variant="grid" showDate={true} />
                  </TabsContent>
                  <TabsContent value="masonry" className="mt-6">
                    <TestimonialGrid feedback={feedback} variant="masonry" showDate={true} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Embed Code Dialog */}
      <Dialog open={isEmbedCodeOpen} onOpenChange={setIsEmbedCodeOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Embed Testimonials</DialogTitle>
            <DialogDescription>Choose from multiple widget styles to showcase your testimonials</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="iframe" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50">
              <TabsTrigger value="iframe">iFrame</TabsTrigger>
              <TabsTrigger value="script">Script</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="iframe" className="space-y-4">
              <div className="bg-background/50 p-4 rounded-md border">
                <code className="text-sm break-all font-mono text-foreground">
                  {`<iframe src="${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/embed/${userCode}" width="100%" height="500" frameborder="0"></iframe>`}
                </code>
              </div>
              <Button
                onClick={() =>
                  handleCopy(
                    `<iframe src="${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/embed/${userCode}" width="100%" height="500" frameborder="0"></iframe>`,
                    "iframe",
                  )
                }
                className="w-full"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                {copyConfirmation === "iframe" ? "Copied!" : "Copy iFrame Code"}
              </Button>
            </TabsContent>

            <TabsContent value="script" className="space-y-4">
              <div className="bg-background/50 p-4 rounded-md border">
                <code className="text-sm break-all font-mono text-foreground">
                  {`<script src="${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/embed.js" data-code="${userCode}"></script>`}
                </code>
              </div>
              <Button
                onClick={() =>
                  handleCopy(
                    `<script src="${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/embed.js" data-code="${userCode}"></script>`,
                    "script",
                  )
                }
                className="w-full"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                {copyConfirmation === "script" ? "Copied!" : "Copy Script Code"}
              </Button>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <div className="bg-background/50 p-4 rounded-md border">
                <code className="text-sm break-all font-mono text-foreground">
                  {`GET ${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/api/testimonials/${userCode}`}
                </code>
              </div>
              <Button
                onClick={() =>
                  handleCopy(
                    `${process.env.NEXTAUTH_URL || "https://tellus.abhiramverse.tech"}/api/testimonials/${userCode}`,
                    "api",
                  )
                }
                className="w-full"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                {copyConfirmation === "api" ? "Copied!" : "Copy API Endpoint"}
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
