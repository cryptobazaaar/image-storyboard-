
import { GoogleGenAI } from "@google/genai";

export async function generateImageFromPrompt(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `${prompt}. High quality, photorealistic, cinematic lighting.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "9:16"
      }
    }
  });

  if (!response.candidates?.[0]?.content?.parts) {
    throw new Error('No image was generated. Please try again.');
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error('Image data not found in response parts.');
}
