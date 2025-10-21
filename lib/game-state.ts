export interface GameProgress {
  gamesPlayed: number
  totalPoints: number
  level: number
  achievements: string[]
  gameStats: Record<string, { plays: number; bestScore: number }>
}

// Initialize with level 1 and no achievements
export const initialGameState: GameProgress = {
  gamesPlayed: 0,
  totalPoints: 0,
  level: 1,
  achievements: [],
  gameStats: {
    "Compatibility Quiz": { plays: 0, bestScore: 0 },
    "Prediction Game": { plays: 0, bestScore: 0 },
    "Memory Game": { plays: 0, bestScore: 0 },
  },
}

// Calculate level based on points
export const calculateLevel = (points: number): number => {
  return Math.floor(points / 500) + 1
}

// Get earned achievements based on progress
export const getEarnedAchievements = (progress: GameProgress): string[] => {
  const earned: string[] = []

  if (progress.gamesPlayed >= 1) earned.push("First Game")
  if ((progress.gameStats["Compatibility Quiz"]?.plays || 0) >= 5) earned.push("Quiz Master")
  if ((progress.gameStats["Prediction Game"]?.plays || 0) >= 3) earned.push("Prediction Pro")
  if (progress.totalPoints >= 1000) earned.push("Point Collector")
  if (Math.max(...Object.values(progress.gameStats).map((s) => s.bestScore)) >= 95) earned.push("Perfect Score")

  return earned
}
