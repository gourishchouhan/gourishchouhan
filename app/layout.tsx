import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gourish Chouhan - Software Product Engineer",
  description:
    "Passionate full-stack developer specializing in scalable web applications and clean, responsive user interfaces using modern technologies like React, Node.js, and the MERN stack.",
  keywords:
    "software engineer, full-stack developer, React, Node.js, MERN stack, web development, JavaScript, TypeScript",
  authors: [{ name: "Gourish Chouhan" }],
  creator: "Gourish Chouhan",
  openGraph: {
    title: "Gourish Chouhan - Software Product Engineer",
    description:
      "Passionate full-stack developer specializing in scalable web applications and clean, responsive user interfaces.",
    url: "https://gourishchouhan.dev",
    siteName: "Gourish Chouhan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourish Chouhan - Software Product Engineer",
    description:
      "Passionate full-stack developer specializing in scalable web applications and clean, responsive user interfaces.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
