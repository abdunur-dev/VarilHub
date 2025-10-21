"use client"
import { useState } from "react"

interface SocialShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  score?: number
}

export default function SocialShareModal({ isOpen, onClose, title, message, score }: SocialShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  if (!isOpen) return null

  const shareText = `${title}: ${message}${score ? ` - Score: ${score}` : ""}`
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        console.log("[v0] Share cancelled or failed")
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    {
      name: "Twitter",
      icon: "𝕏",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
        )
      },
    },
    {
      name: "Facebook",
      icon: "f",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
      },
    },
    {
      name: "WhatsApp",
      icon: "💬",
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
      },
    },
    {
      name: "Telegram",
      icon: "✈️",
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          "_blank",
        )
      },
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
      <div className="w-full rounded-t-2xl bg-slate-900 p-6 border-t border-purple-500/20 animate-slide-up">
        <h3 className="mb-4 text-lg font-bold text-white">Share Your Result</h3>

        <div className="mb-6 space-y-3">
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-left text-white hover:bg-green-500/20 transition-colors flex items-center gap-3 font-semibold"
            >
              <span className="text-lg">{shared ? "✓" : "🔗"}</span>
              <span>{shared ? "Shared!" : "Share with Friends"}</span>
            </button>
          )}

          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="w-full rounded-lg border border-purple-500/30 bg-slate-800/50 p-3 text-left text-white hover:bg-slate-800 transition-colors flex items-center gap-3"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-semibold">Share on {option.name}</span>
            </button>
          ))}

          <button
            onClick={handleCopy}
            className="w-full rounded-lg border border-purple-500/30 bg-slate-800/50 p-3 text-left text-white hover:bg-slate-800 transition-colors flex items-center gap-3"
          >
            <span className="text-lg">{copied ? "✓" : "📋"}</span>
            <span className="font-semibold">{copied ? "Copied!" : "Copy Text"}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-slate-800/50 py-3 font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
