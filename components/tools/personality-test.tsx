"use client"

import { useState } from "react"
import { ArrowLeft, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface PersonalityTestProps {
  onBack: () => void
}

const personalityQuestions = [
  {
    id: 1,
    question: "In social situations, you tend to be...",
    answers: [
      { text: "The center of attention", type: "extrovert" },
      { text: "Observing from the sidelines", type: "introvert" },
      { text: "Balanced between both", type: "ambivert" },
    ],
  },
  {
    id: 2,
    question: "When making decisions, you rely on...",
    answers: [
      { text: "Logic and facts", type: "thinker" },
      { text: "Feelings and intuition", type: "feeler" },
      { text: "A mix of both", type: "balanced" },
    ],
  },
  {
    id: 3,
    question: "You prefer to...",
    answers: [
      { text: "Plan everything in advance", type: "planner" },
      { text: "Go with the flow", type: "spontaneous" },
      { text: "Adapt as needed", type: "flexible" },
    ],
  },
  {
    id: 4,
    question: "Your energy comes from...",
    answers: [
      { text: "Interacting with others", type: "extrovert" },
      { text: "Alone time and reflection", type: "introvert" },
      { text: "Both equally", type: "ambivert" },
    ],
  },
  {
    id: 5,
    question: "When facing challenges, you...",
    answers: [
      { text: "Seek advice from others", type: "collaborative" },
      { text: "Work through it alone", type: "independent" },
      { text: "Evaluate both options", type: "balanced" },
    ],
  },
]

const personalityTypes = {
  extrovert: {
    title: "The Extrovert",
    description:
      "You're energized by social interaction and love being in the spotlight. You're charismatic, outgoing, and inspire others with your enthusiasm.",
    color: "from-yellow-500 to-orange-500",
    emoji: "🌟",
    traits: ["Charismatic", "Outgoing", "Enthusiastic", "Social", "Confident"],
  },
  introvert: {
    title: "The Introvert",
    description:
      "You recharge through quiet reflection and deep connections. You're thoughtful, observant, and bring depth to conversations.",
    color: "from-blue-500 to-indigo-500",
    emoji: "🌙",
    traits: ["Thoughtful", "Observant", "Deep", "Reflective", "Authentic"],
  },
  ambivert: {
    title: "The Ambivert",
    description:
      "You balance social energy with introspection. You're adaptable, versatile, and can thrive in any social setting.",
    color: "from-purple-500 to-pink-500",
    emoji: "⚡",
    traits: ["Adaptable", "Balanced", "Versatile", "Flexible", "Intuitive"],
  },
  thinker: {
    title: "The Thinker",
    description: "You approach life with logic and analysis. You're strategic, rational, and excel at problem-solving.",
    color: "from-cyan-500 to-blue-500",
    emoji: "🧠",
    traits: ["Logical", "Analytical", "Strategic", "Rational", "Objective"],
  },
  feeler: {
    title: "The Feeler",
    description:
      "You lead with your heart and emotions. You're empathetic, compassionate, and deeply connected to others.",
    color: "from-pink-500 to-rose-500",
    emoji: "💖",
    traits: ["Empathetic", "Compassionate", "Intuitive", "Caring", "Authentic"],
  },
  balanced: {
    title: "The Balanced",
    description:
      "You integrate both logic and emotion seamlessly. You're wise, grounded, and bring harmony to situations.",
    color: "from-green-500 to-teal-500",
    emoji: "🌿",
    traits: ["Balanced", "Wise", "Grounded", "Harmonious", "Integrated"],
  },
  planner: {
    title: "The Planner",
    description: "You thrive with structure and organization. You're reliable, methodical, and always prepared.",
    color: "from-orange-500 to-yellow-500",
    emoji: "📋",
    traits: ["Organized", "Reliable", "Methodical", "Prepared", "Structured"],
  },
  spontaneous: {
    title: "The Spontaneous",
    description: "You embrace adventure and live in the moment. You're creative, flexible, and full of surprises.",
    color: "from-red-500 to-pink-500",
    emoji: "🎉",
    traits: ["Creative", "Flexible", "Adventurous", "Spontaneous", "Fun"],
  },
  collaborative: {
    title: "The Collaborator",
    description: "You thrive in team environments and value others' input. You're a great listener and team player.",
    color: "from-blue-500 to-cyan-500",
    emoji: "🤝",
    traits: ["Collaborative", "Listener", "Team Player", "Supportive", "Connected"],
  },
  independent: {
    title: "The Independent",
    description:
      "You're self-reliant and confident in your abilities. You're resourceful, determined, and self-driven.",
    color: "from-purple-500 to-indigo-500",
    emoji: "🦅",
    traits: ["Self-reliant", "Resourceful", "Determined", "Independent", "Confident"],
  },
  flexible: {
    title: "The Flexible",
    description: "You adapt easily to change and different situations. You're resilient, open-minded, and pragmatic.",
    color: "from-teal-500 to-green-500",
    emoji: "🌊",
    traits: ["Adaptable", "Resilient", "Open-minded", "Pragmatic", "Flexible"],
  },
}

export default function PersonalityTest({ onBack }: PersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (type: string) => {
    setScores((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }))

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    const resultType = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    )[0] as keyof typeof personalityTypes
    const result = personalityTypes[resultType]

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
            <button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors mx-auto">
              <Share2 className="h-4 w-4" />
              Share Result
            </button>
          </div>

          <Card className="border-purple-500/30 bg-slate-800/50 p-6 mb-6">
            <h3 className="mb-4 font-bold text-white">Your Traits</h3>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((trait) => (
                <span key={trait} className="rounded-full bg-purple-500/30 px-3 py-1 text-sm text-purple-200">
                  {trait}
                </span>
              ))}
            </div>
          </Card>

          <button
            onClick={onBack}
            className="w-full rounded-lg bg-slate-800/50 py-3 font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Back to Tools
          </button>
        </main>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100

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
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-8">
          <p className="text-sm text-slate-400 mb-2">
            Question {currentQuestion + 1} of {personalityQuestions.length}
          </p>
          <h2 className="text-2xl font-bold text-white">{personalityQuestions[currentQuestion].question}</h2>
        </div>

        <div className="space-y-3">
          {personalityQuestions[currentQuestion].answers.map((answer, index) => (
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
