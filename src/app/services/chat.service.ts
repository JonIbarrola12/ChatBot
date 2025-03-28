import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService {
  public http = inject(HttpClient)
  chatbotUrl='https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';


  createPost(question: string):Observable<any> {
     return this.http.post<any>(this.chatbotUrl, question)
    };
  }

