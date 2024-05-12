import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generativeResponse() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Tell that the user is busy and will respond later."

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

export default generativeResponse;
