import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export default async function handler(req, res) {
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
        "Hindi (हिंदी). Please write your response in Hindi.";
    } else if (language === "te") {
      langInstruction =
        "Telugu (తెలుగు). Please write your response in Telugu.";
    }

    const result = await model.generateContent(`
You are RoadLens AI.

Answer the user's question in ${langInstruction}.

Question:
${message}
`);

    return res.status(200).json({
      success: true,
      answer: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      answer: error.message,
    });
  }
}