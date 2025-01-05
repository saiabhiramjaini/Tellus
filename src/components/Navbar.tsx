"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <Link href="/" className="text-xl font-bold">
        Tellus
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/feedbacks" className="hover:underline">
          Feedbacks
        </Link>
        {session ? (
          <>
            <span>{session.user?.name}</span>
            <Button onClick={() => signOut()} variant="secondary">Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={() => signIn("google")} variant="secondary">Login</Button>
            <Button onClick={() => signIn("google")} variant="outline">Sign Up</Button>
          </>
        )}
      </div>
    </nav>
  )
}
