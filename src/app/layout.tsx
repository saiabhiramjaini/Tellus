import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Tellus",
  description: "The Pulse of Customer Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Providers>
          <main className="">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
