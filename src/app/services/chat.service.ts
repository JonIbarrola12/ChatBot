import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService {
  public http = inject(HttpClient)
  chatbotUrl='https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';


  sendMessage(question: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question }; // La API puede requerir un objeto JSON

    return this.http.post<any>(this.chatbotUrl, body, { headers });
  }
}

