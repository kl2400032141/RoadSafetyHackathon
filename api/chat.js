const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        answer: "Method not allowed",
      });
    }

    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        answer: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let langInstruction = "English";

    if (language === "hi") {
      langInstruction =
        "Hindi (हिंदी). Please write your response in Hindi language script.";
    } else if (language === "te") {
      langInstruction =
        "Telugu (తెలుగు). Please write your response in Telugu language script.";
    }

    const prompt = `
You are RoadLens AI.

You are an intelligent assistant for a road transparency platform.

You help users understand:
- Road information
- Contractors
- Budget allocation
- Budget spending
- Complaint reporting
- Road maintenance
- Website navigation

CRITICAL LANGUAGE INSTRUCTION:
- You must write your entire response ONLY in the language: ${langInstruction}
- Format properly and keep the tone professional and friendly.

USER QUESTION:
${message}

Instructions:
- Answer clearly.
- Be concise.
- Be citizen friendly.
- If information is unavailable, say so honestly.
`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return res.status(500).json({
      success: false,
      answer:
        "Sorry, I couldn't process your request right now.",
    });
  }
};