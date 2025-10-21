"use client"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import SocialShareModal from "@/components/social-share-modal"
import { useGameProgress } from "@/hooks/use-game-progress"

interface MemoryGameProps {
  onBack: () => void
}

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const { updateGameScore } = useGameProgress()
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showShare, setShowShare] = useState(false)

  const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎬", "🎤"]

  // Initialize game
  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
    setCards(shuffled)
  }, [])

  // Check for matches
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 600)
      }
      setMoves(moves + 1)
    }
  }, [flipped])

  // Check for game over
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true)
      const score = Math.max(0, 100 - moves * 2)
      updateGameScore("Memory Game", score, Math.floor(score / 10) * 10)
    }
  }, [matched, cards.length, moves, updateGameScore])

  const handleCardClick = (id: number) => {
    if (!gameOver && !flipped.includes(id) && !matched.includes(id) && flipped.length < 2) {
      setFlipped([...flipped, id])
    }
  }

  const score = Math.max(0, 100 - moves * 2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 text-center animate-slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">Memory Game</h1>
          <p className="text-slate-400">Match all pairs to win!</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 animate-slide-up">
          <Card className="border-purple-500/30 bg-slate-800/50 p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">Moves</p>
            <p className="text-2xl font-bold text-white">{moves}</p>
          </Card>
          <Card className="border-purple-500/30 bg-slate-800/50 p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">Score</p>
            <p className="text-2xl font-bold text-green-400">{score}</p>
          </Card>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-3 animate-slide-up">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg font-bold text-2xl transition-all duration-300 transform ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-100"
                  : "bg-slate-800 hover:bg-slate-700 scale-95 hover:scale-100"
              } ${matched.includes(card.id) ? "opacity-50" : ""}`}
              disabled={gameOver}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : "?"}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white text-center animate-bounce-in">
            <h2 className="text-2xl font-bold mb-2">You Won!</h2>
            <p className="mb-4">
              Completed in {moves} moves with a score of {score}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded-lg bg-white/20 py-2 font-semibold hover:bg-white/30 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => setShowShare(true)}
                className="flex-1 rounded-lg bg-white/20 py-2 font-semibold hover:bg-white/30 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </main>

      <SocialShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title="Memory Game"
        message={`I completed the memory game in ${moves} moves!`}
        score={score}
      />
    </div>
  )
}
