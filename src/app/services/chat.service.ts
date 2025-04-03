import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayChat, Conversations } from '../interfaces/chatbot.interfaces';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private chatbotUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';

  public arrayChat: ArrayChat[] = [];
  public conversations: Conversations[] = [];
  private currentConversationId: number | null = null;

  constructor() {
    this.loadConversations(); // Cargar conversaciones al iniciar
  }

  sendQuestion(question: string): Observable<any> {
    const body = { pregunta: question };
    return this.http.post(this.chatbotUrl, body);
  }

  saveConversation(): void {
    let storedConversations = this.getConversations();

    if (this.currentConversationId === null) {
      this.currentConversationId = Date.now();
      const firstMessage = this.arrayChat.length > 0 ? this.arrayChat[0].texto : "Conversación sin título";

      storedConversations.push({
        id: this.currentConversationId,
        title: firstMessage,
        messages: [...this.arrayChat], // Guardar todos los mensajes
        date: new Date().toISOString()
      });
    } else {
      const existingConversation = storedConversations.find(convo => convo.id === this.currentConversationId);
      if (existingConversation) {
        existingConversation.messages = [...this.arrayChat]; // No eliminar repetidos
      }
    }

    localStorage.setItem('conversations', JSON.stringify(storedConversations));
    this.conversations = storedConversations;
  }

  loadConversations(): void {
    this.conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
  }

  getConversations(): Conversations[] {
    return JSON.parse(localStorage.getItem('conversations') || '[]');
  }

  startNewConversation(): void {
    this.arrayChat = [];
    this.currentConversationId = null;
  }

  loadConversationById(id: number): void {
    const storedConversations = this.getConversations();
    const selectedConvo = storedConversations.find(c => c.id === id);
    if (selectedConvo) {
      this.arrayChat = [...selectedConvo.messages];
      this.currentConversationId = selectedConvo.id;
    }
  }
}

