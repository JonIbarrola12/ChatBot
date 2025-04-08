import { Component } from '@angular/core';
import { CompletedChatbotComponent } from "../../components/completed-chatbot/completed-chatbot.component";
import { ChatbotNavegator } from "../../components/completed-chatbot/navegator/navegator.component";
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chatbot-main-page',
  imports: [CompletedChatbotComponent, ChatbotNavegator],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.http.get('http://localhost:3000/api/conversations').subscribe({
      next: (res) => {
        console.log('Datos obtenidos:', res);  // Verifica el contenido de la respuesta aquí
      },
      error: (error) => {
        console.error('Error al obtener las conversaciones:', error);
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }
}

