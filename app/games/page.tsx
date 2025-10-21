"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CompatibilityQuiz from "@/components/games/compatibility-quiz"
import PredictionGame from "@/components/games/prediction-game"
import MemoryGame from "@/components/games/memory-game"

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  if (selectedGame === "compatibility") {
    return <CompatibilityQuiz onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "prediction") {
    return <PredictionGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "memory") {
    return <MemoryGame onBack={() => setSelectedGame(null)} />
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
        <h1 className="mb-2 text-3xl font-bold text-white">Play Games</h1>
        <p className="mb-8 text-slate-400">Earn points and climb the leaderboard</p>

        <div className="space-y-4">
          <button
            onClick={() => setSelectedGame("compatibility")}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-left text-white hover:shadow-lg transition-shadow hover:scale-105 transform duration-300"
          >
            <div className="mb-2 text-4xl">💕</div>
            <h3 className="mb-1 text-xl font-bold">Compatibility Quiz</h3>
            <p className="mb-4 text-sm opacity-90">Find your perfect match with our fun quiz</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">+100 pts</span>
              <span className="text-sm">5 min</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedGame("prediction")}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-left text-white hover:shadow-lg transition-shadow hover:scale-105 transform duration-300"
          >
            <div className="mb-2 text-4xl">🔮</div>
            <h3 className="mb-1 text-xl font-bold">Prediction Game</h3>
            <p className="mb-4 text-sm opacity-90">Guess the next viral trend and earn big</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">+150 pts</span>
              <span className="text-sm">3 min</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedGame("memory")}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-left text-white hover:shadow-lg transition-shadow hover:scale-105 transform duration-300"
          >
            <div className="mb-2 text-4xl">🧠</div>
            <h3 className="mb-1 text-xl font-bold">Memory Game</h3>
            <p className="mb-4 text-sm opacity-90">Match pairs and test your memory skills</p>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">+75 pts</span>
              <span className="text-sm">2 min</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}
