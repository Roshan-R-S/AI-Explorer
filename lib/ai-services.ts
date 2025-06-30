const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`

/**
 * Sends data to Hugging Face Mixtral model and returns raw text.
 */
export async function generateInsightsHuggingFace(prompt: string): Promise<string> {
  const res = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  })

  const data = await res.json()
  if (Array.isArray(data)) {
    return data[0]?.generated_text || ""
  }
  return data?.generated_text || ""
}

/**
 * Sends data to Gemini Pro and returns raw text.
 */
export async function generateInsightsGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  })

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

/**
 * Utility: Choose AI provider dynamically, with fallback from Gemini to Hugging Face.
 * Returns an object with the text and the provider actually used.
 */
export async function generateAIResponse({
  provider,
  prompt,
}: {
  provider: "huggingface" | "gemini"
  prompt: string
}): Promise<{ text: string; provider: string }> {
  if (provider === "huggingface") {
    const text = await generateInsightsHuggingFace(prompt)
    return { text, provider: "huggingface" }
  } else if (provider === "gemini") {
    let text = ""
    let usedProvider = "gemini"
    try {
      text = await generateInsightsGemini(prompt)
      if (!text) throw new Error("Empty Gemini response")
    } catch (e) {
      // Fallback to Hugging Face
      usedProvider = "huggingface-fallback"
      text = await generateInsightsHuggingFace(prompt)
    }
    return { text, provider: usedProvider }
  } else {
    throw new Error("Unsupported AI provider")
  }
}
