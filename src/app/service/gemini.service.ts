import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiKey = environment.geminiApiKey;
  private ai: GoogleGenerativeAI;

  constructor() {
    this.ai = new GoogleGenerativeAI(this.apiKey);
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const model = this.ai.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent({
        contents: [
          {
            role: "user", // 🔥 Campo richiesto
            parts: [{ text: prompt }]
          }
        ]
      });

      return result.response.text(); // ✅ Restituisce il testo generato
    } catch (error) {
      console.error("Errore nella generazione del contenuto:", error);
      return "Errore nella risposta AI";
    }
  }
}