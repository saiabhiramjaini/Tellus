"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-darkGray text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Tellus
            </Link>
          </div>
          <div className="hidden md:block"></div>
          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{session.user?.name}</span>
                <Button onClick={() => signOut()} variant="secondary">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => signIn("google")} variant="secondary">
                Sign in with Google
              </Button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-mediumGray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-mediumGray">
            {session ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={session.user?.image || ""}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">
                    {session.user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {session.user?.email}
                  </div>
                </div>
                <Button
                  onClick={() => signOut()}
                  variant="secondary"
                  className="ml-auto"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="px-5">
                <Button
                  onClick={() => signIn("google")}
                  variant="secondary"
                  className="w-full"
                >
                  Sign in with Google
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
