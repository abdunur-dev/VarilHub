"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Flame, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week")

  const leaderboardData = {
    week: [
      { rank: 1, name: "Alex Chen", points: 5200, badge: "👑", trend: "up", games: 24 },
      { rank: 2, name: "Jordan Smith", points: 4800, badge: "🥈", trend: "up", games: 22 },
      { rank: 3, name: "Casey Lee", points: 4200, badge: "🥉", trend: "down", games: 18 },
      { rank: 4, name: "Morgan Davis", points: 3900, badge: "🔥", trend: "up", games: 16 },
      { rank: 5, name: "Taylor Brown", points: 3600, badge: "⭐", trend: "stable", games: 14 },
      { rank: 6, name: "You", points: 2450, badge: "🎮", trend: "up", games: 12 },
      { rank: 7, name: "Riley Wilson", points: 2100, badge: "🚀", trend: "up", games: 10 },
      { rank: 8, name: "Sam Johnson", points: 1800, badge: "💫", trend: "down", games: 8 },
    ],
    month: [
      { rank: 1, name: "Alex Chen", points: 18500, badge: "👑", trend: "up", games: 85 },
      { rank: 2, name: "Jordan Smith", points: 17200, badge: "🥈", trend: "stable", games: 78 },
      { rank: 3, name: "Casey Lee", points: 15800, badge: "🥉", trend: "down", games: 72 },
      { rank: 4, name: "Morgan Davis", points: 14300, badge: "🔥", trend: "up", games: 65 },
      { rank: 5, name: "You", points: 8900, badge: "🎮", trend: "up", games: 42 },
    ],
    all: [
      { rank: 1, name: "Alex Chen", points: 125000, badge: "👑", trend: "stable", games: 450 },
      { rank: 2, name: "Jordan Smith", points: 118000, badge: "🥈", trend: "up", games: 420 },
      { rank: 3, name: "Casey Lee", points: 105000, badge: "🥉", trend: "down", games: 380 },
      { rank: 4, name: "Morgan Davis", points: 98000, badge: "🔥", trend: "up", games: 350 },
      { rank: 5, name: "You", points: 45000, badge: "🎮", trend: "up", games: 180 },
    ],
  }

  const data = leaderboardData[timeframe]

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
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Timeframe Tabs */}
        <div className="mb-6 flex gap-2">
          {(["week", "month", "all"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-full px-4 py-2 font-semibold transition-colors ${
                timeframe === tf
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              {tf === "week" ? "This Week" : tf === "month" ? "This Month" : "All Time"}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {data.length >= 3 && (
          <div className="mb-8 grid grid-cols-3 gap-3">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 h-20 w-16 rounded-lg bg-gradient-to-b from-slate-700 to-slate-800 flex items-end justify-center border-2 border-slate-600">
                <div className="text-2xl">{data[1].badge}</div>
              </div>
              <p className="text-sm font-bold text-white">{data[1].name}</p>
              <p className="text-xs text-slate-400">{data[1].points.toLocaleString()}</p>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 h-24 w-16 rounded-lg bg-gradient-to-b from-yellow-500 to-yellow-600 flex items-end justify-center border-2 border-yellow-400">
                <div className="text-3xl">{data[0].badge}</div>
              </div>
              <p className="text-sm font-bold text-white">{data[0].name}</p>
              <p className="text-xs text-yellow-400 font-semibold">{data[0].points.toLocaleString()}</p>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 h-16 w-16 rounded-lg bg-gradient-to-b from-orange-600 to-orange-700 flex items-end justify-center border-2 border-orange-500">
                <div className="text-2xl">{data[2].badge}</div>
              </div>
              <p className="text-sm font-bold text-white">{data[2].name}</p>
              <p className="text-xs text-slate-400">{data[2].points.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="space-y-2">
          {data.map((player, index) => (
            <Card
              key={player.rank}
              className={`border-purple-500/30 p-4 flex items-center justify-between ${
                player.name === "You"
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                  : "bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 text-center">
                  <span className="text-lg font-bold text-slate-400">#{player.rank}</span>
                </div>
                <div className="text-2xl">{player.badge}</div>
                <div className="flex-1">
                  <p className={`font-semibold ${player.name === "You" ? "text-pink-400" : "text-white"}`}>
                    {player.name}
                  </p>
                  <p className="text-xs text-slate-400">{player.games} games</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {player.trend === "up" && <TrendingUp className="h-4 w-4 text-green-400" />}
                {player.trend === "down" && <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />}
                {player.trend === "stable" && <Flame className="h-4 w-4 text-yellow-400" />}
                <span className="font-bold text-yellow-400 w-20 text-right">{player.points.toLocaleString()}</span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
