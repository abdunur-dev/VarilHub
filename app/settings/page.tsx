"use client"

import { useState } from "react"
import { ArrowLeft, Trash2, Volume2, Moon } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    darkMode: true,
    notifications: true,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all game data? This cannot be undone.")) {
      localStorage.removeItem("gameProgress")
      alert("Game data cleared!")
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Link href="/profile" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="mb-2 text-3xl font-bold text-white animate-slide-up">Settings</h1>
        <p className="mb-8 text-slate-400">Customize your experience</p>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">Preferences</h2>
          <div className="space-y-3">
            {/* Sound Toggle */}
            <Card className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up flex items-center justify-between hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-semibold text-white">Sound Effects</p>
                  <p className="text-xs text-slate-400">Enable game sounds</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("soundEnabled")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? "bg-purple-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </Card>

            {/* Dark Mode Toggle */}
            <Card
              className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up flex items-center justify-between hover:bg-slate-800/70 transition-colors"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-semibold text-white">Dark Mode</p>
                  <p className="text-xs text-slate-400">Always enabled</p>
                </div>
              </div>
              <button
                disabled
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500 cursor-not-allowed"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </Card>

            {/* Notifications Toggle */}
            <Card
              className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up flex items-center justify-between hover:bg-slate-800/70 transition-colors"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔔</span>
                <div>
                  <p className="font-semibold text-white">Notifications</p>
                  <p className="text-xs text-slate-400">Game updates and achievements</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("notifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? "bg-purple-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </Card>
          </div>
        </div>

        {/* About */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">About</h2>
          <Card className="border-purple-500/30 bg-slate-800/50 p-4 animate-slide-up">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">App Version</span>
                <span className="font-semibold text-white">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Build</span>
                <span className="font-semibold text-white">2024.10</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-red-400">Danger Zone</h2>
          <button
            onClick={handleClearData}
            className="w-full rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-left text-white hover:bg-red-500/20 transition-colors flex items-center gap-3 animate-slide-up"
          >
            <Trash2 className="h-5 w-5 text-red-400" />
            <div>
              <p className="font-semibold">Clear All Data</p>
              <p className="text-xs text-slate-400">Delete all game progress and achievements</p>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}
