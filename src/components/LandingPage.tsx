"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, MessageCircle, Code2Icon } from 'lucide-react'
import logo from "@/assets/logo.png"
import { useRouter } from 'next/navigation'
import { Navbar } from './Navbar'

export function LandingPage() {
  const router = useRouter()

  return (
    <div className=" bg-gradient-to-b from-lightBlue to-white">
      <Navbar />
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="relative pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-tr from-darkGray to-mediumGray p-[2px] ">
              <Image 
                src={logo} 
                alt="Tellus Logo" 
                className="h-full w-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-darkGray sm:text-6xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-darkGray to-mediumGray bg-clip-text text-transparent">
                Tellus
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-mediumGray max-w-2xl">
              The Pulse of Customer Experience - Empower your business with real-time customer insights
              and drive continuous improvement through meaningful feedback.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                size="lg" 
                className="group"
                onClick={() => router.push('/api/auth/signin')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl bg-white/50 backdrop-blur-sm p-8 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl">
              <div className="rounded-full bg-darkGray p-3 text-white">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-darkGray">Collect Feedback</h2>
              <p className="mt-2 text-center text-mediumGray">
                Easily gather customer feedback through forms.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/50 backdrop-blur-sm p-8 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl">
              <div className="rounded-full bg-darkGray p-3 text-white">
                <Star className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-darkGray">Track Satisfaction</h2>
              <p className="mt-2 text-center text-mediumGray">
                Monitor customer satisfaction scores and identify trends over time.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/50 backdrop-blur-sm p-8 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="rounded-full bg-darkGray p-3 text-white">
                <Code2Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-darkGray">Embedded Code</h2>
              <p className="mt-2 text-center text-mediumGray">
                

Obtain the embedded code and effortlessly update testimonials on your end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

