import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = environment.production 
    ? 'https://progetto-utility-backend.onrender.com/api/key'
    : 'http://localhost:3000/api/key';
  private ai: GoogleGenerativeAI | null = null;

  constructor(private http: HttpClient) {
    this.initializeAI();
  }

  private async initializeAI() {
    try {
      const response = await firstValueFrom(this.http.get<{ apiKey: string }>(this.apiUrl));
      this.ai = new GoogleGenerativeAI(response.apiKey);
    } catch (error) {
      console.error('Errore nel recupero dell\'API key:', error);
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.ai) {
      throw new Error('AI non inizializzata');
    }

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