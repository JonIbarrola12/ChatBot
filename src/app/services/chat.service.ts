import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChatService {
  public http = inject(HttpClient)
  question = 1

  loadChatbot(){
    //this.http.post(`https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar${question}`)
  }

}
