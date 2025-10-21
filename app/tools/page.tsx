"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PersonalityTest from "@/components/tools/personality-test"
import TrendAnalyzer from "@/components/tools/trend-analyzer"

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  if (selectedTool === "personality") {
    return <PersonalityTest onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === "trends") {
    return <TrendAnalyzer onBack={() => setSelectedTool(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="mb-2 text-3xl font-bold text-white">Explore Tools</h1>
        <p className="mb-8 text-slate-400">Discover insights and trends</p>

        <div className="space-y-4">
          <button
            onClick={() => setSelectedTool("personality")}
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-left text-white hover:shadow-lg transition-shadow"
          >
            <div className="mb-2 text-4xl">✨</div>
            <h3 className="mb-1 text-xl font-bold">Personality Test</h3>
            <p className="mb-4 text-sm opacity-90">Discover your unique personality type and vibe</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">Free</span>
              <span className="text-sm">10 min</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedTool("trends")}
            className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 p-6 text-left text-white hover:shadow-lg transition-shadow"
          >
            <div className="mb-2 text-4xl">📊</div>
            <h3 className="mb-1 text-xl font-bold">Trend Analyzer</h3>
            <p className="mb-4 text-sm opacity-90">Analyze what's trending in real-time</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">Live Data</span>
              <span className="text-sm">5 min</span>
            </div>
          </button>

          <button className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-left text-white hover:shadow-lg transition-shadow opacity-50 cursor-not-allowed">
            <div className="mb-2 text-4xl">💬</div>
            <h3 className="mb-1 text-xl font-bold">Social Pulse</h3>
            <p className="mb-4 text-sm opacity-90">Coming soon</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">Beta</span>
              <span className="text-sm">Soon</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}
