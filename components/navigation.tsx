"use client"

import { Home, Gamepad2, Zap, User } from "lucide-react"
import Link from "next/link"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "games", label: "Games", icon: Gamepad2, href: "/games" },
    { id: "tools", label: "Tools", icon: Zap, href: "/tools" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-purple-500/20 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-3 px-4 transition-all duration-300 ${
                  isActive ? "text-pink-500 scale-110" : "text-slate-400 hover:text-white hover:scale-105"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "animate-bounce" : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
