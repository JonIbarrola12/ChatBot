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

  //El constructor carga las conversaciones al iniciar la pagina web
  constructor() {
    this.loadConversations();
  }

  //La funcion sendQuestion se hace una llamada a la api con el metodo post y devuelve un observable
  sendQuestion(question: string): Observable<any> {
    const body = { pregunta: question };
    return this.http.post(this.chatbotUrl, body);
  }

  //El metodo saveConversation sirve para guardar las conversaciones en memoria, es el metodo principal
  saveConversation(): void {
    let storedConversations = this.getConversations();

    if (this.currentConversationId === null) {
      this.currentConversationId = Date.now();
      const firstMessage = this.arrayChat.length > 0 ? this.arrayChat[0].texto : "Conversación sin título";

      storedConversations.push({
        id: this.currentConversationId,
        title: firstMessage,
        messages: [...this.arrayChat],
        date: new Date().toISOString()
      });
    } else {
      const existingConversation = storedConversations.find(convo => convo.id === this.currentConversationId);
      if (existingConversation) {
        existingConversation.messages = [...this.arrayChat];
      }
    }

    localStorage.setItem('conversations', JSON.stringify(storedConversations));
    this.conversations = storedConversations;
  }

  // El método loadConversation carga las conversaciones en memoria
  loadConversations(): void {
    this.conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
  }
  // La función getConversation devuelve las conversaciones en memoria
  getConversations(): Conversations[] {
    return JSON.parse(localStorage.getItem('conversations') || '[]');
  }
  //El método startNewConversation vacia el array de mensajes y hace null el currentConversationId (Este método se usa en el botón de new chat)
  startNewConversation(): void {
    this.arrayChat = [];
    this.currentConversationId = null;
  }
  //Este metodo sirve para cargar una conversacion especifica basandos en el id de estas(identificador único)
  loadConversationById(id: number): void {
    const storedConversations = this.getConversations();
    const selectedConvo = storedConversations.find(c => c.id === id);
    if (selectedConvo) {
      this.arrayChat = [...selectedConvo.messages];
      this.currentConversationId = selectedConvo.id;
    }
  }
  cleanHistory(): void {
    localStorage.removeItem('conversations');
    this.conversations = [];
    this.arrayChat = [];
    this.currentConversationId = null;
  }
}

