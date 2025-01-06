import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"

export default async function HomePage() {
  const session = await getServerSession()
  if(session){
    redirect("/home")
  }
  return (
    <div className="min-h-screen bg-lightBlue flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-darkGray p-8 flex items-center justify-center">
            <Image src={logo} alt="Tellus Logo" width={150} height={150} className="h-48 w-auto" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-mediumGray font-semibold">Welcome to</div>
            <h1 className="mt-2 text-4xl font-bold text-darkGray">Tellus</h1>
            <p className="mt-2 text-xl text-mediumGray">The Pulse of Customer Experience</p>
            <p className="mt-4 text-mediumGray">Empower your business with real-time customer insights. Tellus helps you collect, analyze, and act on customer feedback to drive continuous improvement.</p>
            <div className="mt-6">
              <Button size="lg">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

