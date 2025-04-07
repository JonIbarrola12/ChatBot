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
    this.chatService.http.get('http://localhost:3000/api/items').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error('Error al obtener los items:', error);
        if (error.status === 404) {
          console.error('No se encontró la API');
        } else if (error.status === 500) {
          console.error('Error interno en el servidor');
        } else {
          console.error('Otro tipo de error', error);
        }
      }
    );
  }
}
