"use client"

import { useState, useEffect, useCallback } from "react"
import { type GameProgress, initialGameState, calculateLevel, getEarnedAchievements } from "@/lib/game-state"

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(initialGameState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gameProgress")
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch (e) {
        console.log("[v0] Failed to load game progress")
      }
    }
  }, [])

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem("gameProgress", JSON.stringify(progress))
  }, [progress])

  const updateGameScore = useCallback((gameName: string, score: number, pointsEarned: number) => {
    setProgress((prev) => {
      const newStats = { ...prev.gameStats }
      newStats[gameName] = {
        plays: (newStats[gameName]?.plays || 0) + 1,
        bestScore: Math.max(newStats[gameName]?.bestScore || 0, score),
      }

      const newPoints = prev.totalPoints + pointsEarned
      const newLevel = calculateLevel(newPoints)

      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        totalPoints: newPoints,
        level: newLevel,
        gameStats: newStats,
        achievements: getEarnedAchievements({
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          totalPoints: newPoints,
          level: newLevel,
          gameStats: newStats,
        }),
      }
    })
  }, [])

  return { progress, updateGameScore }
}
