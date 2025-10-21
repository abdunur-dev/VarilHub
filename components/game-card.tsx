"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface GameCardProps {
  title: string
  description: string
  icon: string
  color: string
  points: number
}

export default function GameCard({ title, description, icon, color, points }: GameCardProps) {
  return (
    <Card
      className={`border-0 bg-gradient-to-r ${color} p-4 text-white cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 text-3xl">{icon}</div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-block rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">+{points} pts</span>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 opacity-70" />
      </div>
    </Card>
  )
}
