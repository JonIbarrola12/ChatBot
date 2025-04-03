import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'chatbot-interactive-part',
  imports: [FormsModule],
  templateUrl: './interactive-part.component.html',
  styleUrl: './interactive-part.component.css'
})
export class InteractivePartComponent {
  public userMessage: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage(pregunta: string) {
    if (!pregunta.trim()) {
      return;
    }

    const userMessage = { clase: 'message user', texto: pregunta, img: false };
    this.chatService.arrayChat.push(userMessage);


    this.chatService.sendQuestion(pregunta).subscribe({
      next: (response) => {

        if (response && response.answare) {
          const botMessage = { clase: 'message bot', texto: response.answare, img: true };
          this.chatService.arrayChat.push(botMessage);
        } else {
          const errorMessage = { clase: 'message bot', texto: 'Lo siento, no pude entender eso.', img: true };
          this.chatService.arrayChat.push(errorMessage);
        }
        this.chatService.saveConversation();
      },
      error: (err) => {
        const errorMessage = { clase: 'message bot', texto: 'Hubo un error al obtener la respuesta.', img: true };
        this.chatService.arrayChat.push(errorMessage);
        this.chatService.saveConversation();
      }
    });
  }
}
