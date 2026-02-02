import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { emailText } = req.body;

    if (!emailText) {
      return res.status(400).json({ error: "emailText is required" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Write a professional, polite email reply to this:\n\n${emailText}`,
    });

    res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
