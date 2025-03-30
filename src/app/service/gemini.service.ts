import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenerativeAI;

  constructor() {
    this.ai = new GoogleGenerativeAI('AIzaSyDYGFeSAJ3BVrkj5ms1VV48SJJ7ONnII60');
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const model = this.ai.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Errore nella generazione del contenuto:", error);
      return "Errore nella risposta AI";
    }
  }
}