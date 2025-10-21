import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle frame interactions
    const { action, userId, gameId, score } = body

    if (action === "share") {
      return NextResponse.json({
        success: true,
        message: "Score shared successfully",
        shareUrl: `https://viralhub.app/share/${userId}/${gameId}/${score}`,
      })
    }

    if (action === "getLeaderboard") {
      return NextResponse.json({
        success: true,
        leaderboard: [
          { rank: 1, name: "Alex", points: 5200 },
          { rank: 2, name: "Jordan", points: 4800 },
          { rank: 3, name: "Casey", points: 4200 },
        ],
      })
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
