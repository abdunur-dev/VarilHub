"use client"

import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import SocialFeed from "@/components/social-feed"

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-bold text-white">Social Feed</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <SocialFeed />
      </main>
    </div>
  )
}
