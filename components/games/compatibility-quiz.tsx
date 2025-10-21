"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Share2 } from "lucide-react"

interface CompatibilityQuizProps {
  onBack: () => void
}

const questions = [
  {
    id: 1,
    question: "What's your ideal weekend?",
    answers: [
      { text: "Party with friends", type: "social" },
      { text: "Cozy night in", type: "homebody" },
      { text: "Adventure outdoors", type: "adventurous" },
      { text: "Creative project", type: "creative" },
    ],
  },
  {
    id: 2,
    question: "How do you handle stress?",
    answers: [
      { text: "Talk it out", type: "social" },
      { text: "Take time alone", type: "homebody" },
      { text: "Exercise", type: "adventurous" },
      { text: "Create something", type: "creative" },
    ],
  },
  {
    id: 3,
    question: "Your love language is?",
    answers: [
      { text: "Quality time", type: "social" },
      { text: "Acts of service", type: "homebody" },
      { text: "Physical touch", type: "adventurous" },
      { text: "Words of affirmation", type: "creative" },
    ],
  },
  {
    id: 4,
    question: "What attracts you most?",
    answers: [
      { text: "Charisma", type: "social" },
      { text: "Loyalty", type: "homebody" },
      { text: "Confidence", type: "adventurous" },
      { text: "Intelligence", type: "creative" },
    ],
  },
  {
    id: 5,
    question: "Your ideal date is?",
    answers: [
      { text: "Group hangout", type: "social" },
      { text: "Dinner at home", type: "homebody" },
      { text: "Hiking or sports", type: "adventurous" },
      { text: "Museum or concert", type: "creative" },
    ],
  },
]

const results = {
  social: {
    title: "The Social Butterfly",
    description:
      "You're outgoing, charismatic, and love being around people. You thrive in social settings and make friends easily.",
    color: "from-pink-500 to-rose-500",
    emoji: "🦋",
  },
  homebody: {
    title: "The Cozy Companion",
    description:
      "You value deep connections and meaningful time with loved ones. You're loyal, thoughtful, and create a warm atmosphere.",
    color: "from-purple-500 to-indigo-500",
    emoji: "🏠",
  },
  adventurous: {
    title: "The Bold Explorer",
    description:
      "You're daring, energetic, and always up for new experiences. You inspire others with your confidence and enthusiasm.",
    color: "from-blue-500 to-cyan-500",
    emoji: "🚀",
  },
  creative: {
    title: "The Creative Soul",
    description:
      "You're imaginative, thoughtful, and see the world differently. You inspire through your unique perspective and ideas.",
    color: "from-yellow-500 to-orange-500",
    emoji: "🎨",
  },
}

export default function CompatibilityQuiz({ onBack }: CompatibilityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ social: 0, homebody: 0, adventurous: 0, creative: 0 })
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (type: string) => {
    setScores((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1,
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    const resultType = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as keyof typeof results
    const result = results[resultType]

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
          <div className={`rounded-2xl bg-gradient-to-r ${result.color} p-8 text-white text-center mb-6`}>
            <div className="mb-4 text-6xl">{result.emoji}</div>
            <h2 className="mb-2 text-3xl font-bold">{result.title}</h2>
            <p className="mb-6 text-sm opacity-90">{result.description}</p>
            <div className="flex gap-3 justify-center">
              <button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors">
                <Share2 className="h-4 w-4" />
                Share Result
              </button>
              <button
                onClick={onBack}
                className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>

          <Card className="border-purple-500/30 bg-slate-800/50 p-6">
            <h3 className="mb-4 font-bold text-white">Your Scores</h3>
            <div className="space-y-3">
              {Object.entries(scores).map(([key, value]) => (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="capitalize text-slate-300">{key}</span>
                    <span className="font-semibold text-white">{value}/5</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                      style={{ width: `${(value / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-6 rounded-2xl bg-slate-800/50 border border-purple-500/30 p-4 text-center">
            <p className="text-sm text-slate-400 mb-2">Quiz Complete!</p>
            <p className="text-2xl font-bold text-yellow-400">+100 Points</p>
          </div>
        </main>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

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
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-8">
          <p className="text-sm text-slate-400 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="text-2xl font-bold text-white">{questions[currentQuestion].question}</h2>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer.type)}
              className="w-full rounded-xl border border-purple-500/30 bg-slate-800/50 p-4 text-left text-white hover:bg-slate-800 hover:border-purple-500/50 transition-all"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
