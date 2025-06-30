import { generateAIResponse } from "@/lib/ai-services"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, provider = "gemini" } = await req.json()
    // Compose a prompt from the chat messages
    const userPrompt = messages
      .map((m: any) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
      .join("\n")
    const prompt = `You are an AI assistant for AI Explorer, a comprehensive data analytics platform.\n${userPrompt}\nRespond as a helpful, concise assistant focused on actionable insights.`

    const { text, provider: usedProvider } = await generateAIResponse({ provider, prompt })

    return NextResponse.json({
      response: text,
      provider: usedProvider,
    })
  } catch (error) {
    console.error("AI Chat API Error:", error)
    return NextResponse.json({
      error: "AI service temporarily unavailable. Please check your provider/API key.",
      fallback: true,
    })
  }
}
