const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


// ====================
// Health Check
// ====================
app.get("/", (req, res) => {
  res.send("RoadLens AI Backend Running");
});


// ====================
// Gemini Test Route
// ====================
app.get("/test", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "Say hello in one sentence"
    );

    res.send(result.response.text());
  } catch (error) {
    console.error("TEST ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ====================
// Translate Route
// ====================
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const isHindi = targetLanguage === 'hi';
    const prompt = `You are a professional civil roadway and civic concerns expert translator. Your task is to translate the given English text precisely into ${isHindi ? 'Hindi (हिंदी)' : 'English'}.
The text may be a brief subject/title or a detailed issue description of a road hazard ticket (like potholes, lack of lighting, waterlogging, or damaged side rails).
Translate it naturally and professionally. Maintain high clarity, local urban Indian terminology if applicable (e.g. use "गड्ढे" for pothole, "जलभराव" for waterlogging, "सड़क" for road).
Return ONLY the direct translated text. Do not add any greeting, explanation, extra words, quote marks, preamble, or comments.

TEXT TO TRANSLATE:
${text}`;

    const result = await model.generateContent(prompt);
    let translation = result.response.text().trim();
    
    // Clean up any stray quotes that the LLM might have wrapped around the translation
    if (translation.startsWith('"') && translation.endsWith('"')) {
      translation = translation.substring(1, translation.length - 1);
    }
    if (translation.startsWith("'") && translation.endsWith("'")) {
      translation = translation.substring(1, translation.length - 1);
    }

    res.json({
      success: true,
      translation,
    });
  } catch (error) {
    console.error("TRANSLATE ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ====================
// Chat Route
// ====================
app.post("/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        answer: "Message is required",
      });
    }

    let knowledgeBase = "";
    let roadsData = [];

    try {
      knowledgeBase = fs.readFileSync(
        "./knowledge-base.txt",
        "utf8"
      );
    } catch {
      knowledgeBase =
        "RoadLens AI is a road transparency platform.";
    }

    try {
      roadsData = JSON.parse(
        fs.readFileSync("./roads.json", "utf8")
      );
    } catch {
      roadsData = [];
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Detect target language instruction
    let langInstruction = "English";
    if (language === 'hi') {
      langInstruction = "Hindi (हिंदी). Please write your response in Hindi language script.";
    } else if (language === 'te') {
      langInstruction = "Telugu (తెలుగు). Please write your response in Telugu language script.";
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

WEBSITE KNOWLEDGE:
${knowledgeBase}

ROAD DATA:
${JSON.stringify(roadsData, null, 2)}

USER QUESTION:
${message}

CRITICAL LANGUAGE INSTRUCTION:
- You must write your entire response ONLY in the language: ${langInstruction}
- If the user greeting is in another language, respond in the requested language.
- Format properly and keep the tone professional and friendly.

Instructions:
- Answer clearly.
- Be concise.
- Be citizen friendly.
- Use provided information.
- If information is unavailable, say so honestly.
`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    res.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      answer:
        "Sorry, I couldn't process your request right now.",
    });
  }
});


// ====================
// Start Server
// ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
