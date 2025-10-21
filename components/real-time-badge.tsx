"use client"

import { useState, useEffect } from "react"

interface RealTimeBadgeProps {
  value: number
  label: string
  isUpdating?: boolean
}

export default function RealTimeBadge({ value, label, isUpdating }: RealTimeBadgeProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (value !== displayValue) {
      setShowPulse(true)
      setDisplayValue(value)
      setTimeout(() => setShowPulse(false), 500)
    }
  }, [value, displayValue])

  return (
    <div
      className={`rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 border border-purple-500/30 ${showPulse ? "animate-pulse-glow" : ""}`}
    >
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold text-white transition-all duration-300 ${isUpdating ? "scale-110" : "scale-100"}`}
      >
        {displayValue.toLocaleString()}
      </p>
    </div>
  )
}
