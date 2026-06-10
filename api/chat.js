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

    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are RoadLens AI.

You help users understand:
- Road information
- Contractors
- Budget allocation
- Complaint reporting
- Road maintenance
- Website navigation

User Question:
${message}

Answer clearly and concisely.
Return plain text only.
`;

    const result = await model.generateContent(prompt);

    res.status(200).json({
      success: true,
      answer: result.response.text(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      answer: "AI service temporarily unavailable.",
    });
  }
};