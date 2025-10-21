"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Repeat2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FeedPost {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

const mockPosts: FeedPost[] = [
  {
    id: "1",
    author: "Alex Chen",
    avatar: "👑",
    content: "Just got Social Butterfly on the Compatibility Quiz! Who else got this result?",
    timestamp: "2 hours ago",
    likes: 342,
    comments: 28,
    shares: 15,
    liked: false,
  },
  {
    id: "2",
    author: "Jordan Smith",
    avatar: "🥈",
    content: "Predicted 3/3 trends correctly in the Prediction Game! 🔮 My score: 100%",
    timestamp: "4 hours ago",
    likes: 521,
    comments: 45,
    shares: 32,
    liked: false,
  },
  {
    id: "3",
    author: "Casey Lee",
    avatar: "🥉",
    content: "The Trend Analyzer just showed me something wild about AI adoption rates 📊",
    timestamp: "6 hours ago",
    likes: 198,
    comments: 12,
    shares: 8,
    liked: false,
  },
]

export default function SocialFeed() {
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts)

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="border-purple-500/30 bg-slate-800/50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-2xl">{post.avatar}</div>
            <div className="flex-1">
              <p className="font-semibold text-white">{post.author}</p>
              <p className="text-xs text-slate-400">{post.timestamp}</p>
            </div>
          </div>

          <p className="mb-4 text-white">{post.content}</p>

          <div className="flex items-center justify-between text-slate-400">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center gap-2 hover:text-pink-400 transition-colors"
            >
              <Heart className={`h-4 w-4 ${post.liked ? "fill-pink-400 text-pink-400" : ""}`} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <Repeat2 className="h-4 w-4" />
              <span className="text-sm">{post.shares}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
