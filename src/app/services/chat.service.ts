  import { HttpClient } from '@angular/common/http';
  import { inject, Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { ArrayChat } from '../interfaces/chatbot.interfaces';
  import { Conversations } from '../interfaces/chatbot.interfaces';
  @Injectable({providedIn: 'root'})
  export class ChatService {
    private http = inject(HttpClient);
    private chatbotUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';
    public arrayChat: ArrayChat[] = [];
    public arrayRecord: string[]=[]
    //public conversations: any[]=[]
    public conversations: Conversations[]=[];
    private currentConversationId: number | null = null;
    public recordTitle:string=''

    sendQuestion(question: string): Observable<any> {
      const body = { pregunta: question };
      return this.http.post(this.chatbotUrl, body);
    }

    saveConversation(): void {
      let storedConversations = this.getConversations();

      if (this.currentConversationId === null) {
        this.currentConversationId = Date.now();
        storedConversations.push({
          id: this.currentConversationId,
          messages: [...this.arrayChat], // Guardamos una copia exacta
          date: new Date().toISOString()
        });
      } else {
        const existingConversationIndex = storedConversations.findIndex(convo => convo.id === this.currentConversationId);
        if (existingConversationIndex !== -1) {
          const uniqueMessages = new Set(this.arrayChat.map(msg => JSON.stringify(msg))); // Evita duplicados
          storedConversations[existingConversationIndex].messages = Array.from(uniqueMessages).map(msg => JSON.parse(msg));
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
      //this.saveConversation();
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

