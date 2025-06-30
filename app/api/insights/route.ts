import { generateAIResponse } from "@/lib/ai-services"
import { NextRequest, NextResponse } from "next/server"

function extractFirstJSONArray(text: string): string | null {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/)
  return match ? match[0] : null
}

export async function POST(req: NextRequest) {
  try {
    const { data, context, provider = "gemini" } = await req.json()

    const prompt = `Analyze this business data and provide 4-5 key insights in JSON format:\n\nData: ${JSON.stringify(data)}\nContext: ${context}\n\nPlease analyze trends, anomalies, opportunities, and provide actionable recommendations.\n\nReturn ONLY a valid JSON array. Do not include any explanation, markdown, or text outside the array.`

    const { text: rawText, provider: usedProvider } = await generateAIResponse({ provider, prompt })

    let insights
    try {
      let jsonText = extractFirstJSONArray(rawText) || rawText
      insights = JSON.parse(jsonText)
      if (!Array.isArray(insights)) {
        throw new Error("Response is not a JSON array.")
      }
      insights = insights.map((insight, index) => ({
        id: insight.id || `insight_${Date.now()}_${index}`,
        type: insight.type || "trend",
        title: insight.title || "Untitled Insight",
        description: insight.description || "No description provided.",
        confidence: insight.confidence || 70,
        impact: insight.impact || "medium",
        timestamp: new Date().toISOString(),
      }))
    } catch (parseError) {
      console.warn("JSON parse error:", parseError)
      insights = [
        {
          id: `fallback_${Date.now()}`,
          type: "trend",
          title: "AI Insight Summary",
          description: rawText.slice(0, 300) + "...",
          confidence: 70,
          impact: "low",
          timestamp: new Date().toISOString(),
        },
      ]
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Insights API Error:", error)
    return NextResponse.json([
      {
        id: `fallback_${Date.now()}`,
        type: "alert",
        title: "AI Service Unavailable",
        description: "Unable to generate insights. Check provider/API key.",
        confidence: 100,
        impact: "low",
        timestamp: new Date().toISOString(),
      },
    ])
  }
}
