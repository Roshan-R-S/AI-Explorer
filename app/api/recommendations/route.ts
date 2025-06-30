import { generateAIResponse } from "@/lib/ai-services"
import { NextRequest, NextResponse } from "next/server"

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`

function extractFirstJSONArray(text: string): string | null {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/)
  return match ? match[0] : null
}

export async function POST(req: NextRequest) {
  try {
    const { userBehavior, metrics, context, provider = "gemini" } = await req.json()

    const prompt = `Based on this user behavior and business metrics, generate 4 personalized recommendations:\n\nUser Behavior: ${JSON.stringify(userBehavior)}\nCurrent Metrics: ${JSON.stringify(metrics)}\nBusiness Context: ${context || "General business optimization"}\n\nProvide actionable recommendations that can improve performance, user experience, or business outcomes.\n\nReturn ONLY a valid JSON array. Do not include any explanation, markdown, or text outside the array.`

    const { text: rawText, provider: usedProvider } = await generateAIResponse({ provider, prompt })

    let recommendations
    try {
      let jsonText = extractFirstJSONArray(rawText) || rawText
      recommendations = JSON.parse(jsonText)
      if (!Array.isArray(recommendations)) {
        throw new Error("Invalid format")
      }
      recommendations = recommendations.map((rec, index) => ({
        ...rec,
        id: rec.id || `rec_${Date.now()}_${index}`,
        actionUrl: rec.actionUrl || "/recommendations",
      }))
    } catch (err) {
      recommendations = [
        {
          id: `rec_${Date.now()}`,
          title: "AI-Generated Recommendation",
          description: rawText.slice(0, 300),
          category: "optimization",
          priority: "medium",
          estimatedImpact: "Varies based on implementation",
          confidence: 70,
          actionUrl: "/recommendations",
        },
      ]
    }

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Recommendations API Error:", error)
    return NextResponse.json([
      {
        id: `fallback_${Date.now()}`,
        title: "Check AI API Configuration",
        description: "Unable to generate recommendations. Please verify your AI provider and API key.",
        category: "optimization",
        priority: "high",
        estimatedImpact: "Restore AI functionality",
        confidence: 100,
        actionUrl: "/settings",
      },
    ])
  }
}
