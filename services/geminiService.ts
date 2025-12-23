import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to deduce the website domain of an application name.
 * This is used to fetch the favicon.
 */
export const getAppDomain = async (appName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `What is the primary website domain name for the application named "${appName}"? 
      Only return the domain string (e.g., "discord.com", "telegram.org"). 
      Do not include https:// or www. 
      If unsure, return "google.com".`,
    });

    const text = response.text;
    if (!text) return 'google.com';
    return text.trim().toLowerCase();
  } catch (error) {
    console.error("Error fetching domain from Gemini:", error);
    // Fallback logic could go here, but for now return a generic placeholder domain
    return 'google.com';
  }
};