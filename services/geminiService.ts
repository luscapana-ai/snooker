import { GoogleGenAI, Type } from "@google/genai";
import { TriviaQuestion } from "../types";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateEncyclopediaResponse = async (query: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-3-flash-preview';
    
    const systemPrompt = `You are an expert encyclopedia and coach for Snooker, Billiards, and Pool. 
    Provide accurate, historical, and technical information. 
    Format your response with clear headers and bullet points where appropriate. 
    Keep the tone professional yet accessible to enthusiasts.
    If the user asks about rules, be very specific about the foul penalties.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while consulting the archives. Please try again later.";
  }
};

export const generateProductAdvice = async (productName: string, category: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-3-flash-preview'; // Flash is sufficient for simple advice
    
    const prompt = `I am looking at a ${category} called "${productName}". 
    Briefly tell me (in 2 sentences max) why a player might choose this type of equipment and what skill level it suits best.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No advice available for this item.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve expert advice.";
  }
};

export const generateDailyTrivia = async (): Promise<TriviaQuestion | null> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-3-flash-preview';
    
    const prompt = `Generate a challenging trivia question about Snooker or Professional Pool history, rules, or players. 
    Return strictly JSON format.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TriviaQuestion;
    }
    return null;
  } catch (error) {
    console.error("Trivia Gen Error:", error);
    return null;
  }
};

export const getDrillAdvice = async (drillTitle: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-3-flash-preview';
    
    const prompt = `I am practicing the "${drillTitle}" drill. Give me 3 concise pro tips to master this specific drill. 
    Focus on technique and mindset. Keep it under 100 words.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Keep your head still and follow through!";
  } catch (error) {
    return "Practice makes perfect. Focus on your cue action.";
  }
};
