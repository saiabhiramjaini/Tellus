"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from "@/assets/logo.png"
import google from "@/assets/google.png"
import { motion } from "framer-motion"

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
              <div className="flex items-center justify-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-tr from-accent/20 to-accent/5 p-[1px]">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">Tellus</div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          <div className="hidden md:block">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent/10">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-accent/20 text-accent">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border-border" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-foreground hover:bg-accent/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => signIn("google")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={google || "/placeholder.svg"}
                    alt="Google"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <div>Sign in with Google</div>
                </div>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-accent/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card/95 backdrop-blur-md border-t border-border/50"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-foreground hover:bg-accent/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
          {session ? (
            <div className="pt-4 pb-3 border-t border-border/50">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-accent/20 text-accent">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">{session.user?.name}</div>
                  <div className="text-sm font-medium text-muted-foreground">{session.user?.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <Button onClick={() => signOut()} className="w-full justify-start hover:bg-accent/10" variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Button
                onClick={() => signIn("google")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={google || "/placeholder.svg"}
                    alt="Google"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <div>Sign in with Google</div>
                </div>
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  )
}