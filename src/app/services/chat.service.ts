import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ArrayChat{
  clase: string,
  texto: string,
  img: boolean
}
@Injectable({providedIn: 'root'})
export class ChatService {
  private http = inject(HttpClient);
  private chatbotUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';
  public arrayChat: ArrayChat[] = [];
  constructor(){

  }

  sendQuestion(question:string):Observable<any>{
    const body = {pregunta : question}

   return this.http.post(this.chatbotUrl,body);
  }
}

