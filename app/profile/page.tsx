"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Share2, Trophy, Settings } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import RealTimeBadge from "@/components/real-time-badge"
import SocialShareModal from "@/components/social-share-modal"
import { useGameProgress } from "@/hooks/use-game-progress"
import { getEarnedAchievements } from "@/lib/game-state"

export default function ProfilePage() {
  const { progress } = useGameProgress()
  const [showShare, setShowShare] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const earnedAchievements = getEarnedAchievements(progress)

  const allAchievements = [
    { id: 1, name: "First Game", description: "Play your first game", icon: "🎮", key: "First Game" },
    { id: 2, name: "Quiz Master", description: "Complete 5 quizzes", icon: "🧠", key: "Quiz Master" },
    { id: 3, name: "Prediction Pro", description: "Get 3 predictions right", icon: "🔮", key: "Prediction Pro" },
    { id: 4, name: "Point Collector", description: "Earn 1000 points", icon: "💰", key: "Point Collector" },
    { id: 5, name: "Perfect Score", description: "Get 95%+ on any game", icon: "⭐", key: "Perfect Score" },
    { id: 6, name: "Viral Sensation", description: "Share your results", icon: "🚀", key: "Viral Sensation" },
  ]

  const nextLevelPoints = progress.level * 500
  const currentLevelPoints = (progress.level - 1) * 500
  const progressPercent = ((progress.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
            <Link href="/settings" className="text-slate-400 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Profile Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 text-white animate-slide-up shadow-lg shadow-purple-500/20">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-float">🎮</div>
              <div>
                <h1 className="text-2xl font-bold">Player</h1>
                <p className="text-sm opacity-90">
                  Level {progress.level} • {progress.gamesPlayed} games played
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="animate-bounce-in" style={{ animationDelay: "0s" }}>
              <p className="text-xs opacity-75">Level</p>
              <p className={`text-2xl font-bold transition-all ${isUpdating ? "scale-110" : "scale-100"}`}>
                {progress.level}
              </p>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: "0.1s" }}>
              <p className="text-xs opacity-75">Games Played</p>
              <p className={`text-2xl font-bold transition-all ${isUpdating ? "scale-110" : "scale-100"}`}>
                {progress.gamesPlayed}
              </p>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-xs opacity-75">Total Points</p>
              <p className={`text-2xl font-bold transition-all ${isUpdating ? "scale-110" : "scale-100"}`}>
                {progress.totalPoints}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <RealTimeBadge value={progress.totalPoints} label="Total Points" isUpdating={isUpdating} />
          <Card className="border-purple-500/30 bg-slate-800/50 p-3 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-slate-400">Rank</span>
            </div>
            <p className="text-2xl font-bold text-white">#{Math.floor(Math.random() * 100) + 1}</p>
          </Card>
        </div>

        {/* Game Statistics */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">Game Statistics</h2>
          <div className="space-y-3">
            {Object.entries(progress.gameStats).map(([gameName, stats], index) => (
              <Card
                key={gameName}
                className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up hover:bg-slate-800/70 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {gameName === "Compatibility Quiz" && "💕"}
                      {gameName === "Prediction Game" && "🔮"}
                      {gameName === "Memory Game" && "🧠"}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{gameName}</p>
                      <p className="text-xs text-slate-400">{stats.plays} plays</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Best Score</p>
                    <p className="text-lg font-bold text-green-400">{stats.bestScore}%</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">
            Achievements ({earnedAchievements.length}/{allAchievements.length})
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {allAchievements.map((achievement, index) => {
              const isUnlocked = earnedAchievements.includes(achievement.key)
              return (
                <Card
                  key={achievement.id}
                  className={`border-purple-500/30 p-4 text-center transition-all hover:scale-105 animate-bounce-in ${
                    isUnlocked ? "bg-slate-800/50 hover:bg-slate-800/70" : "bg-slate-900/50 opacity-50"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="mb-2 text-3xl">{achievement.icon}</div>
                  <p className="text-xs font-semibold text-white">{achievement.name}</p>
                  <p className="text-xs text-slate-400">{achievement.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">Level Progress</h2>
          <Card className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Level {progress.level} → Level {progress.level + 1}
              </span>
              <span className="text-sm font-semibold text-white">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-shimmer transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              {progress.totalPoints} / {nextLevelPoints} points needed
            </p>
          </Card>
        </div>
      </main>

      <SocialShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title="My Profile"
        message={`I'm level ${progress.level} with ${progress.totalPoints} points!`}
      />
    </div>
  )
}
