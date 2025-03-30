import { Component } from '@angular/core';
import { GeminiService } from 'src/app/service/gemini.service';

@Component({
  selector: 'chat-gemini-component',
  templateUrl: './chat-gemini.component.html',
  styleUrls: ['./chat-gemini.component.scss']
})
export class ChatGeminiComponent {
  userMessage: string = '';
  aiResponse: string = '';
  displayedResponse: string = '';
  loading: boolean = false;
  private typingSpeed: number = 50; // velocità di digitazione in millisecondi
  private currentTypingPromise: Promise<void> | null = null;
  private shouldStopTyping: boolean = false;

  constructor(private geminiService: GeminiService) {}

  async getAIResponse(prompt: string) {
    if (this.loading) return;
    
    this.loading = true;
    this.displayedResponse = '';
    this.shouldStopTyping = false;
    
    try {
      this.aiResponse = await this.geminiService.generateResponse(prompt);
      await this.typeResponse();
    } finally {
      this.loading = false;
    }
  }

  stopResponse() {
    this.shouldStopTyping = true;
    this.loading = false;
  }

  private async typeResponse() {
    const words = this.aiResponse.split(' ');
    for (const word of words) {
      if (this.shouldStopTyping) break;
      
      this.displayedResponse += word + ' ';
      await new Promise(resolve => setTimeout(resolve, this.typingSpeed));
    }
  }

  onKeyPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      event.preventDefault();
      if (this.userMessage.trim()) {
        this.getAIResponse(this.userMessage);
        this.userMessage = '';
      }
    }
  }
}
