"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Users, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TrendAnalyzerProps {
  onBack: () => void
}

const trendData = [
  {
    id: 1,
    name: "AI-Generated Content",
    category: "Technology",
    momentum: 95,
    engagement: 8.2,
    growth: 45,
    icon: "🤖",
    description: "Rapid adoption of AI tools for content creation",
  },
  {
    id: 2,
    name: "Sustainable Fashion",
    category: "Lifestyle",
    momentum: 78,
    engagement: 6.5,
    growth: 32,
    icon: "♻️",
    description: "Growing interest in eco-friendly clothing",
  },
  {
    id: 3,
    name: "Micro-Communities",
    category: "Social",
    momentum: 82,
    engagement: 7.1,
    growth: 38,
    icon: "👥",
    description: "Niche communities gaining traction",
  },
  {
    id: 4,
    name: "Wellness Tech",
    category: "Health",
    momentum: 71,
    engagement: 5.9,
    growth: 28,
    icon: "⌚",
    description: "Wearables and health tracking devices",
  },
  {
    id: 5,
    name: "Creator Economy",
    category: "Business",
    momentum: 88,
    engagement: 7.8,
    growth: 42,
    icon: "🎬",
    description: "Independent creators monetizing content",
  },
]

export default function TrendAnalyzer({ onBack }: TrendAnalyzerProps) {
  const [selectedTrend, setSelectedTrend] = useState<(typeof trendData)[0] | null>(null)

  if (selectedTrend) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
        <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
          <div className="mx-auto max-w-2xl px-4 py-4">
            <button
              onClick={() => setSelectedTrend(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          <div className="rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 p-8 text-white mb-6">
            <div className="mb-4 text-6xl">{selectedTrend.icon}</div>
            <h2 className="mb-2 text-3xl font-bold">{selectedTrend.name}</h2>
            <p className="mb-4 text-sm opacity-90">{selectedTrend.description}</p>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              {selectedTrend.category}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="border-purple-500/30 bg-slate-800/50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-xs text-slate-400 mb-1">Momentum</p>
              <p className="text-2xl font-bold text-white">{selectedTrend.momentum}%</p>
            </Card>
            <Card className="border-purple-500/30 bg-slate-800/50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-xs text-slate-400 mb-1">Engagement</p>
              <p className="text-2xl font-bold text-white">{selectedTrend.engagement}M</p>
            </Card>
            <Card className="border-purple-500/30 bg-slate-800/50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-xs text-slate-400 mb-1">Growth</p>
              <p className="text-2xl font-bold text-white">+{selectedTrend.growth}%</p>
            </Card>
          </div>

          <Card className="border-purple-500/30 bg-slate-800/50 p-6 mb-6">
            <h3 className="mb-4 font-bold text-white">Trend Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-400">Momentum Score</span>
                  <span className="font-semibold text-white">{selectedTrend.momentum}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-teal-500"
                    style={{ width: `${selectedTrend.momentum}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-400">Engagement Level</span>
                  <span className="font-semibold text-white">{selectedTrend.engagement}M</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${(selectedTrend.engagement / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <button
            onClick={() => setSelectedTrend(null)}
            className="w-full rounded-lg bg-slate-800/50 py-3 font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Back to Trends
          </button>
        </main>
      </div>
    )
  }

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
        <h1 className="mb-2 text-3xl font-bold text-white">Trending Now</h1>
        <p className="mb-6 text-slate-400">Real-time trend analysis and insights</p>

        <div className="space-y-3">
          {trendData.map((trend) => (
            <button key={trend.id} onClick={() => setSelectedTrend(trend)} className="w-full text-left">
              <Card className="border-purple-500/30 bg-slate-800/50 p-4 hover:bg-slate-800 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{trend.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{trend.name}</h3>
                      <p className="text-xs text-slate-400">{trend.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-bold">+{trend.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Momentum</p>
                    <div className="h-1.5 w-full rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                        style={{ width: `${trend.momentum}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Engagement</p>
                    <div className="h-1.5 w-full rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${(trend.engagement / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
