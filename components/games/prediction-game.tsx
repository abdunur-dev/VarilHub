"use client"

import { useState } from "react"
import { ArrowLeft, Share2 } from "lucide-react"

interface PredictionGameProps {
  onBack: () => void
}

const predictions = [
  {
    id: 1,
    trend: "AI-generated art",
    options: ["Will go mainstream", "Will fade away", "Will stay niche", "Will be banned"],
    correct: 0,
  },
  {
    id: 2,
    trend: "Short-form video content",
    options: ["Become even shorter", "Merge with long-form", "Decline", "Stay the same"],
    correct: 1,
  },
  {
    id: 3,
    trend: "Metaverse gaming",
    options: ["Explode in popularity", "Remain experimental", "Disappear", "Become mainstream"],
    correct: 1,
  },
]

export default function PredictionGame({ onBack }: PredictionGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setAnswered(true)

    if (index === predictions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < predictions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    const percentage = Math.round((score / predictions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
        <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
          <div className="mx-auto max-w-2xl px-4 py-4">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white text-center mb-6">
            <div className="mb-4 text-6xl">🔮</div>
            <h2 className="mb-2 text-3xl font-bold">Game Complete!</h2>
            <p className="mb-6 text-4xl font-bold">{percentage}%</p>
            <p className="mb-6 text-sm opacity-90">
              You predicted {score} out of {predictions.length} trends correctly
            </p>
            <div className="flex gap-3 justify-center">
              <button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors">
                <Share2 className="h-4 w-4" />
                Share Score
              </button>
              <button
                onClick={onBack}
                className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/50 border border-purple-500/30 p-4 text-center">
            <p className="text-sm text-slate-400 mb-2">Reward</p>
            <p className="text-2xl font-bold text-yellow-400">+{Math.round(percentage * 1.5)} Points</p>
          </div>
        </main>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / predictions.length) * 100
  const currentPrediction = predictions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="h-1 w-full rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-8">
          <p className="text-sm text-slate-400 mb-2">
            Question {currentQuestion + 1} of {predictions.length}
          </p>
          <h2 className="text-2xl font-bold text-white">What will happen to {currentPrediction.trend}?</h2>
        </div>

        <div className="space-y-3 mb-6">
          {currentPrediction.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !answered && handleAnswer(index)}
              disabled={answered}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                selectedAnswer === index
                  ? index === currentPrediction.correct
                    ? "border-green-500 bg-green-500/20 text-white"
                    : "border-red-500 bg-red-500/20 text-white"
                  : answered && index === currentPrediction.correct
                    ? "border-green-500 bg-green-500/20 text-white"
                    : "border-purple-500/30 bg-slate-800/50 text-white hover:bg-slate-800 hover:border-purple-500/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {answered && index === currentPrediction.correct && <span className="text-lg">✓</span>}
                {answered && selectedAnswer === index && index !== currentPrediction.correct && (
                  <span className="text-lg">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 py-3 font-semibold text-white hover:shadow-lg transition-shadow"
          >
            {currentQuestion === predictions.length - 1 ? "See Results" : "Next Question"}
          </button>
        )}
      </main>
    </div>
  )
}
