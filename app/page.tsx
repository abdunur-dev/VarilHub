"use client"

import { useState, useEffect } from "react"
import { Sparkles, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import GameCard from "@/components/game-card"
import ToolCard from "@/components/tool-card"
import RealTimeBadge from "@/components/real-time-badge"
import Link from "next/link"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [userStats, setUserStats] = useState({
    points: 2450,
    level: 5,
    gamesPlayed: 12,
    followers: 342,
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [liveLeaderboard, setLiveLeaderboard] = useState([
    { rank: 1, name: "Alex", points: 5200, badge: "👑", trend: "↑" },
    { rank: 2, name: "Jordan", points: 4800, badge: "🥈", trend: "→" },
    { rank: 3, name: "Casey", points: 4200, badge: "🥉", trend: "↓" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      // Simulate real-time updates
      setUserStats((prev) => ({
        ...prev,
        points: prev.points + Math.floor(Math.random() * 50),
        followers: prev.followers + Math.floor(Math.random() * 3),
      }))
      setTimeout(() => setIsUpdating(false), 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-slide-up">
              <Sparkles className="h-6 w-6 text-pink-500 animate-float" />
              <h1 className="text-xl font-bold text-white">ViralHub</h1>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 border border-purple-500/30 transition-all ${isUpdating ? "animate-pulse-glow" : ""}`}
            >
              <Activity className="h-4 w-4 text-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-white">{userStats.points}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white animate-slide-up shadow-lg shadow-purple-500/20">
          <h2 className="mb-2 text-2xl font-bold">Welcome Back!</h2>
          <p className="mb-4 text-sm opacity-90">
            Level {userStats.level} • {userStats.gamesPlayed} games played • {userStats.followers} followers
          </p>
          <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-yellow-300 to-white animate-shimmer"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <RealTimeBadge value={userStats.followers} label="Followers" isUpdating={isUpdating} />
          <RealTimeBadge value={2} label="Trending Rank" isUpdating={isUpdating} />
        </div>

        {/* Games Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Play Games</h3>
            <Link href="/games" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <GameCard
                title="Compatibility Quiz"
                description="Find your perfect match"
                icon="💕"
                color="from-pink-500 to-rose-500"
                points={100}
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <GameCard
                title="Prediction Game"
                description="Guess the next trend"
                icon="🔮"
                color="from-purple-500 to-indigo-500"
                points={150}
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <GameCard
                title="Quick Trivia"
                description="Test your knowledge"
                icon="🧠"
                color="from-blue-500 to-cyan-500"
                points={75}
              />
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Explore Tools</h3>
            <Link href="/tools" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <ToolCard title="Personality Test" description="Discover your vibe" icon="✨" />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <ToolCard title="Trend Analyzer" description="See what's trending" icon="📊" />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <ToolCard title="Social Pulse" description="Check community vibes" icon="💫" />
            </div>
          </div>
        </div>

        {/* Live Leaderboard Preview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Top Players</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400 border border-green-500/30">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                Live
              </span>
            </div>
            <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </Link>
          </div>
          <Card className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up">
            <div className="space-y-3">
              {liveLeaderboard.map((player, index) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{player.badge}</span>
                    <div>
                      <p className="font-semibold text-white">{player.name}</p>
                      <p className="text-xs text-slate-400">#{player.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-400">{player.points}</p>
                    <p
                      className={`text-xs font-semibold ${player.trend === "↑" ? "text-green-400" : player.trend === "↓" ? "text-red-400" : "text-slate-400"}`}
                    >
                      {player.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
