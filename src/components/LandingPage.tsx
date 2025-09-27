"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, MessageCircle, Code2Icon } from "lucide-react"
import logo from "@/assets/logo.png"
import { useRouter } from "next/navigation"
import { Navbar } from "./Navbar"
import { motion } from "framer-motion"

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-tr from-accent/20 to-accent/5 p-[2px] mb-8">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Tellus Logo"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-6">
                The complete platform to{" "}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  collect feedback
                </span>
              </h1>

              <p className="text-xl leading-8 text-muted-foreground max-w-3xl mb-10">
                Your team's toolkit to stop configuring and start innovating. Securely collect, analyze, and showcase
                customer feedback with embedded testimonials.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="group bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => router.push("/api/auth/signin")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-card bg-transparent">
                  View Demo
                </Button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { metric: "98%", label: "faster time to market", company: "Netflix" },
                { metric: "300%", label: "increase in feedback", company: "Spotify" },
                { metric: "6x", label: "faster to deploy", company: "Airbnb" },
                { metric: "20 days", label: "saved on setup", company: "Uber" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all"
                >
                  <div className="text-2xl font-bold text-accent mb-2">{stat.metric}</div>
                  <div className="text-sm text-muted-foreground mb-3">{stat.label}</div>
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider">{stat.company}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Make feedback collection seamless</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tools for your team and customers to share feedback and iterate faster.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                {
                  icon: MessageCircle,
                  title: "Collect Feedback",
                  description: "Easily gather customer feedback through customizable forms and embedded widgets.",
                },
                {
                  icon: Star,
                  title: "Track Satisfaction",
                  description: "Monitor customer satisfaction scores and identify trends with powerful analytics.",
                },
                {
                  icon: Code2Icon,
                  title: "Embed Anywhere",
                  description: "Get embeddable code to showcase testimonials seamlessly on your website.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex flex-col items-center rounded-2xl bg-card/30 backdrop-blur-sm p-8 border border-border/50 hover:bg-card/50 transition-all group"
                >
                  <div className="rounded-full bg-accent/10 p-4 text-accent group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-center text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
