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

  sendQuestion(question:string):Observable<any>{
    const body = {pregunta : question}

   return this.http.post(this.chatbotUrl,body);
  }

  saveConversation(): void {
    if (this.arrayChat.length === 0) return;

    const storedConversations = this.getConversations();
    const newConversation: Conversations = {
      id: Date.now(), // ID único
      messages: [...this.arrayChat],
    };

    storedConversations.push(newConversation);
    localStorage.setItem('conversations', JSON.stringify(storedConversations));


    this.conversations = storedConversations;
  }


  getConversations(): Conversations[] {
    return JSON.parse(localStorage.getItem('conversations') || '[]');
  }

  
  loadConversations(): void {
    this.conversations = this.getConversations();
  }
}

