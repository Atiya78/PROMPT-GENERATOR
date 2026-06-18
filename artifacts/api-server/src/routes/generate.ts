import { Router, type IRouter } from "express";
import { GeneratePromptBody } from "@workspace/api-zod";

const router: IRouter = Router();

const META_PROMPT = `You are an expert prompt engineer. Given a user's rough idea and preferences, write a single, high-quality, ready-to-use prompt for an AI model. The prompt should be clear, specific, and well-structured: define the role, the task, any relevant context, constraints, the desired output format, and tone. Use sections or numbered steps where it improves clarity. Do not answer the user's idea yourself — only produce the optimized prompt. Return ONLY the prompt text, with no preamble or explanation.`;

router.post("/generate", async (req, res) => {
  const parseResult = GeneratePromptBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { idea, useCase, tone, format, model } = parseResult.data;

  if (!idea || idea.trim().length === 0) {
    res.status(400).json({ error: "idea is required" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    req.log.error("OPENROUTER_API_KEY is not set");
    res.status(500).json({ error: "Server misconfiguration: API key not set" });
    return;
  }

  const selectedModel = model || "openai/gpt-4o-mini";

  const userMessage = [
    `Idea/Task: ${idea}`,
    useCase ? `Intended use case: ${useCase}` : null,
    tone ? `Desired tone: ${tone}` : null,
    format ? `Desired output format: ${format}` : null,
    "Write the optimized prompt accordingly.",
  ]
    .filter(Boolean)
    .join("\n");

  const appUrl = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
    : "http://localhost";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": appUrl,
        "X-Title": "Prompt Generator",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: META_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      req.log.error({ status: response.status, body: errorBody }, "OpenRouter API error");
      res.status(502).json({ error: "Failed to generate prompt. Please try again." });
      return;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const prompt = data.choices?.[0]?.message?.content?.trim();
    if (!prompt) {
      req.log.error({ data }, "Unexpected OpenRouter response shape");
      res.status(502).json({ error: "Received an empty response from the AI model." });
      return;
    }

    res.json({ prompt });
  } catch (err) {
    req.log.error({ err }, "Error calling OpenRouter");
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

export default router;
