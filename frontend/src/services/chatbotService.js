import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const chatbotContext = `
You are a helpful assistant for a Government Scheme Finder website in India.
Your role is to help users find information about government welfare schemes.

You should:
- Answer questions about different government schemes in India
- Help users understand eligibility criteria
- Explain benefits of various schemes
- Guide users on how to apply for schemes
- Be friendly, concise, and helpful

Available scheme categories:
- Education (Scholarships, PM Scholarship)
- Health (Ayushman Bharat, Health Insurance)
- Women (Beti Bachao Beti Padhao, Ujjwala Yojana)
- Farmers (PM-KISAN, Fasal Bima)
- Employment (NREGA, Skill India)
- Senior Citizens (Pension schemes)
- Housing (PM Awas Yojana)

Keep responses short (2-3 sentences) and suggest users to register for personalized recommendations.
`;

export const getChatbotResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: chatbotContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm ready to help users find government schemes in India!" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Chatbot error:', error);
    return "I'm having trouble connecting right now. Please try asking about specific schemes like education, health, or farmer schemes!";
  }
};