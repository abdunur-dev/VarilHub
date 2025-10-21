"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  icon: string
}

export default function ToolCard({ title, description, icon }: ToolCardProps) {
  return (
    <Card className="border-purple-500/30 bg-slate-800/50 p-4 cursor-pointer hover:bg-slate-800/70 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </div>
    </Card>
  )
}
