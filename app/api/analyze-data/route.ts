import { generateAIResponse } from "@/lib/ai-services"
import { NextRequest, NextResponse } from "next/server"

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`

export async function POST(req: NextRequest) {
  try {
    const { chartData, metricType, timeRange, provider = "gemini" } = await req.json()

    const prompt = `\nAnalyze this ${metricType} data over ${timeRange} and provide insights:\n\nData: ${JSON.stringify(chartData)}\n\nPlease provide:\n1. Key trends and patterns\n2. Notable changes or anomalies  \n3. Actionable recommendations\n4. Predictions for next period\n\nKeep the analysis concise but insightful, focusing on business value.`

    const { text: analysis, provider: usedProvider } = await generateAIResponse({ provider, prompt })

    return NextResponse.json({
      analysis,
      timestamp: new Date().toISOString(),
      dataPoints: chartData.length,
      metric: metricType,
      provider: usedProvider,
    })
  } catch (error) {
    console.error("AI Analysis Error:", error)
    return NextResponse.json({
      analysis: "Error analyzing data. Please verify the provider and API keys.",
      timestamp: new Date().toISOString(),
      error: true,
    })
  }
}
